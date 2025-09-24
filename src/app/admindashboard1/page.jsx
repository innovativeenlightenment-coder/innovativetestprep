"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Pagination,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import {
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ============================
   Dummy Data (static)
   ============================ */

const statsCards = [
  { title: "Foundation", total: 30, subscribed: 28, unsubscribed: 2, gradient: "linear-gradient(135deg,#6b73ff,#000dff)" },
  { title: "NEET", total: 30, subscribed: 26, unsubscribed: 4, gradient: "linear-gradient(135deg,#00b09b,#96c93d)" },
  { title: "JEE", total: 30, subscribed: 25, unsubscribed: 5, gradient: "linear-gradient(135deg,#f7971e,#ffd200)" },
  { title: "CET", total: 30, subscribed: 24, unsubscribed: 6, gradient: "linear-gradient(135deg,#7b2ff7,#f107a3)" },
  {
    title: "Total Revenue",
    total: "₹150.0K",
    breakdown: [
      { name: "Foundation", value: 50000 },
      { name: "NEET", value: 50000 },
      { name: "JEE", value: 25000 },
      { name: "CET", value: 25000 },
    ],
    gradient: "linear-gradient(135deg,#ff6a6a,#ff9a9e)",
  },
];

const subscriptionData = [
  { name: "Subscribed", value: 103 },
  { name: "Unsubscribed", value: 17 },
];

const admissionData = [
  { name: "Foundation", value: 30 },
  { name: "NEET", value: 30 },
  { name: "JEE", value: 30 },
  { name: "CET", value: 30 },
];

