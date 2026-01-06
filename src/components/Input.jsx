// src/components/Input.jsx
export function Input({ className = '', ...props }) {
  return (
    <input
      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}
// ✅ Add default export to fix the error
export default Input;