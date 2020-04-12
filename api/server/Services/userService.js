const DB = require("../src/models");
// const AppError = require("../error/appError");

class UserService {
  static async getAllUsers() {
    try {
      return await DB.User.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async createUser(newUser) {
    try {
      return await DB.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, updateUser) {
    try {
      const userToUpdate = await DB.User.findOne({ where: { id: Number(id) } });

      if (userToUpdate) {
        await DB.User.update(updateUser, { where: { id: Number(id) } });
        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAUser(id) {
    try {
      const user = await DB.User.findOne({ where: { id: Number(id) } });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByUsername(username) {
    try {
      const user = await DB.User.findOne({ where: { username: username } });

      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  
  static async deleteUser(id) {
    try {
      const userToDelete = await DB.User.findOne({ where: { id: Number(id) } });

      if (userToDelete) {
        await DB.User.destroy({ where: { id: Number(id) } });
        return userToDelete;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
