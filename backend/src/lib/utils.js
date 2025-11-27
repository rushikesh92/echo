import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    try {
        const token = jwt.sign(
            {//payload
                userId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, //7d in ms
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "development" ? false : true
        });

        return token;
        } 
    catch (error) {
        console.log("Error while generating token: ", error);
        return null;    
    }
};