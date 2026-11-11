const Customer = require('../models/CustomerModel');

// POST /api/customers
exports.createCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    const customer = await Customer.create({
      user: req.user._id,
      name,
      email,
      phone,
      company,
      status,
      notes,
    });
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};

// GET /api/customers
exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

// GET /api/customers/:id
exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, user: req.user._id });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

// PUT /api/customers/:id
exports.updateCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, email, phone, company, status, notes },
      { new: true, runValidators: true }
    );
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/customers/:id
exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted', id: customer._id });
  } catch (err) {
    next(err);
  }
};
