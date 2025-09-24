"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Pencil, Trash2, Lock, Unlock } from "lucide-react";

const performanceData = [
  { subject: "Math", score: 85 },
  { subject: "Physics", score: 75 },
  { subject: "Chemistry", score: 92 },
  { subject: "Biology", score: 68 },
  { subject: "English", score: 88 },
];

const tableData = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  test: `Test ${((i % 5) + 1)}`,
  score: Math.floor(Math.random() * 100),
  status: Math.random() > 0.5 ? "Active" : "Blocked",
}));

export default function PerformancePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = tableData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-6">
      {/* Page Header */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        Student Test Performance Dashboard
      </h1>

      {/* Performance Breakdown Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Table Cards */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border-l-8 border-indigo-500">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">
            Performance Breakdown
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-indigo-800">
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Score (%)</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((item, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-indigo-50" : "bg-white"
                  } hover:bg-indigo-100`}
                >
                  <td className="px-4 py-2 font-medium">{item.subject}</td>
                  <td className="px-4 py-2 text-indigo-700 font-semibold">
                    {item.score}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border-l-8 border-pink-500">
          <h2 className="text-2xl font-bold mb-4 text-pink-600">
            Performance Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Test Table */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border-l-8 border-green-500">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Student Test Details
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Test</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-green-50 transition-colors"
              >
                <td className="px-4 py-2">{student.id}</td>
                <td className="px-4 py-2 font-medium">{student.name}</td>
                <td className="px-4 py-2">{student.test}</td>
                <td className="px-4 py-2 font-semibold text-green-700">
                  {student.score}%
                </td>
                <td>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      student.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="flex gap-3 px-4 py-2">
                  <Pencil className="text-blue-600 cursor-pointer hover:scale-110 transition" />
                  <Trash2 className="text-red-600 cursor-pointer hover:scale-110 transition" />
                  {student.status === "Active" ? (
                    <Lock className="text-gray-600 cursor-pointer hover:scale-110 transition" />
                  ) : (
                    <Unlock className="text-green-600 cursor-pointer hover:scale-110 transition" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-green-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
