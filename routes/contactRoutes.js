const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  getCurrentUserContacts,
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.route('/user-contacts').get(getCurrentUserContacts);
router.route('/').get(getContacts);
router.route('/:id').get(getContactById);
router.route('/').post(createContact);
router.route('/:id').put(updateContact);
router.route('/:id').delete(deleteContact);

/* More  specific routes should be placed first than general routes */

// Following convenstion got issues when accessing ('/user-contacts')
// router.use(validateToken); // Can be used as this or can be use separately eg: router.route('/').get(validateToken, getContacts).post(validateToken, createContact);
// Routes simplified
// router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);
// router.route('/user-contacts').get(getCurrentUserContacts);
// router.route('/').get(getContacts).post(createContact);
module.exports = router;
