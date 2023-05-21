const User = require('../models/user');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const Conversations = require('../models/conversation');
const Message = require('../models/message');

class ChatService {
    async createConversation(message, user_one, user_two) {
        try {
            const newConversation = await Conversations.create({
                user_one: user_one,
                user_two: user_two
            });

            const newMessage = await Message.create({
                message: message,
                conversation_id: newConversation.conversation_id,
                user_id: user_one
            });

            console.log(newMessage.dataValues);
            return {
                status: true,
                conversation: newConversation.dataValues,
                message: newMessage.dataValues
            }
        } catch (error) {
            console.error('Error creating conversation:', error);
            throw error;
        }
    }
    async getMessageUserTalk(user_one) {
        try {
          // Retrieve conversations with user information
          const conversations = await Conversations.findAll({
            where: {
              [Op.or]: [
                { user_one: user_one },
                { user_two: user_one }
              ]
            },
            include: [
              {
                model: User,
                as: 'user_one_info',
                attributes: ['first_name', 'last_name', 'image_profile']
              },
              {
                model: User,
                as: 'user_two_info',
                attributes: ['first_name', 'last_name', 'image_profile']
              }
            ],
            order: [['updated_at', 'DESC']],
            raw: true
          });
          // Retrieve the latest message for each conversation
          const conversationIds = conversations.map(conversation => conversation.conversation_id);
          const messages = await Message.findAll({
            where: {
              conversation_id: conversationIds
            },
            order: [['created_at', 'DESC']],
            group: ['conversation_id'],
            raw: true
          });
      
          const messageMap = {};
          messages.forEach(message => {
            const conversationId = message.conversation_id;
            messageMap[conversationId] = message;
          });

          const formattedConversations = conversations.reduce((grouped, conversation) => {
            const userTwoId = conversation.user_two;
            const userOneId = conversation.user_one;
            if (!grouped[userTwoId] || conversation.updated_at > grouped[userTwoId].updated_at) {
              grouped[userTwoId] = {
                conversation_id: conversation.conversation_id,
                user_one: conversation.user_one,
                user_two: conversation.user_two,
                created_at: conversation.created_at,
                updated_at: conversation.updated_at,
                deleted_at: conversation.deleted_at,
                user_one_info: {
                  first_name: conversation['user_one_info.first_name'],
                  last_name: conversation['user_one_info.last_name'],
                  image_profile: conversation['user_one_info.image_profile']
                },
                user_two_info: {
                  first_name: conversation['user_two_info.first_name'],
                  last_name: conversation['user_two_info.last_name'],
                  image_profile: conversation['user_two_info.image_profile']
                },
                messages: messageMap[conversation.conversation_id] ? [messageMap[conversation.conversation_id]] : []
              };
            }
            return grouped;
          }, {});

          const alternatingConversations = Object.values(formattedConversations).reduce((filteredConversations, conversation) => {
            const { user_one, user_two } = conversation;
          
            const existingConversationIndex = filteredConversations.findIndex((existingConversation) => {
              return (
                (existingConversation.user_one === user_one && existingConversation.user_two === user_two) ||
                (existingConversation.user_one === user_two && existingConversation.user_two === user_one)
              );
            });
          
            if (existingConversationIndex !== -1) {
              const existingConversation = filteredConversations[existingConversationIndex];
              if (new Date(conversation.created_at) > new Date(existingConversation.created_at)) {
                filteredConversations[existingConversationIndex] = conversation;
              }
            } else {
              filteredConversations.push(conversation);
            }
          
            return filteredConversations;
          }, []);

          alternatingConversations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

          return alternatingConversations

        } catch (error) {
          console.error('Error retrieving user conversations:', error);
          throw error;
        }
    }
    async getMessage1ON1(user_one, user_two) {
      try {
        const conversations = await Conversations.findAll({
          where: {
            [Op.or]: [
              { user_one: user_one, user_two: user_two },
              { user_one: user_two, user_two: user_one }
            ]
          },
          include: [
            {
              model: User,
              as: 'user_one_info',
              attributes: ['first_name', 'last_name', 'image_profile'],
              nested: true
            },
            {
              model: User,
              as: 'user_two_info',
              attributes: ['first_name', 'last_name', 'image_profile'],
              nested: true
            },
            {
              model: Message,
              as: 'messages',
              attributes: ['message'],
              nested: true
            }
          ],
          raw: false
        });

        const conversationsWithMessageType = conversations.map(conversation => {
          const message_type = conversation.user_one === user_one ? 'me' : 'other';
          const messagesWithMessageType = conversation.messages.map(message => {
            return {
              message: message.message,
              message_type
            };
          });
    
          return {
            status: true,
            conversation_id: conversation.conversation_id,
            user_one: conversation.user_one,
            user_two: conversation.user_two,
            created_at: conversation.created_at,
            updated_at: conversation.updated_at,
            deleted_at: conversation.deleted_at,
            user_one_info: {
              first_name: conversation['user_one_info']['first_name'],
              last_name: conversation['user_one_info']['last_name'],
              image_profile: conversation['user_one_info']['image_profile'],
            },
            user_two_info: {
              first_name: conversation['user_two_info']['first_name'],
              last_name: conversation['user_two_info']['last_name'],
              image_profile: conversation['user_two_info']['image_profile']
            },
            messages: messagesWithMessageType
          };
        });
    
        return conversationsWithMessageType;

      } catch (err) {
        throw err;
      }
    }
        
}
module.exports = new ChatService();