const User = require('../models/User');

exports.updatingUser = async (req, res) => {
    const userId = req.user.id;
    const updates = req.body; // General profile details (e.g., name, phone)

    try {
        await User.findByIdAndUpdate(userId, { $set: updates });
        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating profile" });
    }
};

exports.addCards = async (req, res) => {
    const userId = req.user.id;
    const newCard = req.body; // Card details from the frontend

    try {
        await User.findByIdAndUpdate(userId, { $push: { cards: newCard } });
        res.json({ success: true, message: "Card added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding card" });
    }
};


exports.addAddress = async (req, res) => {
    const userId = req.user.id; // Extracted from the authentication middleware
    const newAddress = req.body; // Address details from the frontend

    try {
        await User.findByIdAndUpdate(userId, { $push: { addresses: newAddress } });
        res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding address" });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();  // Fetch all users
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ error: 'Failed to fetch users' });
    }
  };