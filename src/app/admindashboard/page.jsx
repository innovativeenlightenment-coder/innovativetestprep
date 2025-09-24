"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Pagination,
  Stack,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SearchIcon from "@mui/icons-material/Search";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { red } from "@mui/material/colors";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

/* ---------------------------
   Dummy Data
   --------------------------- */
const COURSES = ["Foundation", "NEET", "JEE", "CET"];
const SUBJECTS = ["Maths", "Physics", "Chemistry", "Biology"];

function makeStudents(n = 120) {
  return Array.from({ length: n }).map((_, i) => {
    const course = COURSES[i % COURSES.length];
    const subject = SUBJECTS[i % SUBJECTS.length];
    return {
      id: `S${String(i + 1).padStart(4, "0")}`,
      sr: i + 1,
      name: `Student ${i + 1}`,
      course,
      subject,
      joined: `2025-${String(((i % 12) + 1)).padStart(2, "0")}-${String(((i % 28) + 1)).padStart(2, "0")}`,
      status: i % 10 === 0 ? "Unsubscribed" : "Subscribed",
      blocked: i % 17 === 0,
      avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
    };
  });
}

function makeTeachers(n = 28) {
  return Array.from({ length: n }).map((_, i) => {
    const course = COURSES[i % COURSES.length];
    const subject = SUBJECTS[i % SUBJECTS.length];
    return {
      id: `T${String(i + 1).padStart(3, "0")}`,
      sr: i + 1,
      name: `Teacher ${i + 1}`,
      course,
      subject,
      joined: `2024-${String(((i % 12) + 1)).padStart(2, "0")}-${String(((i % 28) + 1)).padStart(2, "0")}`,
      blocked: i % 6 === 0,
      avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 11}`,
    };
  });
}

function makeTests(n = 200) {
  return Array.from({ length: n }).map((_, i) => {
    const course = COURSES[i % COURSES.length];
    const subject = SUBJECTS[i % SUBJECTS.length];
    const score = Math.floor(30 + (i * 37) % 71);
    return {
      id: i + 1,
      sr: i + 1,
      studentId: `S${String(((i % 120) + 1)).padStart(4, "0")}`,
      studentName: `Student ${((i % 120) + 1)}`,
      avatar: `https://i.pravatar.cc/40?img=${((i % 70) + 20)}`,
      course,
      subject,
      testName: `Test ${Math.floor(i / 4) + 1}`,
      score,
      percentile: Math.max(1, Math.min(100, Math.round(score + ((i * 13) % 7) - 3))),
      examDate: `2025-${String(((i % 12) + 1)).padStart(2, "0")}-${String(((i % 28) + 1)).padStart(2, "0")}`,
    };
  });
}

const studentsInit = makeStudents();
const teachersInit = makeTeachers();
const testsInit = makeTests();

/* ---------------------------
   Helper: paginate
   --------------------------- */
function paginate(array, page, perPage) {
  const total = array.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const p = Math.max(1, Math.min(page, pages));
  const start = (p - 1) * perPage;
  return {
    data: array.slice(start, start + perPage),
    page: p,
    pages,
    total,
  };
}

/* ---------------------------
   Page Component
   --------------------------- */
