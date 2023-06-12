const User = require('../models/User');

class UserController {
  async getAll(req, res) {
    let { page, limit } = req.query;
    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;
    const [users, _] = await User.getAll(limit, offset);
    return res.status(200).json(users);
  }

  async countAll(req, res) {
    const [usersCount, _] = await User.countAll();
    return res.status(200).json(usersCount[0]);
  }

  async changeStatus(req, res) {
    const { id, status } = req.body;
    const [user, _] = await User.changeStatus(id, status);
    return res.status(200).json(user);
  }

  async delete(req, res) {
    const { id } = req.body;
    const [user, _] = await User.delete(id);
    return res.status(200).json(user);
  }
}

module.exports = new UserController();
