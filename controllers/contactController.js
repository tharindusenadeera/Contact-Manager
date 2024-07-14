//@desc Get all contacts
//@route GET /api/contact
//@access public

const getContacts = (req, res) => {
  res.status(200).json({ message: 'Get all contact list' });
};

//@desc Get contact by Id
//@route GET /api/contact/:id
//@access public

const getContactById = (req, res) => {
  res.status(200).json({ message: `Get contact by id : ${req?.params?.id}` });
};

//@desc Create contact
//@route POST /api/contact
//@access public

const createContact = (req, res) => {
  const { firstName, email, phoneNumber } = req?.body;
  if (!firstName || !email || !phoneNumber) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  res.status(201).json({ message: 'Contact created!' });
};

//@desc Update contact by Id
//@route PUT /api/contact/:id
//@access public

const updateContact = (req, res) => {
  res.status(200).json({ message: `Update contact by id : ${req?.params?.id}` });
};

//@desc Delete contact by Id
//@route DELETE /api/contact/:id
//@access public

const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact : ${req?.params?.id}` });
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
