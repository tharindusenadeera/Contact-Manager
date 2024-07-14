const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contact
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({ message: 'Get all contact list', data: contacts });
});

//@desc Get contact by Id
//@route GET /api/contact/:id
//@access public

const getContactById = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contact by id : ${req?.params?.id}` });
});

//@desc Create contact
//@route POST /api/contact
//@access public

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req?.body;
  if (!name || !email || !phoneNumber) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  res.status(201).json({ message: 'Contact created!' });
});

//@desc Update contact by Id
//@route PUT /api/contact/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact by id : ${req?.params?.id}` });
});

//@desc Delete contact by Id
//@route DELETE /api/contact/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contact : ${req?.params?.id}` });
});

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
