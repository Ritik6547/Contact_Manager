const express = require('express');
const router = express.Router();
const {getAllContacts,getSingleContact,createContact,updateContact,deleteContact} = require('../controllers/contact');
const validateToken = require('../middleware/validateTokenHandler');


// router.get('/',getAllContacts)
// router.post('/',createContact)
// router.get('/:id',getSingleContact)
// router.put('/:id',updateContact)
// router.delete('/:id',deleteContact)

router.use(validateToken);
router.route('/').get(getAllContacts).post(createContact);
router.route('/:id').get(getSingleContact).put(updateContact).delete(deleteContact);

module.exports = router;