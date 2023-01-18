const User = require('../models/user');
const bcrypt = require('bcryptjs');

class UserService {
    async register(userDetails) {
        const { first_name, last_name, email, password } = userDetails;
        const oldUser = await User.findOne({ email });
        if(oldUser) {
            throw new Error("User already exists. Please Login");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        return await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });
    }
    async findOne(email) {
        return await User.findOne({ email });
    }
    async loginUser (email, password) {
        try {
            const user = await User.findOne({ email });
            if( user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "12h"
                    }
                )
                user.token = token;
                return user;
            }
            throw new Error("Invalid email or password");
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}

module.exports = new UserService();