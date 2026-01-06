export default function Label({ children, ...props }) {
  return (
    <label {...props} className="font-medium text-gray-700">
      {children}
    </label>
  );
}
