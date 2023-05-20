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
                conversation: newConversation.dataValues,
                message: newMessage.dataValues
            }
        } catch (error) {
            console.error('Error creating conversation:', error);
            throw error;
        }
    }
    // async getMessageUserTalk(user_one) {
    //     try {
    //         const conversations = await Conversations.findAll({
    //             where: {
    //                 user_one: user_one
    //             },
    //             include: [
    //                 {
    //                     model: User,
    //                     as: 'user_one_info',
    //                     attributes: ['first_name', 'last_name']
    //                 },
    //                 {
    //                     model: User,
    //                     as: 'user_two_info',
    //                     attributes: ['first_name', 'last_name']
    //                 },
    //                 {
    //                     model: Message,
    //                     as: 'messages',
    //                     where: { conversation_id: Sequelize.col('conversations.conversation_id') },
    //                     attributes: ['user_id','message', 'created_at'],
    //                     include: [
    //                         {
    //                             model: User,
    //                             as: 'user',
    //                             attributes: ['first_name', 'last_name']
    //                         }
    //                     ],
    //                     required: true, // Ensure that the conversation has at least one message
    //                     separate: true, // Perform a separate subquery for messages
    //                     order: [['created_at', 'DESC']],
    //                     limit: 1
    //                 }
    //             ],
    //             order: [['updated_at', 'DESC']],
    //             // group: ['user_two'],
    //             raw: true
    //         });
    //         // Group conversations by user_two
    //         // const groupedConversations = {};
    //         // conversations.forEach((conversation) => {
    //         // const userTwoId = conversation.user_two;
    //         // if (!groupedConversations[userTwoId]) {
    //         //     groupedConversations[userTwoId] = conversation;
    //         // }
    //         // });

    //         // // Convert the grouped conversations object to an array
    //         // const formattedConversations = Object.values(groupedConversations);

    //         // return formattedConversations;

            // const groupedConversations = conversations.reduce((grouped, conversation) => {
            //     const userTwoId = conversation.user_two;
            //     if (!grouped[userTwoId] || conversation.updated_at > grouped[userTwoId].updated_at) {
            //       grouped[userTwoId] = {
            //         conversation_id: conversation.conversation_id,
            //         user_one: conversation.user_one,
            //         user_two: conversation.user_two,
            //         created_at: conversation.created_at,
            //         updated_at: conversation.updated_at,
            //         deleted_at: conversation.deleted_at,
            //         user_one_info: {
            //           first_name: conversation['user_one_info.first_name'],
            //           last_name: conversation['user_one_info.last_name']
            //         },
            //         user_two_info: {
            //           first_name: conversation['user_two_info.first_name'],
            //           last_name: conversation['user_two_info.last_name']
            //         },
            //         messages: conversation.messages
            //       };
            //     }
            //     return grouped;
            //   }, {});
          
            //   const formattedConversations = Object.values(groupedConversations);
          
    //           return formattedConversations;
              
    //     } catch (error) {
    //         console.error('Error retrieving user conversations:', error);
    //         throw error;
    //     }
    // }
    async getMessageUserTalk(user_one) {
        try {
          // Retrieve conversations with user information
          const conversations = await Conversations.findAll({
            where: {
              user_one: user_one
            },
            include: [
              {
                model: User,
                as: 'user_one_info',
                attributes: ['first_name', 'last_name']
              },
              {
                model: User,
                as: 'user_two_info',
                attributes: ['first_name', 'last_name']
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
      
          // Map the messages to their respective conversation IDs
          const messageMap = {};
          messages.forEach(message => {
            const conversationId = message.conversation_id;
            messageMap[conversationId] = message;
          });
      
          // Combine the conversation and message data
          const formattedConversations = conversations.reduce((grouped, conversation) => {
            const userTwoId = conversation.user_two;
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
                  last_name: conversation['user_one_info.last_name']
                },
                user_two_info: {
                  first_name: conversation['user_two_info.first_name'],
                  last_name: conversation['user_two_info.last_name']
                },
                messages: messageMap[conversation.conversation_id] ? [messageMap[conversation.conversation_id]] : []
              };
            }
            return grouped;
          }, {});
      
          const finalConversations = Object.values(formattedConversations);
      
          return finalConversations;
        } catch (error) {
          console.error('Error retrieving user conversations:', error);
          throw error;
        }
      }
        
}
module.exports = new ChatService();