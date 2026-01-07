import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/Message.model.js";
import User from "../models/User.model.js";

const sendMessage = async(req,res)=>{
    const senderId = req.user?._id;

    const {receiverId} = req.params;
    const {text, image} = req.body;

    if((!text || text.trim() ==="" )&&(!image || image.trim() ==="")){
        return res.status(400).json({message:"message is missing"});
    }
    if(!receiverId || receiverId.trim() ===""){
        return res.status(400).json({message:"receiverId is required"});
    }
    
    if(receiverId.toString() === senderId.toString()){
        return res.status(400).json({message:"cannot send message to yourself"});

    }

    let imageUrl ="";
    if(image){
        const uploadRes = await cloudinary.uploader.upload(image);
        imageUrl= uploadRes.secure_url;
    }

    try {
        const receiver = await User.findById(receiverId);
        if(!receiver){
            return res.status(404).json({message:"Receiver not found"});
        }

        const createdMessage = await Message.create({
            senderId,
            receiverId,
            text : text || "",
            image: imageUrl 
        });
        if(!createdMessage){
            return res.status(500).json({message:"Error while sending message."});
        }

        //socket.io real time updation
        const receiverSocketId = getReceiverSocketId(receiver._id);
        if(receiverSocketId){//if receiver is online
            io.to(receiverSocketId).emit('newMessage' , createdMessage);
        }

        return res.status(201)
            .json({
                message:"Message sent",
                sentMessage: createdMessage,
            })

    } catch (error) {
        console.log("Error in sendMessage controller: " , error);
        return res.status(500).json({message:"Internal server error."});
    }
};


const getAllContacts = async(req,res)=>{
    try {
        const userId = req.user?._id;
        const contacts = await User.find(
            {
                _id: {$ne : userId}
            }).select("-password");
        return res
            .status(200)
            .json({
                message:"Fetched contacts successfully",
                contacts: contacts,    
            })
        
    } catch (error) {
        console.log("Error in getAllContacts controller: "+ error);
        return res.status(500).json({message:"Internal server error."});
    }
};

const getAllChats = async(req,res)=>{
    const userId = req.user?.id;
    
    const messages = await Message.find(
        {
            $or :[ 
                { senderId: userId},
                { receiverId:userId}
            ]
        })

    const chatContactIds = [
        ... new Set(
            messages.map((msg)=>(
                msg.senderId.toString() === userId.toString() ? 
                                            msg.receiverId.toString() 
                                            : 
                                            msg.senderId.toString()
            ))
        )
    ];

    const chats = await User.find({ _id: {$in : chatContactIds}}).select("-password");

    return res.status(200)
        .json({
            messages:"chats fetched successfully",
            chats:chats,
        })
    
}

const getMessagesOfContact = async(req,res)=>{
    const senderId = req.user?._id;
    const {receiverId} = req.params;
    if(!receiverId){
        return res.status(400).json({message:"receiverId is required"});
    }
    const messages = await Message.find(
        {
            $or:[
                {senderId:senderId , receiverId:receiverId},
                { senderId: receiverId , receiverId:senderId}
            ]
        }
    );

    return res.status(200)
        .json({
            message:"messages fetched successfully.",
            messages:messages,
        });
};

export {
    sendMessage,
    getAllContacts,
    getAllChats,
    getMessagesOfContact,

}