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
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: encryptedPassword,
            phone,
            is_active: 0,
            role: 'USER'
        });
        if(user) {
          const { password, ...userWithoutPassword } = user.dataValues;
          return userWithoutPassword;
        }else {
          throw new Error('Couldn\'t create user')
        }
        

    }
    async loginUser(email, password) {
        try {
          const user = await User.findOne({ where: { email: email } });
          if (user && await bcrypt.compare(password, user.password)) {
            const token = await jwt.sign(
              { user_id: user.user_id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "7d"
              }
            );
            user.is_active = true;
            await user.save();
            user.dataValues.token = token;
            const { password, ...userWithoutPassword } = user.dataValues;
            return userWithoutPassword;
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
                await user.update({ is_active: false});
                return true;
            }
            throw new Error("User not found");
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    async getProfile(id) {
      try {
        const user = await User.findOne({ where: { user_id: id } })
        if(user) {
          const { password, ...userWithoutPassword } = user.dataValues;
          return userWithoutPassword;
        }
        throw new Error("User not found");
      } catch (err) {
          console.log(err);
          throw err;
      }
    }
    async editProfile(id, profileData) {
      try {
        const user = await User.findByPk(id);
  
        if (!user) {
          throw new Error("User not found");
        }

        user.first_name = profileData.first_name
        user.last_name = profileData.last_name
        user.email = profileData.email
        user.phone = profileData.phone
        user.Line_id = profileData.Line_id
        user.image_profile = profileData.image_profile
  
        await user.save();
        const { password, ...updatedUser } = user.dataValues;
  
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    async editImageProfile(id, images_profile) {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error("User not found");
        }
        user.image_profile = images_profile
        await user.save();
        const { password, ...updatedUser } = user.dataValues;
        return updatedUser;
      } catch (err) {
        console.log(err)
        throw err;
      }
    }

}

module.exports = new UserService();