export default function DashboardPage() {
  // Global states
  const [tab, setTab] = useState(0);

  // top cards derived data
  const totalStudents = studentsInit.length;
  const subscriptionCounts = useMemo(() => {
    const subscribed = studentsInit.filter(s => s.status === "Subscribed").length;
    const unsubscribed = totalStudents - subscribed;
    return { subscribed, unsubscribed };
  }, [totalStudents]);

  // sample admissions by course
  const admissionsByCourse = useMemo(() => {
    const map = {};
    COURSES.forEach(c => (map[c] = 0));
    studentsInit.forEach(s => map[s.course]++);
    return COURSES.map(c => ({ name: c, value: map[c] }));
  }, []);

  const revenueByCourse = useMemo(() => {
    // user-specified amounts: Foundation 50k, NEET 50k, JEE 25k, CET 25k => total 150k
    return [
      { name: "Foundation", value: 50000 },
      { name: "NEET", value: 50000 },
      { name: "JEE", value: 25000 },
      { name: "CET", value: 25000 },
    ];
  }, []);

  /* ----------------------------
     Students Tab states
     ---------------------------- */
  const [studentQuery, setStudentQuery] = useState("");
  const [studentCourseFilter, setStudentCourseFilter] = useState("");
  const [studentPage, setStudentPage] = useState(1);
  const STUDENTS_PER_PAGE = 25;
  const [students, setStudents] = useState(studentsInit);

  const filteredStudents = useMemo(() => {
    const q = studentQuery.trim().toLowerCase();
    return students.filter(s =>
      (studentCourseFilter === "" || s.course === studentCourseFilter) &&
      (!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q))
    );
  }, [students, studentQuery, studentCourseFilter]);

  const studentsPage = paginate(filteredStudents, studentPage, STUDENTS_PER_PAGE);

  /* ----------------------------
     Teachers Tab states
     ---------------------------- */
  const [teacherQuery, setTeacherQuery] = useState("");
  const [teacherCourseFilter, setTeacherCourseFilter] = useState("");
  const [teacherPage, setTeacherPage] = useState(1);
  const TEACHERS_PER_PAGE = 12;
  const [teachers, setTeachers] = useState(teachersInit);

  const filteredTeachers = useMemo(() => {
    const q = teacherQuery.trim().toLowerCase();
    return teachers.filter(t =>
      (teacherCourseFilter === "" || t.course === teacherCourseFilter) &&
      (!q || t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
    );
  }, [teachers, teacherQuery, teacherCourseFilter]);

  const teachersPage = paginate(filteredTeachers, teacherPage, TEACHERS_PER_PAGE);

  /* ----------------------------
     Tests Tab states
     ---------------------------- */
  const [testQuery, setTestQuery] = useState("");
  const [testCourseFilter, setTestCourseFilter] = useState("");
  const [testSubjectFilter, setTestSubjectFilter] = useState("");
  const [testPage, setTestPage] = useState(1);
  const TESTS_PER_PAGE = 10;
  const [tests, setTests] = useState(testsInit);

  const filteredTests = useMemo(() => {
    const q = testQuery.trim().toLowerCase();
    return tests.filter(t =>
      (testCourseFilter === "" || t.course === testCourseFilter) &&
      (testSubjectFilter === "" || t.subject === testSubjectFilter) &&
      (!q || t.studentName.toLowerCase().includes(q) || String(t.id) === q || t.testName.toLowerCase().includes(q))
    );
  }, [tests, testQuery, testCourseFilter, testSubjectFilter]);

  const testsPage = paginate(filteredTests, testPage, TESTS_PER_PAGE);

  // toppers (top 10 by score within filteredTests)
  const toppers = useMemo(() => {
    return [...filteredTests].sort((a, b) => b.score - a.score).slice(0, 10);
  }, [filteredTests]);

  /* ----------------------------
     Analysis data: performance by course and by subject
     ---------------------------- */
  const performanceByCourse = useMemo(() => {
    return COURSES.map(course => {
      const arr = tests.filter(t => t.course === course);
      const avg = arr.length ? +(arr.reduce((s, x) => s + x.score, 0) / arr.length).toFixed(1) : 0;
      const high = arr.length ? Math.max(...arr.map(x => x.score)) : 0;
      const low = arr.length ? Math.min(...arr.map(x => x.score)) : 0;
      const top = arr.filter(x => x.score >= 85).length;
      return { course, avg, high, low, total: arr.length, top };
    });
  }, [tests]);

  const performanceBySubject = useMemo(() => {
    return SUBJECTS.map(subject => {
      const arr = tests.filter(t => t.subject === subject);
      const avg = arr.length ? +(arr.reduce((s, x) => s + x.score, 0) / arr.length).toFixed(1) : 0;
      const top = arr.filter(x => x.score >= 85).length;
      return { subject, avg, total: arr.length, top };
    });
  }, [tests]);

  /* ----------------------------
     Actions: students & teachers block/unblock, modify, delete
     ---------------------------- */
  function toggleStudentBlock(id) {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, blocked: !s.blocked } : s)));
  }
  function deleteStudent(id) {
    setStudents(prev => prev.filter(s => s.id !== id));
  }
  function modifyStudent(id) {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, name: s.name + " (edited)" } : s)));
  }

  function toggleTeacherBlock(id) {
    setTeachers(prev => prev.map(t => (t.id === id ? { ...t, blocked: !t.blocked } : t)));
  }
  function deleteTeacher(id) {
    setTeachers(prev => prev.filter(t => t.id !== id));
  }
  function modifyTeacher(id) {
    setTeachers(prev => prev.map(t => (t.id === id ? { ...t, name: t.name + " (edited)" } : t)));
  }

  function deleteTest(id) {
    setTests(prev => prev.filter(t => t.id !== id));
  }
  function modifyTest(id) {
    setTests(prev => prev.map(t => (t.id === id ? { ...t, testName: t.testName + " (edited)" } : t)));
  }

  /* ----------------------------
     Chart datasets
     ---------------------------- */
  const subsPie = {
    labels: ["Subscribed", "Unsubscribed"],
    datasets: [{ data: [subscriptionCounts.subscribed, subscriptionCounts.unsubscribed], backgroundColor: ["#2563eb", "#10b981"] }],
  };

  const admissionsPie = {
    labels: admissionsByCourse.map(d => d.name),
    datasets: [{ data: admissionsByCourse.map(d => d.value), backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"] }],
  };

  const revenuePie = {
    labels: revenueByCourse.map(d => d.name),
    datasets: [{ data: revenueByCourse.map(d => d.value), backgroundColor: ["#ef4444", "#3b82f6", "#f59e0b", "#10b981"] }],
  };

  /* ----------------------------
     UI Render
     ---------------------------- */
  return (
    <Box className="p-3 bg-gray-50 min-h-screen">
      {/* Top row: 5 cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3">
        {/* Foundation */}
        <Card sx={{ borderRadius: 2, boxShadow: 6, backgroundColor: '#dee1d44f', padding: '1px' }} className="bg-gradient-to-br from-rose-400 to-orange-400 text-white p-4">
          <CardContent>
            <Typography variant="h2 subtitle2" className="opacity-90 text-3xl font-bold text-gray-400">Foundation</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900 }} className="text-6xl text-blue-500">30</Typography>
            <div className="mt-2 mb-2 text-1xl font-bold">

              <div className="text-green-900 bg-green-200 px-1 py-1 mb-1" >Subscribed: 20  </div>
              <div className="text-red-500  bg-red-200 px-1 py-1">Unsubscribed: 10</div>
            </div>
          </CardContent>
        </Card>

        {/* NEET */}
        <Card sx={{ borderRadius: 2, boxShadow: 6, backgroundColor: '#dee1d44f', padding: '1px' }} className="bg-gradient-to-br from-rose-400 to-orange-400 text-white p-4">
          <CardContent>
            <Typography variant="h2 subtitle2" className="opacity-90 text-3xl font-bold  text-gray-400">JEE</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900 }} className="text-6xl text-blue-500">30</Typography>
            <div className="mt-2 mb-2 text-1xl font-bold">

              <div className="text-green-900 bg-green-200 px-1 py-1 mb-1" >Subscribed: 20  </div>
              <div className="text-red-500  bg-red-200 px-1 py-1">Unsubscribed: 10</div>
            </div>
          </CardContent>
        </Card>

        {/* JEE */}
        <Card sx={{ borderRadius: 2, boxShadow: 6, backgroundColor: '#dee1d44f', padding: '1px' }} className="bg-gradient-to-br from-rose-400 to-orange-400 text-white p-4">
          <CardContent>
            <Typography variant="h2 subtitle2" className="opacity-90 text-3xl font-bold  text-gray-400">NEET</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900 }} className="text-6xl text-blue-500">30</Typography>
            <div className="mt-2 mb-2 text-1xl font-bold">

              <div className="text-green-900 bg-green-200 px-1 py-1 mb-1" >Subscribed: 20  </div>
              <div className="text-red-500  bg-red-200 px-1 py-1">Unsubscribed: 10</div>
            </div>
          </CardContent>
        </Card>

        {/* CET */}
        <Card sx={{ borderRadius: 2, boxShadow: 6, backgroundColor: '#dee1d44f', padding: '1px' }} className="bg-gradient-to-br from-rose-400 to-orange-400 text-white p-4">
          <CardContent>
            <Typography variant="h2 subtitle2" className="opacity-90 text-3xl font-bold  text-gray-400">CET</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900 }} className="text-6xl text-blue-500">30</Typography>
            <div className="mt-2 mb-2 text-1xl font-bold">

              <div className="text-green-900 bg-green-200 px-1 py-1 mb-1" >Subscribed: 20  </div>
              <div className="text-red-500  bg-red-200 px-1 py-1">Unsubscribed: 10</div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue slip */}
        <Card sx={{ borderRadius: 2, boxShadow: 6, backgroundColor: '#032944f2', padding: '1px' }} className="bg-gradient-to-red from-blue-500 to-indigo-700 text-white p-4">
          <CardContent>
            <Typography variant="h2 subtitle2" className="opacity-90 text-3xl font-bold text-amber-50">Total Revenue</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900 }} className="text-amber-500">₹150.0K</Typography>
            <div className="mt-2 mb-2 text-1xl font-semibold text-white opacity-70">

              <div >Foundation: ₹50k  </div>
              <div>NEET: ₹50k</div>
              <div>JEE: ₹25k</div>
              <div>CET: ₹25k</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Subscriptions</Typography>
            <div style={{ height: 240 }}>
              <Pie data={subsPie} />
            </div>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Admissions by Course</Typography>
            <div style={{ height: 240 }}>
              <Pie data={admissionsPie} />
            </div>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Revenue by Course</Typography>
            <div style={{ height: 240 }}>
              <Pie data={revenuePie} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }} className="bg-gray-100 text-blue-500 font-bold">
        <Tab label="Students" />
        <Tab label="Teachers" />
        <Tab label="Tests" />
        <Tab label="Analysis" />
      </Tabs>

      {/* Tab panels */}
      <div >
        {/* ---------------- Students Tab ---------------- */}
        {tab === 0 && (
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <div className="font-bold flex flex-col md:flex-row justify-between gap-3 mb-4">
                <TextField
                  size="small"
                  placeholder="Search student or ID..."
                  value={studentQuery}
                  onChange={(e) => { setStudentQuery(e.target.value); setStudentPage(1); }}
                  InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
                  sx={{ width: { xs: "100%", md: 420 } }}
                />
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel>All Courses</InputLabel>
                  <Select
                    label="All Courses"
                    value={studentCourseFilter}
                    onChange={(e) => { setStudentCourseFilter(e.target.value); setStudentPage(1); }}
                  >
                    <MenuItem value="">All Courses</MenuItem>
                    {COURSES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
                <div className="text-sm text-gray-500 md:self-end">{`Showing ${studentsPage.total} results`}</div>
              </div>

              <div className="overflow-auto" style={{ maxHeight: 520}}>
                <Table stickyHeader >
                  <TableHead >
                    <TableRow  >
                      <TableCell>Sr</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Joined</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentsPage.data.map((s, idx) => (
                      <TableRow key={s.id} hover>
                        <TableCell>{(studentsPage.page - 1) * STUDENTS_PER_PAGE + idx + 1}</TableCell>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar src={s.avatar} alt={s.name} />
                            <div>
                              <div className="font-medium">{s.name}</div>
                              <div className="text-xs text-gray-500">{s.course}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{s.course}</TableCell>
                        <TableCell>{s.joined}</TableCell>
                        <TableCell>
                          <Chip label={s.status} color={s.status === "Subscribed" ? "success" : "default"} size="small" />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Button size="small" color={s.status === "Subscribed" ? "inherit" : "success"} variant={s.status === "Subscribed" ? "outlined" : "contained"} onClick={() => {
                              // toggle subscription for demo
                              setStudents(prev => prev.map(x => x.id === s.id ? { ...x, status: x.status === "Subscribed" ? "Unsubscribed" : "Subscribed" } : x));
                            }}>
                              {s.status === "Subscribed" ? "Unsub" : "Sub"}
                            </Button>
                            <IconButton size="small" color="primary" onClick={() => modifyStudent(s.id)}><EditIcon /></IconButton>
                            <IconButton size="small" color="warning" onClick={() => deleteStudent(s.id)}><DeleteIcon /></IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-center mt-3">
                <Pagination count={studentsPage.pages} page={studentsPage.page} onChange={(_, p) => setStudentPage(p)} color="primary" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* ---------------- Teachers Tab ---------------- */}
        {tab === 1 && (
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
                <TextField
                  size="small"
                  placeholder="Search teacher or ID..."
                  value={teacherQuery}
                  onChange={(e) => { setTeacherQuery(e.target.value); setTeacherPage(1); }}
                  InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
                  sx={{ width: { xs: "100%", md: 420 } }}
                />
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel>All Courses</InputLabel>
                  <Select
                    label="All Courses"
                    value={teacherCourseFilter}
                    onChange={(e) => { setTeacherCourseFilter(e.target.value); setTeacherPage(1); }}
                  >
                    <MenuItem value="">All Courses</MenuItem>
                    {COURSES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
                <div className="text-sm text-gray-500 md:self-end">{`Showing ${teachersPage.total} results`}</div>
              </div>

              <div className="overflow-auto bg-amber-100" style={{ maxHeight: 520 }}>
                <Table stickyHeader>
                  <TableHead >
                    
                    <TableRow >
                      <TableCell>Sr</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Joined</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
             
                  </TableHead>
                  <TableBody>
                    {teachersPage.data.map((t, idx) => (
                      <TableRow key={t.id} hover>
                        <TableCell>{(teachersPage.page - 1) * TEACHERS_PER_PAGE + idx + 1}</TableCell>
                        <TableCell>{t.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar src={t.avatar} alt={t.name} />
                            <div>
                              <div className="font-medium">{t.name}</div>
                              <div className="text-xs text-gray-500">{t.course}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{t.subject}</TableCell>
                        <TableCell>{t.course}</TableCell>
                        <TableCell>{t.joined}</TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <IconButton size="small" color="primary" onClick={() => modifyTeacher(t.id)}><EditIcon /></IconButton>
                            <IconButton size="small" color="warning" onClick={() => deleteTeacher(t.id)}><DeleteIcon /></IconButton>
                            <IconButton size="small" color={t.blocked ? "success" : "error"} onClick={() => toggleTeacherBlock(t.id)}>
                              {t.blocked ? <LockOpenIcon /> : <BlockIcon />}
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-center mt-3">
                <Pagination count={teachersPage.pages} page={teachersPage.page} onChange={(_, p) => setTeacherPage(p)} color="primary" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* ---------------- Tests Tab ---------------- */}
        {tab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card sx={{ gridColumn: "span 2", borderRadius: 2 }}>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
                  <TextField
                    size="small"
                    placeholder="Search student name or test..."
                    value={testQuery}
                    onChange={(e) => { setTestQuery(e.target.value); setTestPage(1); }}
                    InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
                    sx={{ width: { xs: "100%", md: 420 } }}
                  />
                  <div className="flex gap-2">
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                      <InputLabel>Course</InputLabel>
                      <Select label="Course" value={testCourseFilter} onChange={(e) => { setTestCourseFilter(e.target.value); setTestPage(1); }}>
                        <MenuItem value="">All</MenuItem>
                        {COURSES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                      <InputLabel>Subject</InputLabel>
                      <Select label="Subject" value={testSubjectFilter} onChange={(e) => { setTestSubjectFilter(e.target.value); setTestPage(1); }}>
                        <MenuItem value="">All</MenuItem>
                        {SUBJECTS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="overflow-auto" style={{ maxHeight: 520 }}>
                  <Table stickyHeader>
                    <TableHead style={{ maxHeight: 120 }}>
                      <TableRow>
                        <TableCell>Sr</TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Test</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Exam Date</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {testsPage.data.map((t, idx) => (
                        <TableRow key={t.id} hover>
                          <TableCell>{(testsPage.page - 1) * TESTS_PER_PAGE + idx + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar src={t.avatar} alt={t.studentName} />
                              <div>
                                <div className="font-medium">{t.studentName}</div>
                                <div className="text-xs text-gray-500">{t.studentId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{t.course}</TableCell>
                          <TableCell>{t.subject}</TableCell>
                          <TableCell>{t.testName}</TableCell>
                          <TableCell><strong className="text-indigo-700">{t.score}%</strong></TableCell>
                          <TableCell>{t.examDate}</TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <IconButton size="small" color="primary" onClick={() => modifyTest(t.id)}><EditIcon /></IconButton>
                              <IconButton size="small" color="warning" onClick={() => deleteTest(t.id)}><DeleteIcon /></IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-center mt-3">
                  <Pagination count={testsPage.pages} page={testsPage.page} onChange={(_, p) => setTestPage(p)} color="primary" />
                </div>
              </CardContent>
            </Card>

            {/* Topper sidebar */}
            <div className="space-y-3  ">
              <Card sx={{ borderRadius: 2, background:"lab(94 0 -0.01)" }} className="bg-blue-300">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Top 10 Performers</Typography>
                  <div className="space-y-2 max-h-[520px] overflow-y-auto">
                    {toppers.length === 0 && <Typography color="text.secondary">No toppers for current filter</Typography>}
                    {toppers.map((tp, i) => (
                      <div key={tp.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                        <Avatar src={tp.avatar} />
                        <div className="flex-1">
                          <div className="font-medium">{tp.studentName}</div>
                          <div className="text-xs text-gray-500">{tp.course} • {tp.subject}</div>
                        </div>
                        <div className="font-semibold text-indigo-700">{tp.score}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ---------------- Analysis Tab ---------------- */}
        {tab === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Performance by Course</Typography>
                <div className="overflow-auto">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Course</TableCell>
                        <TableCell>Avg Score</TableCell>
                        <TableCell>High</TableCell>
                        <TableCell>Low</TableCell>
                        <TableCell>Total Tests</TableCell>
                        <TableCell>Top ({'>='}85)</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {performanceByCourse.map(p => (
                        <TableRow key={p.course} hover>
                          <TableCell>{p.course}</TableCell>
                          <TableCell>{p.avg}</TableCell>
                          <TableCell>{p.high}</TableCell>
                          <TableCell>{p.low}</TableCell>
                          <TableCell>{p.total}</TableCell>
                          <TableCell>{p.top}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Performance Chart (Avg by Course)</Typography>
                <div style={{ height: 320 }}>
                  <Bar data={{
                    labels: performanceByCourse.map(p => p.course),
                    datasets: [{ label: "Avg Score", data: performanceByCourse.map(p => p.avg), backgroundColor: "#3b82f6" }]
                  }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Performance by Subject</Typography>
                <div className="overflow-auto">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Avg Score</TableCell>
                        <TableCell>Total Tests</TableCell>
                        <TableCell>Top ({'>='}85)</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {performanceBySubject.map(p => (
                        <TableRow key={p.subject} hover>
                          <TableCell>{p.subject}</TableCell>
                          <TableCell>{p.avg}</TableCell>
                          <TableCell>{p.total}</TableCell>
                          <TableCell>{p.top}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Subject Chart (Avg)</Typography>
                <div style={{ height: 320 }}>
                  <Bar data={{
                    labels: performanceBySubject.map(p => p.subject),
                    datasets: [{ label: "Avg Score", data: performanceBySubject.map(p => p.avg), backgroundColor: "#10b981" }]
                  }} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Box>
  );
}




