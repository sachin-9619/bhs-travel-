// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/* MAIN CARD */
export function Card({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
        rounded-3xl p-6 transition-all duration-300
        bg-white dark:bg-gray-500
        shadow-lg hover:shadow-2xl
        hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
        hover:text-white
        border border-transparent hover:border-white
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

/* HEADER */
export function CardHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

/* TITLE */
export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`mb-2 text-xl font-bold tracking-wide transition-colors duration-300 ${className}`}>
      {children}
    </h3>
  );
}

/* CONTENT */
export function CardContent({ children, className = "" }) {
  return (
    <div className={`text-gray-700 dark:text-gray-300 transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
}

/* DEFAULT EXPORT */
export default Card;
