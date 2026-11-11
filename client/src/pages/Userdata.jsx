import { useCallback, useEffect, useState } from 'react';
import api, { getErrorMessage } from '../api/axios.js';
import CustomerForm from '../components/CustomerForm.jsx';
import CustomerList from '../components/CustomerList.jsx';

export default function Userdata() {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchCustomers = useCallback(async () => {
    try {
      const { data } = await api.get('/customers');
      setCustomers(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSubmit = async (values) => {
    setError('');
    setSubmitting(true);
    try {
      if (editing) {
        await api.put(`/customers/${editing._id}`, values);
        setEditing(null);
      } else {
        await api.post('/customers', values);
      }
      await fetchCustomers();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (customer) => {
    if (!window.confirm(`Delete ${customer.name}?`)) return;
    setError('');
    try {
      await api.delete(`/customers/${customer._id}`);
      if (editing?._id === customer._id) setEditing(null);
      await fetchCustomers();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Customers</h1>
      {error && <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CustomerForm
            editing={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            submitting={submitting}
          />
        </div>
        <div className="lg:col-span-2">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <CustomerList customers={customers} onEdit={setEditing} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
