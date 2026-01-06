export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
