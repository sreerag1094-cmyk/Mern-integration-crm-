import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import FormField from '../components/FormField.jsx';

export default function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = 'Enter a valid email';
    if (!values.password) e.password = 'Password is required';
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
      const { data } = await api.post('/auth/login', values);
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
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        {serverError && (
          <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{serverError}</div>
        )}
        <FormField label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
        <FormField label="Password" name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          No account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
