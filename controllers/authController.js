require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const User = require('../models/User');

const generateJwt = (id, email, status) => jwt.sign({ id, email, status }, process.env.SECRET_KEY, { expiresIn: '24h' });

class AuthController {
  async registration(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(ApiError.badRequest('Incorrect user data'));
    }
    const [candidate, _] = await User.findOne(email);
    if (candidate.length !== 0) {
      return next(ApiError.badRequest('User with this email already exists'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create(name, email, hashPassword);
    console.log('user', user);
    const [newUser, _fields] = await User.findById(user[0].insertId);
    console.log('newuser', newUser);
    const token = generateJwt(newUser[0].id, newUser[0].email, newUser[0].status);
    console.log('token', token);
    return res.status(201).json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const [user, _] = await User.findOne(email);
    if (user.length === 0) {
      return next(ApiError.internal('User with this email was not found'));
    }
    if (user[0].status === 'blocked') {
      return next(ApiError.internal('User is blocked and cannot log in'));
    }
    const comparePassword = bcrypt.compareSync(password, user[0].password);
    if (!comparePassword) {
      return next(ApiError.internal('Invalid password'));
    }
    await User.login(user[0].id);
    const token = generateJwt(user[0].id, user[0].email, user[0].status);
    return res.status(200).json({ token });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.status);
    return res.status(200).json({ token });
  }
}

module.exports = new AuthController();
