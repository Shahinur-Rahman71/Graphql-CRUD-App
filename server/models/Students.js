var {Schema, model} = require('mongoose');

var StudentSchema = new Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  birthdate: String,
  subject: String
});

module.exports = model('Student', StudentSchema);