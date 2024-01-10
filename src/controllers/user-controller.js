const { User } = require('../models/User');
const { Thought } = require('../models/Thought');
const dateFormat = require('../../utils/dateFormat')


const userController = {
  // Retrieve all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-__v');
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  },

  // Retrieve a single user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve the user' });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create the user' });
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update the user' });
    }
  },

  // Delete a user (and associated thoughts)
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete the user and thoughts' });
    }
  },

  // Add a friend to the friend list
  async addFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add a friend' });
    }
  },

  // Remove a friend from the friend list
  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to remove a friend' });
    }
  },
};

module.exports = userController;
