const User = require('../models/user');

class SocketService {
    async updateIsActive(socket_id ,user_id) {
        const user = await User.findByPk(user_id);
        user.is_active = true
        user.updated_at = Date.now();
        user.save()
        console.log('user: ', user)
    }
    async logoutIsActive(socket_id, user_id) {
        
    }
}

module.exports = new SocketService();