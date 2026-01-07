import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const socketAuthMiddleware = async (socket, next) => {

    try {

        const token = socket.handshake.headers
            .cookie?.split("; ")
            .find((c) => c.startsWith("jwt="))
            ?.split("=")[1];

        if (!token) {
            console.log("socket connection rejected : No token provided");
            return next(new Error("Unauthorized request."));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            console.log("Socket connection rejected: Invalid token");
            return next(new Error("Unauthorized request."));
        }

        const user = await User.findById(decodedToken.userId).select("-password");
        if (!user) {
            console.log("Socket connection rejected: User not found");
            return next(new Error("User not found"));
        }

        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);

        next();
    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        return next(new Error("Unauthorized request."));
    }

}
