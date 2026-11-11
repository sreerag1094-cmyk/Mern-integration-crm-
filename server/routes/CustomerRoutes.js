const express = require('express');
const {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/CustomerController');
const { protect } = require('../middleware/Auth');
const { validateCustomer } = require('../middleware/validate');

const router = express.Router();

router.use(protect);

router.route('/').get(getCustomers).post(validateCustomer, createCustomer);
router
  .route('/:id')
  .get(getCustomer)
  .put(validateCustomer, updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
