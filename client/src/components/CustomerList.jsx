const badge = {
  Lead: 'bg-yellow-100 text-yellow-800',
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-200 text-gray-700',
};

export default function CustomerList({ customers, onEdit, onDelete }) {
  if (!customers.length) {
    return (
      <div className="rounded-lg bg-white p-8 text-center text-gray-500 shadow">
        No customers yet. Add your first one.
      </div>
    );
  }

  return (
    <>
      {/* Table for md+ screens */}
      <div className="hidden overflow-hidden rounded-lg bg-white shadow md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {customers.map((c) => (
              <tr key={c._id}>
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone}</td>
                <td className="px-4 py-3">{c.company || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${badge[c.status]}`}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onEdit(c)} className="mr-3 text-indigo-600 hover:underline">Edit</button>
                  <button onClick={() => onDelete(c)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="space-y-3 md:hidden">
        {customers.map((c) => (
          <div key={c._id} className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold">{c.name}</h3>
              <span className={`rounded-full px-2 py-0.5 text-xs ${badge[c.status]}`}>{c.status}</span>
            </div>
            <p className="text-sm text-gray-600">{c.email}</p>
            <p className="text-sm text-gray-600">{c.phone}</p>
            {c.company && <p className="text-sm text-gray-600">{c.company}</p>}
            <div className="mt-3 flex gap-4 text-sm">
              <button onClick={() => onEdit(c)} className="text-indigo-600">Edit</button>
              <button onClick={() => onDelete(c)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