const revenueData = [
  { name: "Foundation", value: 50000 },
  { name: "NEET", value: 50000 },
  { name: "JEE", value: 25000 },
  { name: "CET", value: 25000 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];

/* Students: 60 records for example (will paginate) */
const initialStudents = Array.from({ length: 60 }).map((_, i) => {
  const course = ["Foundation", "NEET", "JEE", "CET"][i % 4];
  return {
    id: i + 1,
    name: `Student ${i + 1}`,
    course,
    image: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
    status: i % 5 === 0 ? "Blocked" : "Active",
  };
});

/* Teachers: 20 records */
const initialTeachers = Array.from({ length: 20 }).map((_, i) => {
  const course = ["Foundation", "NEET", "JEE", "CET"][i % 4];
  return {
    id: i + 1,
    name: `Teacher ${i + 1}`,
    subject: ["Maths", "Physics", "Chemistry", "Biology"][i % 4],
    course,
    joined: `2024-0${(i % 9) + 1}-15`,
    image: `https://i.pravatar.cc/40?img=${(i % 70) + 11}`,
    status: i % 3 === 0 ? "Blocked" : "Active",
  };
});

/* Tests: 120 records (student test results) */
const initialTests = Array.from({ length: 120 }).map((_, i) => {
  const course = ["Foundation", "NEET", "JEE", "CET"][i % 4];
  const subject = ["Maths", "Physics", "Chemistry", "Biology"][i % 4];
  const score = Math.floor(40 + Math.random() * 60);
  return {
    id: i + 1,
    student: `Student ${((i % 60) + 1)}`,
    image: `https://i.pravatar.cc/40?img=${((i % 60) + 10)}`,
    course,
    subject,
    test: `Test ${Math.floor(i / 4) + 1}`,
    score,
    percentile: Math.max(1, Math.min(100, Math.round(score + (Math.random() * 10 - 5)))),
    date: `2025-${String(((i % 12) + 1)).padStart(2, "0")}-${String(((i % 28) + 1)).padStart(2, "0")}`,
  };
});

/* ============================
   Util: paginate
   ============================ */
function paginate(data, page, perPage) {
  const total = data.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const p = Math.max(1, Math.min(page, pages));
  const offset = (p - 1) * perPage;
  return {
    page: p,
    pages,
    data: data.slice(offset, offset + perPage),
    total,
  };
}

/* ============================
   Main Page Component
   ============================ */
export default function DashboardPage() {
  /* Tab */
  const [tab, setTab] = useState("students");

  /* Students state */
  const [students, setStudents] = useState(initialStudents);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentCourseFilter, setStudentCourseFilter] = useState("");
  const [studentPage, setStudentPage] = useState(1);
  const studentsPerPage = 25;

  /* Teachers state */
  const [teachers, setTeachers] = useState(initialTeachers);
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherCourseFilter, setTeacherCourseFilter] = useState("");
  const [teacherPage, setTeacherPage] = useState(1);
  const teachersPerPage = 10;

  /* Tests state */
  const [tests, setTests] = useState(initialTests);
  const [testSearch, setTestSearch] = useState("");
  const [testCourseFilter, setTestCourseFilter] = useState("");
  const [testSubjectFilter, setTestSubjectFilter] = useState("");
  const [testPage, setTestPage] = useState(1);
  const testsPerPage = 10;

  /* -- derived filtered lists (memoized) -- */
  const filteredStudents = useMemo(() => {
    const q = studentSearch.trim().toLowerCase();
    return students.filter(
      (s) =>
        (!studentCourseFilter || s.course === studentCourseFilter) &&
        (!q || s.name.toLowerCase().includes(q))
    );
  }, [students, studentSearch, studentCourseFilter]);

  const filteredTeachers = useMemo(() => {
    const q = teacherSearch.trim().toLowerCase();
    return teachers.filter(
      (t) =>
        (!teacherCourseFilter || t.course === teacherCourseFilter) &&
        (!q || t.name.toLowerCase().includes(q))
    );
  }, [teachers, teacherSearch, teacherCourseFilter]);

  const filteredTests = useMemo(() => {
    const q = testSearch.trim().toLowerCase();
    return tests.filter(
      (t) =>
        (!testCourseFilter || t.course === testCourseFilter) &&
        (!testSubjectFilter || t.subject === testSubjectFilter) &&
        (!q || t.student.toLowerCase().includes(q) || t.test.toLowerCase().includes(q))
    );
  }, [tests, testSearch, testCourseFilter, testSubjectFilter]);

  /* pagination slices */
  const studentsPage = paginate(filteredStudents, studentPage, studentsPerPage);
  const teachersPage = paginate(filteredTeachers, teacherPage, teachersPerPage);
  const testsPage = paginate(filteredTests, testPage, testsPerPage);

  /* Toppers (respecting test course/subject filters + search) */
  const toppers = useMemo(() => {
    // sort by score desc and take top 10 from filteredTests
    const arr = [...filteredTests].sort((a, b) => b.score - a.score);
    return arr.slice(0, 10);
  }, [filteredTests]);

  /* Performance analysis grouped by course */
  const performanceByCourse = useMemo(() => {
    const courses = ["Foundation", "NEET", "JEE", "CET"];
    return courses.map((course) => {
      const items = tests.filter((t) => t.course === course);
      const avg = items.length ? +(items.reduce((s, it) => s + it.score, 0) / items.length).toFixed(1) : 0;
      const high = items.length ? Math.max(...items.map((i) => i.score)) : 0;
      const low = items.length ? Math.min(...items.map((i) => i.score)) : 0;
      return { course, avg, high, low, total: items.length };
    });
  }, [tests]);

  /* ============================
     Actions: toggle block/unblock
     ============================ */
  function toggleStudentStatus(id) {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: s.status === "Active" ? "Blocked" : "Active" } : s)));
  }

  function toggleTeacherStatus(id) {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === "Active" ? "Blocked" : "Active" } : t)));
  }

  /* ============================
     Render
     ============================ */
  return (
    <Box sx={{ p: 4, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* TOP CARDS */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statsCards.map((c, idx) => (
          <Grid item xs={12} md={2.4} key={idx}>
            <Card sx={{ background: c.gradient, color: "#fff", borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ opacity: 0.95 }}>{c.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>{c.total}</Typography>
                {c.subscribed !== undefined && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">Subscribed: <strong>{c.subscribed}</strong></Typography>
                    <Typography variant="body2">Unsubscribed: <strong>{c.unsubscribed}</strong></Typography>
                  </Box>
                )}
                {c.breakdown && (
                  <Box sx={{ mt: 1, opacity: 0.95, fontSize: 13 }}>
                    {c.breakdown.map((b) => (
                      <Typography key={b.name}>{b.name}: ₹{b.value.toLocaleString()}</Typography>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CHART ROW */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Subscriptions</Typography>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie dataKey="value" data={subscriptionData} cx="50%" cy="50%" outerRadius={80} label>
                    {subscriptionData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Admissions by Course</Typography>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie dataKey="value" data={admissionData} cx="50%" cy="50%" outerRadius={80} label>
                    {admissionData.map((entry, i) => <Cell key={i} fill={COLORS[(i+1) % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Revenue by Course</Typography>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie dataKey="value" data={revenueData} cx="50%" cy="50%" outerRadius={80} label>
                    {revenueData.map((entry, i) => <Cell key={i} fill={COLORS[(i+2) % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TABS */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="main tabs">
            <Tab value="students" label="Students" />
            <Tab value="teachers" label="Teachers" />
            <Tab value="tests" label="Tests" />
          </Tabs>

          <Box sx={{ mt: 3 }}>
            {/* -------------------- STUDENTS -------------------- */}
            {tab === "students" && (
              <>
                {/* filters */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
                  <TextField
                    size="small"
                    placeholder="Search students by name..."
                    value={studentSearch}
                    onChange={(e) => { setStudentSearch(e.target.value); setStudentPage(1); }}
                    InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} /> }}
                    sx={{ width: { xs: "100%", sm: 400 } }}
                  />
                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Course</InputLabel>
                    <Select
                      label="Course"
                      value={studentCourseFilter}
                      onChange={(e) => { setStudentCourseFilter(e.target.value); setStudentPage(1); }}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Foundation">Foundation</MenuItem>
                      <MenuItem value="NEET">NEET</MenuItem>
                      <MenuItem value="JEE">JEE</MenuItem>
                      <MenuItem value="CET">CET</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                {/* table */}
                <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: 80 }}>Sr</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {studentsPage.data.map((s, i) => (
                        <TableRow key={s.id} hover>
                          <TableCell>{(studentsPage.page - 1) * studentsPerPage + i + 1}</TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <img src={s.image} alt={s.name} style={{ width: 34, height: 34, borderRadius: 999 }} />
                              <Typography variant="body2">{s.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{s.course}</TableCell>
                          <TableCell>
                            <Chip label={s.status} color={s.status === "Active" ? "success" : "error"} size="small" />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color={s.status === "Active" ? "error" : "success"}
                              onClick={() => toggleStudentStatus(s.id)}
                              size="small"
                            >
                              {s.status === "Active" ? <LockIcon /> : <LockOpenIcon />}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* pagination */}
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Pagination count={studentsPage.pages} page={studentsPage.page} onChange={(_, p) => setStudentPage(p)} />
                </Box>
              </>
            )}

            {/* -------------------- TEACHERS -------------------- */}
            {tab === "teachers" && (
              <>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
                  <TextField
                    size="small"
                    placeholder="Search teachers by name..."
                    value={teacherSearch}
                    onChange={(e) => { setTeacherSearch(e.target.value); setTeacherPage(1); }}
                    InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} /> }}
                    sx={{ width: { xs: "100%", sm: 400 } }}
                  />
                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Course</InputLabel>
                    <Select
                      label="Course"
                      value={teacherCourseFilter}
                      onChange={(e) => { setTeacherCourseFilter(e.target.value); setTeacherPage(1); }}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Foundation">Foundation</MenuItem>
                      <MenuItem value="NEET">NEET</MenuItem>
                      <MenuItem value="JEE">JEE</MenuItem>
                      <MenuItem value="CET">CET</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Joined</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teachersPage.data.map((t, i) => (
                        <TableRow key={t.id} hover>
                          <TableCell>{(teachersPage.page - 1) * teachersPerPage + i + 1}</TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <img src={t.image} alt={t.name} style={{ width: 34, height: 34, borderRadius: 999 }} />
                              <Typography variant="body2">{t.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{t.subject}</TableCell>
                          <TableCell>{t.course}</TableCell>
                          <TableCell>{t.joined}</TableCell>
                          <TableCell>
                            <Chip label={t.status} color={t.status === "Active" ? "success" : "error"} size="small" />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton color={t.status === "Active" ? "error" : "success"} onClick={() => toggleTeacherStatus(t.id)} size="small">
                              {t.status === "Active" ? <LockIcon /> : <LockOpenIcon />}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Pagination count={teachersPage.pages} page={teachersPage.page} onChange={(_, p) => setTeacherPage(p)} />
                </Box>
              </>
            )}

            {/* -------------------- TESTS -------------------- */}
            {tab === "tests" && (
              <Grid container spacing={2}>
                {/* Left: table */}
                <Grid item xs={12} md={8}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Search by student or test..."
                      value={testSearch}
                      onChange={(e) => { setTestSearch(e.target.value); setTestPage(1); }}
                      InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} /> }}
                      sx={{ width: { xs: "100%", sm: 420 } }}
                    />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Course</InputLabel>
                      <Select label="Course" value={testCourseFilter} onChange={(e) => { setTestCourseFilter(e.target.value); setTestPage(1); }}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Foundation">Foundation</MenuItem>
                        <MenuItem value="NEET">NEET</MenuItem>
                        <MenuItem value="JEE">JEE</MenuItem>
                        <MenuItem value="CET">CET</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Subject</InputLabel>
                      <Select label="Subject" value={testSubjectFilter} onChange={(e) => { setTestSubjectFilter(e.target.value); setTestPage(1); }}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Maths">Maths</MenuItem>
                        <MenuItem value="Physics">Physics</MenuItem>
                        <MenuItem value="Chemistry">Chemistry</MenuItem>
                        <MenuItem value="Biology">Biology</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr</TableCell>
                          <TableCell>Student</TableCell>
                          <TableCell>Course</TableCell>
                          <TableCell>Subject</TableCell>
                          <TableCell>Test</TableCell>
                          <TableCell>Score</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {testsPage.data.map((t, i) => (
                          <TableRow key={t.id} hover>
                            <TableCell>{(testsPage.page - 1) * testsPerPage + i + 1}</TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <img src={t.image} alt={t.student} style={{ width: 34, height: 34, borderRadius: 999 }} />
                                <Typography variant="body2">{t.student}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell>{t.course}</TableCell>
                            <TableCell>{t.subject}</TableCell>
                            <TableCell>{t.test}</TableCell>
                            <TableCell><strong style={{ color: "#1f2937" }}>{t.score}%</strong></TableCell>
                            <TableCell>{t.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                    <Pagination count={testsPage.pages} page={testsPage.page} onChange={(_, p) => setTestPage(p)} />
                  </Box>
                </Grid>

                {/* Right: toppers */}
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6">Top Performers</Typography>
                        <Chip label={`${toppers.length}`} size="small" />
                      </Stack>

                      <Divider sx={{ mb: 1 }} />

                      <Box sx={{ maxHeight: 480, overflowY: "auto" }}>
                        {toppers.length === 0 && <Typography color="text.secondary">No toppers for this filter</Typography>}
                        {toppers.map((tp, i) => (
                          <Box key={tp.id} sx={{ display: "flex", gap: 2, alignItems: "center", p: 1, borderRadius: 1, mb: 1, bgcolor: "#fbfbfb" }}>
                            <img src={tp.image} alt={tp.student} style={{ width: 44, height: 44, borderRadius: 999 }} />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>{tp.student}</Typography>
                              <Typography variant="caption" color="text.secondary">{tp.course} • {tp.subject}</Typography>
                              <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>Test: {tp.test}</Typography>
                            </Box>
                            <Chip label={`${tp.score}%`} color="primary" />
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Performance analysis below */}
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>Performance Analysis — Table</Typography>
                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Course</TableCell>
                                  <TableCell>Avg</TableCell>
                                  <TableCell>High</TableCell>
                                  <TableCell>Low</TableCell>
                                  <TableCell>Total</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {performanceByCourse.map((p) => (
                                  <TableRow key={p.course}>
                                    <TableCell>{p.course}</TableCell>
                                    <TableCell>{p.avg}</TableCell>
                                    <TableCell>{p.high}</TableCell>
                                    <TableCell>{p.low}</TableCell>
                                    <TableCell>{p.total}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>Performance Analysis — Chart</Typography>
                          <ResponsiveContainer width="100%" height={240}>
                            <BarChart data={performanceByCourse}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="course" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="avg" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
