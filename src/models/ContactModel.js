const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createdAt: { type: Date, default: Date.now },

});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  static async searchForId(id) {
    if (typeof id !== 'string') return;
    const user = await ContactModel.findById(id);
    return user;
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    this.validate();
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
  }

  validate() {
    this.cleanUp();
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email is not a valid email')
    if (!this.body.name) this.errors.push('Name is a required field')
    if (!this.body.email && !this.body.phone) this.errors.push('You must provide a phone number or email address')
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      email: this.body.email,
      phone: this.body.phone,
    };
  }

}

module.exports = Contact;
