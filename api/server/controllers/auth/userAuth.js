const UserService = require("../../Services/userService");
const Util = require("../../utils/utils");

const util = new Util();

class UserAuth {
  static async userRegister(req, res) {
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
}