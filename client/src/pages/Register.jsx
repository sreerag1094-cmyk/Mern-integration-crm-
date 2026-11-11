import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import FormField from '../components/FormField.jsx';

export default function Register() {
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (values.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = 'Enter a valid email';
    if (values.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (values.confirm !== values.password) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      login(data);
      navigate('/');
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-md px-4">
      <form onSubmit={handleSubmit} noValidate className="rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Create account</h1>
        {serverError && (
          <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{serverError}</div>
        )}
        <FormField label="Name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
        <FormField label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
        <FormField label="Password" name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} />
        <FormField label="Confirm password" name="confirm" type="password" value={values.confirm} onChange={handleChange} error={errors.confirm} />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
