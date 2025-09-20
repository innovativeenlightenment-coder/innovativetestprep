import React from "react";

export function Table({ children, className }) {
  return <table className={`w-full border-collapse ${className}`}>{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="hover:bg-gray-50">{children}</tr>;
}

export function TableHead({ children, className }) {
  return (
    <th className={`px-4 py-2 text-left text-sm font-semibold text-gray-700 ${className}`}>
      {children}
    </th>
  );
}

export function TableCell({ children, className }) {
  return (
    <td className={`px-4 py-2 text-sm text-gray-600 ${className}`}>
      {children}
    </td>
  );
}
