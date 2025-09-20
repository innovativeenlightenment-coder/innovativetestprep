"use client";
import { TableHeader} from "lucide-react";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./components/ui/table";
import { Search, Edit, Trash2 } from "lucide-react";

// Revenue Data
const revenueData = [
  { name: "JEE", value: 45000 },
  { name: "NEET", value: 38000 },
  { name: "CET", value: 25000 },
  { name: "Foundation", value: 15000 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Student Data
const studentData = [
  {
    id: 1,
    name: "Rahul Sharma",
    course: "JEE",
    status: "Subscribed",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Patel",
    course: "NEET",
    status: "Unsubscribed",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Amit Verma",
    course: "CET",
    status: "Subscribed",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

// Teacher Data
const teacherData = [
  {
    id: 1,
    name: "Suresh Kumar",
    course: "JEE",
    subject: "Mathematics",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 2,
    name: "Anita Desai",
    course: "NEET",
    subject: "Biology",
    img: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    id: 3,
    name: "Ravi Singh",
    course: "Foundation",
    subject: "Physics",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

export default function DashboardPage() {
  const [searchStudent, setSearchStudent] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");

  const filteredStudents = studentData.filter((s) =>
    s.name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const filteredTeachers = teacherData.filter((t) =>
    t.name.toLowerCase().includes(searchTeacher.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-blue-500 text-white shadow-lg">
          <CardHeader>
            <CardTitle>Total Admissions (Foundation)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">150</CardContent>
        </Card>
        <Card className="bg-green-500 text-white shadow-lg">
          <CardHeader>
            <CardTitle>Total Admissions (NEET)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">180</CardContent>
        </Card>
        <Card className="bg-purple-500 text-white shadow-lg">
          <CardHeader>
            <CardTitle>Total Admissions (JEE)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">120</CardContent>
        </Card>
        <Card className="bg-orange-500 text-white shadow-lg">
          <CardHeader>
            <CardTitle>Total Admissions (CET)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">100</CardContent>
        </Card>
        <Card className="bg-pink-500 text-white shadow-lg">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">₹1,38,000</CardContent>
        </Card>
      </div>

      {/* Revenue Pie Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Revenue by Course</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {revenueData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card className="shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Students List</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.img}
                        alt={student.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.status}</TableCell>
                  <TableCell className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Teacher Table */}
      <Card className="shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Teachers List</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchTeacher}
              onChange={(e) => setSearchTeacher(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={teacher.img}
                        alt={teacher.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{teacher.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{teacher.course}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
