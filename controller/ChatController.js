const chatService = require('../services/ChatService');

exports.chatToOwnerEstate = async (req, res) => {
    try {
        const { message } =  req.body;
        const userOwner = req.params.id
        const userId = req.user.user_id
        const chat = await chatService.createConversation(message, userId, userOwner);
        return res.status(201).json({ status: true, chat: chat });
    } catch (err) {
        console.error('Error creating conversation:', err);
        return res.status(500).json({ status: false, error: err.message });
    }
}

exports.chatUserId = async (req, res) => {
    try {
        const userId = req.user.user_id
        const chat = await chatService.getMessageUserTalk(userId);
        return res.status(201).json({ status: true, chat: chat });
    } catch (err) {
        console.error('Error creating conversation:', err);
        return res.status(500).json({ status: false, error: err.message });
    }
}


