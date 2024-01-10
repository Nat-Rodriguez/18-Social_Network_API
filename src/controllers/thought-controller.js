const { Thought } = require('../../src/models/Thought');
const {User} = require('../models/User')

const thoughtController = {
  // Get all thoughts
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get thoughts' });
    }
  },

  // Get a single thought by id
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get the thought' });
    }
  },

  // Create a thought
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(201).json({ message: 'Thought created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create the thought' });
    }
  },

  // Update thought
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update the thought' });
    }
  },

  // Delete thought
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete the thought' });
    }
  },

  // Add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add reaction' });
    }
  },

  // Remove reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to remove reaction' });
    }
  },
};

module.exports = thoughtController;
