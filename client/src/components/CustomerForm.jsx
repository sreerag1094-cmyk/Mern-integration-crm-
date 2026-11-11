import { useEffect, useState } from 'react';
import FormField from './FormField.jsx';

const empty = { name: '', email: '', phone: '', company: '', status: 'Lead', notes: '' };

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = 'Name is required';
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email';
  if (!/^[0-9+\-\s()]{7,15}$/.test(v.phone)) e.phone = 'Enter a valid phone (7-15 digits)';
  return e;
};

export default function CustomerForm({ editing, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(editing ? { ...empty, ...editing } : empty);
    setErrors({});
  }, [editing]);

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-5 shadow" noValidate>
      <h2 className="mb-4 text-lg font-semibold">
        {editing ? 'Update Customer' : 'Add Customer'}
      </h2>
      <FormField label="Name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
      <FormField label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
      <FormField label="Phone" name="phone" value={values.phone} onChange={handleChange} error={errors.phone} />
      <FormField label="Company" name="company" value={values.company} onChange={handleChange} />
      <FormField label="Status" as="select" name="status" value={values.status} onChange={handleChange}>
        <option>Lead</option>
        <option>Active</option>
        <option>Inactive</option>
      </FormField>
      <FormField label="Notes" as="textarea" rows="3" name="notes" value={values.notes} onChange={handleChange} />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? 'Saving...' : editing ? 'Update' : 'Add'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
