// Badge.jsx
export function Badge({ children, className }) {
  return <span className={`inline-block px-2 py-1 text-sm rounded ${className}`}>{children}</span>;
}
// ✅ Add default export to fix the error
export default Badge;