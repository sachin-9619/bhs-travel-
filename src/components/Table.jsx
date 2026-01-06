// src/components/Table.jsx
import React from "react";

// Main Table wrapper
export const Table = ({ children, className = "" }) => (
  <div className={`overflow-x-auto ${className}`}>
    <table className="w-full border-collapse">{children}</table>
  </div>
);

// Table Header
export const TableHeader = ({ children, className = "" }) => (
  <thead className={className}>{children}</thead>
);

// Table Body
export const TableBody = ({ children, className = "" }) => (
  <tbody className={className}>{children}</tbody>
);

// Table Row
export const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b last:border-b-0 ${className}`}>{children}</tr>
);

// Table Head Cell
export const TableHead = ({ children, className = "" }) => (
  <th
    className={`text-left py-3 px-4 font-medium text-muted-foreground ${className}`}
  >
    {children}
  </th>
);

// Table Cell
export const TableCell = ({ children, className = "" }) => (
  <td className={`py-3 px-4 ${className}`}>{children}</td>
);

// Default export (optional)
const TableComponents = {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};

export default TableComponents;
