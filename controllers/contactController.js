const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contact
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({ message: 'Get all contact list', data: contacts });
});

//@desc Get contact by Id
//@route GET /api/contact/:id
//@access private

const getContactById = asyncHandler(async (req, res) => {
  const id = req?.params?.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json({ data: contact });
});

//@desc Create contact
//@route POST /api/contact
//@access private

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req?.body;
  if (!name || !email || !phoneNumber) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const contact = await Contact.create({
    name,
    email,
    phoneNumber,
  });
  res.status(201).json({ message: 'Contact created!', data: contact });
});

//@desc Update contact by Id
//@route PUT /api/contact/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const id = req?.params?.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ message: `success`, data: updateContact });
});

//@desc Delete contact by Id
//@route DELETE /api/contact/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const id = req?.params?.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  await Contact.findByIdAndDelete(id);
  res.status(200).json({ message: `Contact deleted!`, data: contact });
});

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
