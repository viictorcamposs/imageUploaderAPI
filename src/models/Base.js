const mongoose = require('mongoose');
const { unlinkSync } = require('fs');
const path = require('path');

const BaseSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,  
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

BaseSchema.pre('save', function() {
  !this.url ? this.url = `http://localhost:3000/files/${this.key}` : this.url = this.url;
});
BaseSchema.pre('remove', async function() {
  unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', this.key));
});

module.exports = mongoose.model('Base', BaseSchema);