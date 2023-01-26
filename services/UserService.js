const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
    async register(userDetails) {
        const { first_name, last_name, email, password, phone } = userDetails;
        const existingUser = await User.findOne({ 
            where: { email }
        });
        if(existingUser) {
            throw new Error("User already exists. Please Login");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        return await User.create({
            first_name,
            last_name,
            email,
            password: encryptedPassword,
            phone,
            is_active: 0
        });
    }
    async loginUser(email, password) {
        try {
          const user = await User.findOne({ where: { email: email } });
          if (user && await bcrypt.compare(password, user.password)) {
            const token = await jwt.sign(
              { user_id: user.id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "12h"
              }
            );
            user.is_active = true;
            await user.save();
            user.dataValues.token = token;
            return user;
          }
          throw new Error("Invalid email or password");
        } catch (err) {
          console.log(err);
          throw err;
        }
    }
    async logoutUser(email) {
        try {
            const user = await User.findOne({ where: { email: email } })
            if(user) {
                await user.update({ is_active: false });
                return true;
            }
            throw new Error("User not found");
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = new UserService();