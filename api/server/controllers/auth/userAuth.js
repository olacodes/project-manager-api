const UserService = require("../../Services/userService");
const Util = require("../../utils/utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const util = new Util();

class UserAuth {
  static async userRegister(req, res) {
    const newUser = req.body;

    if (!newUser.username || !newUser.email || !newUser.password) {
      util.setError(400, "Username, Email or Password must not be empty");
      return util.send(res);
    }

    try {
      const { username, password, email } = req.body;

      const checkUserAleradyExist = await UserService.getUserByUsername(
        username
      );

      if (checkUserAleradyExist) {
        util.setError(400, "Username already exist");
        return util.send(res);
      }

      const hashedPassword = await bcrypt.hash(
        password,
        bcrypt.genSaltSync(process.env.BCRYPT_SALT * 1)
      );

      const token = jwt.sign(
        { username: newUser.username },
        process.env.JWT_SECRET
      );

      const user = { username, email, password: hashedPassword };
      const createdUser = await UserService.createUser({ token, ...user });

      const responseData = { token };

      util.setSuccess(201, "User successfully created!", responseData);
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async userLogin(req, res) {
    const user = req.body;
    // check the user name and password field are not empty
    if (!user.username || !user.password) {
      util.setError(400, "Username or Password must not be empty");

      return util.send(res);
    }

    const { username, password } = user;

    try {
      const user = await UserService.getUserByUsername(username);

      // Check if user exist
      if (!user) {
        util.setError(400, "Invalid username");
        return util.send(res);
      } else {
        // check if password match
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
          util.setError(400, "Invalid password");
          return util.send(res);
        } else {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          util.setSuccess(200, "Login successful", { token: token });
          return util.send(res);
        }
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async userLogout(req, res) {
    const user = req.body;

    try {
      if (!user.username) {
        util.setError(400, "You are not logged in");
        util.send(res);
      }
      const loginUser = await UserService.getUserByUsername(user.username);

      if (loginUser) {
        util.setSuccess(200, "You are logged out");
        util.send(res);
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = UserAuth;
