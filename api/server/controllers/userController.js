const UserService = require("../Services/userService");
const Util = require("../utils/utils");

const util = new Util();

class UserController {
  static async getAllUsers(req, res) {
    try {
      const allusers = await UserService.getAllUsers();

      if (allusers.length > 0) {
        util.setSuccess(200, "users successfully retrieved", allusers);
      } else {
        util.setSuccess(200, "No user found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async createUser(req, res) {
    const newUser = req.body;
    if (!newUser.username || !newUser.email || !newUser.password) {
      util.setError(400, "Username, Email or Password must not be empty");
      return util.send(res);
    }

    try {
      const createdUser = await UserService.createUser(newUser);
      util.setSuccess(201, "User Created!", createdUser);
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getAUser(req, res) {

    const { id } = req.params;

    if (!Number(id)){
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const user = await UserService.getAUser(id);

      if (!user) {
        util.setError(404, `Can't find the user with the id ${id}`)
      }
      else{
        util.setSuccess(200, "user successfully retrieved", user);
      }
      return util.send(res);

    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async deleteUser(req, res) {
      const userId = req.params.id;
      try {
        const user = await UserService.deleteUser(userId);
        util.setSuccess(204, 'user deleted', user)
        util.send(res)
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
  }
}

module.exports = UserController;
