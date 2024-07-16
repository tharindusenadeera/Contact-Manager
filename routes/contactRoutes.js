const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

// router.route('/').get(getContacts);
// router.route('/:id').get(getContactById);
// router.route('/').post(createContact);
// router.route('/:id').put(updateContact);
// router.route('/:id').delete(deleteContact);

// Routes simplified
router.route('/').get(validateToken, getContacts).post(validateToken, createContact);
router
  .route('/:id')
  .get(validateToken, getContactById)
  .put(validateToken, updateContact)
  .delete(validateToken, deleteContact);
module.exports = router;
