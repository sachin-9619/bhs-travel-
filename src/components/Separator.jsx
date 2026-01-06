// Simple separator component
export function Separator({ className = '' }) {
  return (
    <div className={`h-px bg-gray-300 dark:bg-gray-600 ${className}`} />
  );
}
