const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a category description'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
