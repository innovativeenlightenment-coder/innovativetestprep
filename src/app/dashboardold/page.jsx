"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

// ---------------- Sample Data ----------------
const studentsData = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  course: ["Foundation", "NEET", "JEE", "CET"][i % 4],
  status: i % 2 === 0 ? "Active" : "Blocked",
}));

const teachersData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Teacher ${i + 1}`,
  subject: ["Maths", "Physics", "Chemistry", "Biology"][i % 4],
  joined: `2025-0${(i % 9) + 1}-15`,
  status: i % 2 === 0 ? "Active" : "Blocked",
}));

const testsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  student: `Student ${i + 1}`,
  course: ["Foundation", "NEET", "JEE", "CET"][i % 4],
  subject: ["Maths", "Physics", "Chemistry", "Biology"][i % 4],
  test: `Test ${i + 1}`,
  score: Math.floor(Math.random() * 100),
  date: `2025-0${(i % 9) + 1}-10`,
}));

// ---------------- Helper ----------------
const paginate = (data, page, perPage) =>
  data.slice((page - 1) * perPage, page * perPage);

// ---------------- Dashboard ----------------
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("students");

  // Students
  const [studentPage, setStudentPage] = useState(1);
  const studentsPerPage = 10;
  const toggleStudentStatus = (id) => {
    const student = studentsData.find((s) => s.id === id);
    student.status = student.status === "Active" ? "Blocked" : "Active";
  };

  // Teachers
  const [teacherPage, setTeacherPage] = useState(1);
  const teachersPerPage = 5;
  const toggleTeacherStatus = (id) => {
    const teacher = teachersData.find((t) => t.id === id);
    teacher.status = teacher.status === "Active" ? "Blocked" : "Active";
  };

  // Tests
  const [testPage, setTestPage] = useState(1);
  const testsPerPage = 10;
  const [filterCourse, setFilterCourse] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const filteredTests = testsData.filter(
    (t) =>
      (!filterCourse || t.course === filterCourse) &&
      (!filterSubject || t.subject === filterSubject)
  );
  const toppers = [...filteredTests]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  // Performance Analysis
  const courseGroups = ["Foundation", "NEET", "JEE", "CET"].map((course) => {
    const courseTests = testsData.filter((t) => t.course === course);
    return {
      course,
      avg: (
        courseTests.reduce((a, c) => a + c.score, 0) / courseTests.length
      ).toFixed(1),
      high: Math.max(...courseTests.map((t) => t.score)),
      low: Math.min(...courseTests.map((t) => t.score)),
      total: courseTests.length,
    };
  });

  return (
    <div className="p-6 space-y-6">
      {/* ---------------- Top Stats Cards ---------------- */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { name: "Foundation", total: 30, sub: 28, unsub: 2, color: "bg-indigo-500" },
          { name: "NEET", total: 30, sub: 26, unsub: 4, color: "bg-green-500" },
          { name: "JEE", total: 30, sub: 25, unsub: 5, color: "bg-yellow-500" },
          { name: "CET", total: 30, sub: 24, unsub: 6, color: "bg-purple-500" },
          { name: "Total Revenue", total: "₹150.0K", details: "Foundation: ₹50k, NEET: ₹50k, JEE: ₹25k, CET: ₹25k", color: "bg-red-500" },
        ].map((card, i) => (
          <Card key={i} className={`${card.color} text-white p-4`}>
            <h2 className="text-lg font-semibold">{card.name}</h2>
            <p className="text-2xl font-bold">{card.total}</p>
            {card.sub && <p>Subscribed {card.sub} | Unsubscribed {card.unsub}</p>}
            {card.details && <p className="text-sm">{card.details}</p>}
          </Card>
        ))}
      </div>

      {/* ---------------- Charts Row ---------------- */}
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent><h2>Subscriptions</h2></CardContent></Card>
        <Card><CardContent><h2>Admissions by Course</h2></CardContent></Card>
        <Card><CardContent><h2>Revenue by Course</h2></CardContent></Card>
      </div>

      {/* ---------------- Tabs ---------------- */}
      <div className="flex gap-4">
        {["students", "teachers", "tests"].map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            variant={activeTab === tab ? "default" : "outline"}
          >
            {tab.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* ---------------- Students ---------------- */}
      {activeTab === "students" && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Students</h2>
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate(studentsData, studentPage, studentsPerPage).map((s) => (
                  <tr key={s.id} className="border-b">
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>{s.status}</td>
                    <td>
                      <Button onClick={() => toggleStudentStatus(s.id)}>
                        {s.status === "Active" ? "Block" : "Unblock"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-2 mt-2">
              {Array.from({ length: Math.ceil(studentsData.length / studentsPerPage) }, (_, i) => (
                <Button key={i} onClick={() => setStudentPage(i + 1)}>{i + 1}</Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ---------------- Teachers ---------------- */}
      {activeTab === "teachers" && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Teachers</h2>
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate(teachersData, teacherPage, teachersPerPage).map((t) => (
                  <tr key={t.id} className="border-b">
                    <td>{t.name}</td>
                    <td>{t.subject}</td>
                    <td>{t.joined}</td>
                    <td>{t.status}</td>
                    <td>
                      <Button onClick={() => toggleTeacherStatus(t.id)}>
                        {t.status === "Active" ? "Block" : "Unblock"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-2 mt-2">
              {Array.from({ length: Math.ceil(teachersData.length / teachersPerPage) }, (_, i) => (
                <Button key={i} onClick={() => setTeacherPage(i + 1)}>{i + 1}</Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ---------------- Tests ---------------- */}
      {activeTab === "tests" && (
        <div className="grid grid-cols-3 gap-4">
          {/* Left: Test Table */}
          <Card className="col-span-2">
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Tests</h2>

              {/* Filters */}
              <div className="flex gap-2 mb-4">
                <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
                  <option value="">All Courses</option>
                  <option value="Foundation">Foundation</option>
                  <option value="NEET">NEET</option>
                  <option value="JEE">JEE</option>
                  <option value="CET">CET</option>
                </select>
                <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                  <option value="">All Subjects</option>
                  <option value="Maths">Maths</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              {/* Table */}
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Subject</th>
                    <th>Test</th>
                    <th>Score</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(filteredTests, testPage, testsPerPage).map((t) => (
                    <tr key={t.id} className="border-b">
                      <td>{t.student}</td>
                      <td>{t.course}</td>
                      <td>{t.subject}</td>
                      <td>{t.test}</td>
                      <td>{t.score}</td>
                      <td>{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2 mt-2">
                {Array.from({ length: Math.ceil(filteredTests.length / testsPerPage) }, (_, i) => (
                  <Button key={i} onClick={() => setTestPage(i + 1)}>{i + 1}</Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right: Toppers */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Topper List</h2>
              <div className="space-y-3">
                {toppers.map((t, i) => (
                  <div key={i} className="p-3 border rounded shadow flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                      {t.student[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{t.student}</p>
                      <p className="text-sm text-gray-600">{t.course} | {t.subject}</p>
                    </div>
                    <div className="ml-auto font-bold">{t.score}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---------------- Performance Analysis ---------------- */}
      {activeTab === "tests" && (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Performance Analysis (Table)</h2>
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th>Course</th>
                    <th>Avg</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Total Tests</th>
                  </tr>
                </thead>
                <tbody>
                  {courseGroups.map((c) => (
                    <tr key={c.course} className="border-b">
                      <td>{c.course}</td>
                      <td>{c.avg}</td>
                      <td>{c.high}</td>
                      <td>{c.low}</td>
                      <td>{c.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Performance Analysis (Chart)</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={courseGroups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avg" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
