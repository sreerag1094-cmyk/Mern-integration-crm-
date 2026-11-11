export default function FormField({ label, error, as = 'input', children, ...props }) {
  const base =
    'w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400 ' +
    (error ? 'border-red-500' : 'border-gray-300');
  const Tag = as;
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <Tag className={base} {...props}>
        {children}
      </Tag>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
