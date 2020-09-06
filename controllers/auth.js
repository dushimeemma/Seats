import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'failed',
        msg: 'Both fields are required',
      });
    }
    const cUser = await User.findOne({ email });
    if (cUser) {
      return res.status(400).json({
        status: 'failed',
        msg: 'User already exists',
      });
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash;
    await newUser.save();
    const user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    };

    const token = jwt.sign(user, config[process.env.NODE_ENV].jwtSecret, {
      expiresIn: 3600,
    });

    res.status(200).json({
      status: 'ok',
      msg: 'User created success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
  async authUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'failed',
        msg: 'Both fields are required',
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        msg: 'User does not exists',
      });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'failed',
        msg: 'Invalid credentials',
      });
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const token = jwt.sign(payload, config[process.env.NODE_ENV].jwtSecret, {
      expiresIn: 3600,
    });
    res.status(200).json({
      status: 'ok',
      msg: 'User logged in success',
      token,
      user: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      },
    });
  }
}
export default UserController;
