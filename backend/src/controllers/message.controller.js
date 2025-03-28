import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getusersForSidebar", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId}, // here I'm sender
                {senderId: userToChatId, receiverId: myId} // here I'm receiver
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessage", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageURL;
        if (image){
            //Upload  base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageURL = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL
        })

        await newMessage.save()

        // todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}