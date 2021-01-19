const Base = require("../models/Base");

module.exports = {
  async index(req, res) {
    try {
      const allFiles = await Base.find();

      return res.json(allFiles);
    } catch (error) {
      console.error(error)
    }
  },
  async post(req, res) {
    const { originalname: name, size, key, location: url = '' } = req.file;
    try {
      const post = await Base.create({
        name, 
        size, 
        key, 
        url
      });
  
      return res.json(post);
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    const file = await Base.findById(id);
    
    await file.remove();

    return res.send();
  },
};