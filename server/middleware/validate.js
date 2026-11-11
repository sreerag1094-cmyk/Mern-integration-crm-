const emailRe = /^\S+@\S+\.\S+$/;
const phoneRe = /^[0-9+\-\s()]{7,15}$/;

const fail = (res, errors) =>
  res.status(400).json({ message: 'Validation failed', errors });

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters');
  if (!email || !emailRe.test(email)) errors.push('A valid email is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');
  return errors.length ? fail(res, errors) : next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email || !emailRe.test(email)) errors.push('A valid email is required');
  if (!password) errors.push('Password is required');
  return errors.length ? fail(res, errors) : next();
};

const validateCustomer = (req, res, next) => {
  const { name, email, phone, status } = req.body;
  const errors = [];
  if (!name || !name.trim()) errors.push('Name is required');
  if (!email || !emailRe.test(email)) errors.push('A valid email is required');
  if (!phone || !phoneRe.test(phone)) errors.push('A valid phone number is required (7-15 digits)');
  if (status && !['Lead', 'Active', 'Inactive'].includes(status)) {
    errors.push('Status must be Lead, Active or Inactive');
  }
  return errors.length ? fail(res, errors) : next();
};

module.exports = { validateRegister, validateLogin, validateCustomer };
