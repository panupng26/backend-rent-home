const User = require('../models/user');
const expirationTime = 2 * 60 * 60; // 2 hours
// const redis = require('redis')
class SocketService {
    
    async updateIsActive(socket_id ,user_id) {
        const user = await User.findByPk(user_id);
        user.is_active = true
        user.updated_at = Date.now();
        user.save()

        // memcached.set(user_id.toString(), socket_id, expirationTime, (err) => {
        //   if (err) {
        //     console.error('Failed to store socket_id in memcache:', err);
        //   } else {
        //     console.log('Socket ID stored in memcache for user_id:', user_id);
        //   }
        // });
    }
    async logoutIsActive(socket_id, user_id) {
        // memcached.del(user_id.toString(), (err) => {
        //   if (err) {
        //     console.error('Failed to delete socket_id from memcache:', err);
        //   } else {
        //     console.log('Socket ID deleted from memcache for user_id:', user_id);
        //   }
        // });
    }
}

module.exports = new SocketService();