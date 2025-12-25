import React, { useState, useRef, useEffect } from 'react'
import { FileImage, Send } from 'lucide-react'
import { useChatStore } from "../store/chatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
function MessageInput() {

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);

    const { sendMessage, isSoundEnabled, currentChat } = useChatStore();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        sendMessage({
            text: text.trim(),
            image: imagePreview,
        });
        setText("");
        setImagePreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    useEffect(()=>{
        removeImage();
        setText("");
    },[currentChat])

    return (

        <div className=' w-full shrink-0'>

            <div className="p-1 border-t border-slate-700/30">
                {imagePreview && (
                    <div className="max-w-3xl mx-auto  flex items-center">
                        <div className="absolute bottom-15 ">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-20 h-20 b-0 object-cover rounded-lg border border-slate-700"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                                type="button"
                            >
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSendMessage} className="max-w-xl md:max-w-3xl mx-auto flex space-x-0 md:space-x-4">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${imagePreview ? "text-cyan-500" : ""
                            }`}
                    >
                        <ImageIcon className="w-5 h-5" />
                    </button>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        className="w-25 md:w-50 flex-1 bg-slate-800/20 border border-slate-700/30 rounded-4xl py-2 px-4"
                        placeholder="Type your message..."
                    />

                    <button
                        type="submit"
                        disabled={!text.trim() && !imagePreview}
                        className="bg-linear-to-r from-sky-500/60 to-sky-600/40 text-white rounded-4xl px-3 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed "
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MessageInput