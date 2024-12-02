const mongoose = require('mongoose');
const Menu = require("./menu");
require("dotenv").config();

// Cart Schema
const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
      quantity: { type: Number, default: 1 },
    },
  ],
  subtotal: { type: Number, default: 0 },
  totalToPay: { type: Number, default: 0 },
});

cartSchema.methods.addItem = async function (menuId, price) {
    const existingItemIndex = this.items.findIndex((item) => 
      item.productId.toString() === menuId
    );
  
    if (existingItemIndex >= 0) {
      // If item exists, increment its quantity
      this.items[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, push a new item
      this.items.push({ productId: menuId, quantity: 1 });
    }
  
    // Recalculate the subtotal
    this.subtotal += price;
    this.totalToPay = this.subtotal; // Assuming no additional charges
    await this.save(); // Save the updated cart
  };

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;