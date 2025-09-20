// "use client";

// const { ChartBarDecreasing } = require("lucide-react")

// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { Users, UserCheck, UserX } from "lucide-react";
// import Image from "next/image";

// // Colors for charts
// const COLORS = ["#22c55e", "#f87171", "#3b82f6", "#f59e0b"];

// export default function Dashboard() {
//   const subscriptionData = [
//     { name: "Subscribed", value: 120 },
//     { name: "Unsubscribed", value: 40 },
//   ];

//   const admissionData = [
//     { name: "Foundation", value: 60 },
//     { name: "NEET", value: 40 },
//     { name: "JEE", value: 30 },
//     { name: "CET", value: 20 },
//   ];

//   const revenueData = [
//     { name: "Foundation", value: 60000 },
//     { name: "NEET", value: 40000 },
//     { name: "JEE", value: 30000 },
//     { name: "CET", value: 20000 },
//   ];

//   const students = [
//     { id: 1, name: "Rahul Sharma", course: "Foundation", status: "Active", img: "/student1.jpg" },
//     { id: 2, name: "Sneha Patil", course: "NEET", status: "Blocked", img: "/student2.jpg" },
//     { id: 3, name: "Amit Kumar", course: "CET", status: "Active", img: "/student3.jpg" },
//   ];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Top Row: Course Cards with Subscribed + Unsubscribed */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         {[
//           { title: "Foundation", total: 60, subscribed: 45, unsubscribed: 15 },
//           { title: "NEET", total: 40, subscribed: 30, unsubscribed: 10 },
//           { title: "JEE", total: 30, subscribed: 20, unsubscribed: 10 },
//           { title: "CET", total: 20, subscribed: 15, unsubscribed: 5 },
//         ].map((course, i) => (
//           <div key={i} className="bg-white shadow rounded-xl p-4">
//             <h2 className="text-lg font-bold">{course.title}</h2>
//             <p className="text-2xl font-bold mb-3">{course.total}</p>

//             <div className="flex items-center justify-between p-2 rounded bg-green-100 mb-2">
//               <div className="flex items-center gap-2">
//                 <UserCheck className="w-5 h-5 text-green-600" />
//                 <span className="text-sm font-medium">Subscribed</span>
//               </div>
//               <span className="font-bold text-green-700">{course.subscribed}</span>
//             </div>

//             <div className="flex items-center justify-between p-2 rounded bg-red-100">
//               <div className="flex items-center gap-2">
//                 <UserX className="w-5 h-5 text-red-600" />
//                 <span className="text-sm font-medium">Unsubscribed</span>
//               </div>
//               <span className="font-bold text-red-700">{course.unsubscribed}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-white shadow rounded-xl p-4">
//           <h3 className="font-semibold mb-2">Subscriptions</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={subscriptionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
//                 {subscriptionData.map((entry, i) => (
//                   <Cell key={i} fill={COLORS[i]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white shadow rounded-xl p-4">
//           <h3 className="font-semibold mb-2">Admissions by Course</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={admissionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
//                 {admissionData.map((entry, i) => (
//                   <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white shadow rounded-xl p-4">
//           <h3 className="font-semibold mb-2">Revenue by Course</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={revenueData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
//                 {revenueData.map((entry, i) => (
//                   <Cell key={i} fill={COLORS[(i + 1) % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Student List Table */}
//       <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Students List</h2>
//           <div className="flex gap-2">
//             <input type="text" placeholder="Search student..." className="border rounded px-3 py-1" />
//             <select className="border rounded px-3 py-1">
//               <option value="">Filter by Course</option>
//               <option value="Foundation">Foundation</option>
//               <option value="NEET">NEET</option>
//               <option value="JEE">JEE</option>
//               <option value="CET">CET</option>
//             </select>
//           </div>
//         </div>

//         <table className="w-full border rounded-md overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 text-left">ID</th>
//               <th className="p-2 text-left w-1/3">Name</th>
//               <th className="p-2 text-left">Course</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.id} className="border-t hover:bg-gray-50">
//                 <td className="p-2">{student.id}</td>
//                 <td className="p-2 flex items-center gap-3">
//                   <Image
//                     src={student.img}
//                     alt={student.name}
//                     width={36}
//                     height={36}
//                     className="rounded-full border"
//                   />
//                   {student.name}
//                 </td>
//                 <td className="p-2">{student.course}</td>
//                 <td className="p-2">
//                   <span
//                     className={`px-2 py-1 text-xs rounded ${
//                       student.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {student.status}
//                   </span>
//                 </td>
//                 <td className="p-2 space-x-2">
//                   <button className="px-3 py-1 text-xs bg-gray-200 rounded">Block</button>
//                   <button className="px-3 py-1 text-xs bg-gray-200 rounded">Unblock</button>
//                   <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded">Modify</button>
//                   <button className="px-3 py-1 text-xs bg-red-500 text-white rounded">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

//good design working
// "use client";

// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import {
//   Users,
//   GraduationCap,
//   BookOpen,
//   Briefcase,
//   Wallet,
//   UserCheck,
//   UserX,
//   Search,
//   Filter,
//   Ban,
//   Unlock,
//   Edit,
//   Trash,
//   ChalkboardTeacher,
// } from "lucide-react";
// import Image from "next/image";

// const COLORS = ["#22c55e", "#f87171", "#3b82f6", "#f59e0b", "#a855f7"];

// export default function Dashboard() {
//   const subscriptionData = [
//     { name: "Subscribed", value: 120 },
//     { name: "Unsubscribed", value: 40 },
//   ];

//   const admissionData = [
//     { name: "Foundation", value: 60 },
//     { name: "NEET", value: 40 },
//     { name: "JEE", value: 30 },
//     { name: "CET", value: 20 },
//   ];

//   const revenueData = [
//     { name: "Foundation", value: 60000 },
//     { name: "NEET", value: 40000 },
//     { name: "JEE", value: 30000 },
//     { name: "CET", value: 20000 },
//   ];

//   const students = [
//     { id: 1, name: "Rahul Sharma", course: "Foundation", status: "Active", img: "/student1.jpg" },
//     { id: 2, name: "Sneha Patil", course: "NEET", status: "Blocked", img: "/student2.jpg" },
//     { id: 3, name: "Amit Kumar", course: "CET", status: "Active", img: "/student3.jpg" },
//   ];

//   const teachers = [
//     { id: 1, name: "Anjali Deshmukh", subject: "Physics", course: "NEET", status: "Active", img: "/teacher1.jpg" },
//     { id: 2, name: "Ramesh Iyer", subject: "Mathematics", course: "JEE", status: "Active", img: "/teacher2.jpg" },
//     { id: 3, name: "Priya Nair", subject: "Chemistry", course: "Foundation", status: "Inactive", img: "/teacher3.jpg" },
//   ];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Top Row Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
//         {[
//           {
//             title: "Foundation",
//             total: 60,
//             subscribed: 45,
//             unsubscribed: 15,
//             icon: <GraduationCap className="w-8 h-8 text-white" />,
//             gradient: "from-indigo-500 to-purple-500",
//           },
//           {
//             title: "NEET",
//             total: 40,
//             subscribed: 30,
//             unsubscribed: 10,
//             icon: <BookOpen className="w-8 h-8 text-white" />,
//             gradient: "from-pink-500 to-rose-500",
//           },
//           {
//             title: "JEE",
//             total: 30,
//             subscribed: 20,
//             unsubscribed: 10,
//             icon: <Briefcase className="w-8 h-8 text-white" />,
//             gradient: "from-emerald-500 to-green-600",
//           },
//           {
//             title: "CET",
//             total: 20,
//             subscribed: 15,
//             unsubscribed: 5,
//             icon: <Users className="w-8 h-8 text-white" />,
//             gradient: "from-blue-500 to-cyan-500",
//           },
//           {
//             title: "Revenue",
//             total: "₹1.5L",
//             subscribed: null,
//             unsubscribed: null,
//             icon: <Wallet className="w-8 h-8 text-white" />,
//             gradient: "from-yellow-400 to-orange-500",
//           },
//         ].map((course, i) => (
//           <div
//             key={i}
//             className={`bg-gradient-to-r ${course.gradient} text-white shadow-xl rounded-xl p-5 relative`}
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-bold tracking-wide">{course.title}</h2>
//               <div className="bg-white/20 p-2 rounded-full">{course.icon}</div>
//             </div>
//             <p className="text-4xl font-extrabold mb-3 drop-shadow">{course.total}</p>

//             {course.subscribed !== null && (
//               <div className="flex justify-between items-center bg-white/20 rounded px-2 py-1 mb-1">
//                 <div className="flex items-center gap-1">
//                   <UserCheck className="w-4 h-4" />
//                   <span className="text-sm">Subscribed</span>
//                 </div>
//                 <span className="font-bold">{course.subscribed}</span>
//               </div>
//             )}

//             {course.unsubscribed !== null && (
//               <div className="flex justify-between items-center bg-white/20 rounded px-2 py-1">
//                 <div className="flex items-center gap-1">
//                   <UserX className="w-4 h-4" />
//                   <span className="text-sm">Unsubscribed</span>
//                 </div>
//                 <span className="font-bold">{course.unsubscribed}</span>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-white shadow rounded-xl p-4">
//           <h3 className="font-semibold mb-2">Subscriptions</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={subscriptionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
//                 {subscriptionData.map((entry, i) => (
//                   <Cell key={i} fill={COLORS[i]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white shadow rounded-xl p-4">
//           <h3 className="font-semibold mb-2">Admissions by Course</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={admissionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
//                 {admissionData.map((entry, i) => (
//                   <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white shadow rounded-xl p-4">
//           <h3 className="font-semibold mb-2">Revenue by Course</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={revenueData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
//                 {revenueData.map((entry, i) => (
//                   <Cell key={i} fill={COLORS[(i + 1) % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Student List Table */}
//       <div className="bg-white shadow rounded-xl p-6 overflow-x-auto mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Students List</h2>
//           <div className="flex gap-2">
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search student..."
//                 className="pl-8 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
//               <select className="pl-7 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-400">
//                 <option value="">Filter by Course</option>
//                 <option value="Foundation">Foundation</option>
//                 <option value="NEET">NEET</option>
//                 <option value="JEE">JEE</option>
//                 <option value="CET">CET</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <table className="w-full border rounded-md overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 text-left">ID</th>
//               <th className="p-2 text-left w-1/3">Name</th>
//               <th className="p-2 text-left">Course</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.id} className="border-t hover:bg-gray-50">
//                 <td className="p-2">{student.id}</td>
//                 <td className="p-2 flex items-center gap-3">
//                   <Image
//                     src={student.img}
//                     alt={student.name}
//                     width={36}
//                     height={36}
//                     className="rounded-full border"
//                   />
//                   {student.name}
//                 </td>
//                 <td className="p-2">{student.course}</td>
//                 <td className="p-2">
//                   <span
//                     className={`px-2 py-1 text-xs rounded ${
//                       student.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {student.status}
//                   </span>
//                 </td>
//                 <td className="p-2 space-x-2">
//                   <button className="px-3 py-1 text-xs flex items-center gap-1 bg-yellow-100 text-yellow-700 rounded">
//                     <Ban className="w-3 h-3" /> Block
//                   </button>
//                   <button className="px-3 py-1 text-xs flex items-center gap-1 bg-green-100 text-green-700 rounded">
//                     <Unlock className="w-3 h-3" /> Unblock
//                   </button>
//                   <button className="px-3 py-1 text-xs flex items-center gap-1 bg-blue-100 text-blue-700 rounded">
//                     <Edit className="w-3 h-3" /> Modify
//                   </button>
//                   <button className="px-3 py-1 text-xs flex items-center gap-1 bg-red-100 text-red-700 rounded">
//                     <Trash className="w-3 h-3" /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Teacher List Table */}
//       <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Teachers List</h2>
//           <div className="flex gap-2">
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search teacher..."
//                 className="pl-8 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
//               <select className="pl-7 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400">
//                 <option value="">Filter by Course</option>
//                 <option value="Foundation">Foundation</option>
//                 <option value="NEET">NEET</option>
//                 <option value="JEE">JEE</option>
//                 <option value="CET">CET</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <table className="w-full border rounded-md overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 text-left">ID</th>
//               <th className="p-2 text-left w-1/3">Name</th>
//               <th className="p-2 text-left">Subject</th>
//               <th className="p-2 text-left">Course Assigned</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teachers.map((teacher) => (
//               <tr key={teacher.id} className="border-t hover:bg-gray-50">
//                 <td className="p-2">{teacher.id}</td>
//                 <td className="p-2 flex items-center gap-3">
//                   <Image
//                     src={teacher.img}
//                     alt={teacher.name}
//                     width={36}
//                     height={36}
//                     className="rounded-full border"
//                   />
//                   {teacher.name}
//                 </td>
//                 <td className="p-2">{teacher.subject}</td>
//                 <td className="p-2">{teacher.course}</td>
//                 <td className="p-2">
//                   <span
//                     className={`px-2 py-1 text-xs rounded ${
//                       teacher.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {teacher.status}
//                   </span>
//                 </td>
//                 <td className="p-2 space-x-2">
//                   <button className="px-3 py-1 text-xs flex items-center gap-1 bg-blue-100 text-blue-700 rounded">
//                     <Edit className="w-3 h-3" /> Modify
//                   </button>
//                   <button className="px-3 py-1 text-xs flex items-center gap-1 bg-red-100 text-red-700 rounded">
//                     <Trash className="w-3 h-3" /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// 2nd working design
// "use client";

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   User,
//   BookOpen,
//   GraduationCap,
//   Users,
//   DollarSign,
//   Eye,
//   Edit,
//   Trash,
//   Ban,
//   CheckCircle,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select } from "@/components/ui/select";

// // Dummy Revenue Data
// const revenueData = [
//   { name: "Foundation", value: 50000 },
//   { name: "NEET", value: 50000 },
//   { name: "JEE", value: 25000 },
//   { name: "CET", value: 25000 },
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// // Dummy Student Data
// const students = [
//   { id: "S001", name: "Aarav Sharma", course: "Foundation", status: "Subscribed", img: "https://i.pravatar.cc/40?img=1" },
//   { id: "S002", name: "Priya Verma", course: "NEET", status: "Unsubscribed", img: "https://i.pravatar.cc/40?img=2" },
//   { id: "S003", name: "Rahul Kumar", course: "JEE", status: "Subscribed", img: "https://i.pravatar.cc/40?img=3" },
//   { id: "S004", name: "Simran Kaur", course: "CET", status: "Subscribed", img: "https://i.pravatar.cc/40?img=4" },
// ];

// // Dummy Teacher Data
// const teachers = [
//   { id: "T001", name: "Anita Sharma", course: "Foundation", subject: "Mathematics", img: "https://i.pravatar.cc/40?img=5" },
//   { id: "T002", name: "Rohit Mehta", course: "NEET", subject: "Biology", img: "https://i.pravatar.cc/40?img=6" },
//   { id: "T003", name: "Sneha Gupta", course: "JEE", subject: "Physics", img: "https://i.pravatar.cc/40?img=7" },
//   { id: "T004", name: "Vikram Singh", course: "CET", subject: "Chemistry", img: "https://i.pravatar.cc/40?img=8" },
// ];

// export default function DashboardPage() {
//   // Search and Filter States
//   const [studentSearch, setStudentSearch] = useState("");
//   const [studentFilter, setStudentFilter] = useState("");

//   const [teacherSearch, setTeacherSearch] = useState("");
//   const [teacherFilter, setTeacherFilter] = useState("");

//   // Filtered Students
//   const filteredStudents = students.filter(
//     (s) =>
//       (studentFilter === "" || s.course === studentFilter) &&
//       s.name.toLowerCase().includes(studentSearch.toLowerCase())
//   );

//   // Filtered Teachers
//   const filteredTeachers = teachers.filter(
//     (t) =>
//       (teacherFilter === "" || t.course === teacherFilter) &&
//       t.name.toLowerCase().includes(teacherSearch.toLowerCase())
//   );

//   // Count Subscribed / Unsubscribed
//   const getStats = (course) => {
//     const courseStudents = students.filter((s) => s.course === course);
//     return {
//       total: courseStudents.length,
//       subscribed: courseStudents.filter((s) => s.status === "Subscribed").length,
//       unsubscribed: courseStudents.filter((s) => s.status === "Unsubscribed").length,
//     };
//   };

//   return (
//     <div className="p-6 space-y-8">
//       {/* Top Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//         {["Foundation", "NEET", "JEE", "CET"].map((course, idx) => {
//           const stats = getStats(course);
//           const icons = [<GraduationCap />, <BookOpen />, <Users />, <User />];
//           const colors = ["blue", "green", "yellow", "purple"];
//           return (
//             <Card
//               key={course}
//               className={`bg-${colors[idx]}-100 border-l-4 border-${colors[idx]}-500 shadow-md`}
//             >
//               <CardHeader className="flex items-center gap-2">
//                 <span className={`text-${colors[idx]}-600`}>{icons[idx]}</span>
//                 <CardTitle>{course}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-lg font-bold">Total: {stats.total}</p>
//                 <p className="text-sm text-green-700 flex items-center gap-1">
//                   ✔ Subscribed: {stats.subscribed}
//                 </p>
//                 <p className="text-sm text-red-600 flex items-center gap-1">
//                   ✖ Unsubscribed: {stats.unsubscribed}
//                 </p>
//               </CardContent>
//             </Card>
//           );
//         })}

//         <Card className="bg-pink-100 border-l-4 border-pink-500 shadow-md">
//           <CardHeader className="flex items-center gap-2">
//             <DollarSign className="text-pink-600" />
//             <CardTitle>Revenue</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-xl font-bold">₹1.5 L</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="shadow-md">
//           <CardHeader>
//             <CardTitle>Revenue by Course</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={revenueData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label
//                 >
//                   {revenueData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="shadow-md">
//           <CardHeader>
//             <CardTitle>Admissions Breakdown</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={[
//                     { name: "Foundation", value: getStats("Foundation").total },
//                     { name: "NEET", value: getStats("NEET").total },
//                     { name: "JEE", value: getStats("JEE").total },
//                     { name: "CET", value: getStats("CET").total },
//                   ]}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={100}
//                   dataKey="value"
//                   label
//                 >
//                   <Cell fill="#0088FE" />
//                   <Cell fill="#00C49F" />
//                   <Cell fill="#FFBB28" />
//                   <Cell fill="#FF8042" />
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Students Table */}
//       <Card className="shadow-md">
//         <CardHeader className="flex justify-between items-center">
//           <CardTitle>Students</CardTitle>
//           <div className="flex gap-2">
//             <Input
//               placeholder="Search students..."
//               className="w-48"
//               value={studentSearch}
//               onChange={(e) => setStudentSearch(e.target.value)}
//             />
//             <Select onValueChange={setStudentFilter} defaultValue="">
//               <option value="">All Courses</option>
//               <option value="Foundation">Foundation</option>
//               <option value="NEET">NEET</option>
//               <option value="JEE">JEE</option>
//               <option value="CET">CET</option>
//             </Select>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <table className="w-full border-collapse border">
//             <thead className="bg-gray-100 border">
//               <tr>
//                 <th className="p-2 border">Sr No</th>
//                 <th className="p-2 border">ID</th>
//                 <th className="p-2 border">Image</th>
//                 <th className="p-2 border w-64">Name</th>
//                 <th className="p-2 border">Course</th>
//                 <th className="p-2 border">Status</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStudents.map((s, index) => (
//                 <tr key={s.id} className="border">
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">{s.id}</td>
//                   <td className="p-2 border">
//                     <img src={s.img} alt={s.name} className="rounded-full w-10 h-10" />
//                   </td>
//                   <td className="p-2 border">{s.name}</td>
//                   <td className="p-2 border">{s.course}</td>
//                   <td className="p-2 border">{s.status}</td>
//                   <td className="p-2 border flex gap-2">
//                     <Button size="sm" variant="outline"><Eye /></Button>
//                     <Button size="sm" variant="outline"><Edit /></Button>
//                     <Button size="sm" variant="outline"><Trash /></Button>
//                     {s.status === "Subscribed" ? (
//                       <Button size="sm" variant="destructive"><Ban /> Block</Button>
//                     ) : (
//                       <Button size="sm" className="bg-green-500 text-white"><CheckCircle /> Unblock</Button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>

//       {/* Teachers Table */}
//       <Card className="shadow-md">
//         <CardHeader className="flex justify-between items-center">
//           <CardTitle>Teachers</CardTitle>
//           <div className="flex gap-2">
//             <Input
//               placeholder="Search teachers..."
//               className="w-48"
//               value={teacherSearch}
//               onChange={(e) => setTeacherSearch(e.target.value)}
//             />
//             <Select onValueChange={setTeacherFilter} defaultValue="">
//               <option value="">All Courses</option>
//               <option value="Foundation">Foundation</option>
//               <option value="NEET">NEET</option>
//               <option value="JEE">JEE</option>
//               <option value="CET">CET</option>
//             </Select>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <table className="w-full border-collapse border">
//             <thead className="bg-gray-100 border">
//               <tr>
//                 <th className="p-2 border">Sr No</th>
//                 <th className="p-2 border">ID</th>
//                 <th className="p-2 border">Image</th>
//                 <th className="p-2 border w-64">Name</th>
//                 <th className="p-2 border">Course</th>
//                 <th className="p-2 border">Subject</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTeachers.map((t, index) => (
//                 <tr key={t.id} className="border">
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">{t.id}</td>
//                   <td className="p-2 border">
//                     <img src={t.img} alt={t.name} className="rounded-full w-10 h-10" />
//                   </td>
//                   <td className="p-2 border">{t.name}</td>
//                   <td className="p-2 border">{t.course}</td>
//                   <td className="p-2 border">{t.subject}</td>
//                   <td className="p-2 border flex gap-2">
//                     <Button size="sm" variant="outline"><Eye /></Button>
//                     <Button size="sm" variant="outline"><Edit /></Button>
//                     <Button size="sm" variant="outline"><Trash /></Button>
//                     <Button size="sm" variant="destructive"><Ban /> Block</Button>
//                     <Button size="sm" className="bg-green-500 text-white"><CheckCircle /> Unblock</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


"use client";

import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  BlockOutlined as BlockIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";

/* --------------------------
   Constants & helper utils
   -------------------------- */
const COURSES = ["Foundation", "NEET", "JEE", "CET"];
const SUBJECTS = ["Maths", "Physics", "Chemistry", "Biology", "English", "Science"];
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a855f7"];

function pad(num, width = 3) {
  return String(num).padStart(width, "0");
}

function computePerfCategory(percentile) {
  if (percentile >= 85) return "Top";
  if (percentile >= 50) return "Mid";
  return "Low";
}

/* --------------------------
   Dummy data generators
   -------------------------- */
const STUDENT_COUNT = 120;
const TEACHER_COUNT = 40;
const TEST_COUNT = 120;

const studentsSeed = Array.from({ length: STUDENT_COUNT }, (_, i) => {
  const course = COURSES[i % COURSES.length];
  const status = Math.random() > 0.15 ? "Subscribed" : "Unsubscribed";
  return {
    id: `S${pad(i + 1, 4)}`,
    name: `Student ${i + 1}`,
    course,
    status,
    joined: `2025-0${(i % 9) + 1}-${(i % 27) + 1}`,
    img: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`, // dummy avatar
  };
});

const teachersSeed = Array.from({ length: TEACHER_COUNT }, (_, i) => {
  const course = COURSES[i % COURSES.length];
  return {
    id: `T${pad(i + 1, 4)}`,
    name: `Teacher ${i + 1}`,
    course,
    subject: SUBJECTS[i % SUBJECTS.length],
    status: Math.random() > 0.3 ? "Active" : "Blocked",
    img: `https://i.pravatar.cc/150?img=${(i % 70) + 71}`,
  };
});

// Tests - each test record assigns a student and percentile
const testsSeed = Array.from({ length: TEST_COUNT }, (_, i) => {
  const course = COURSES[i % COURSES.length];
  const subject = SUBJECTS[i % SUBJECTS.length];
  const studentIndex = i % STUDENT_COUNT;
  const percentile = Math.floor(Math.random() * 100); // 0-99
  return {
    id: `T${pad(i + 1, 4)}`,
    name: `Mock Test ${i + 1}`,
    course,
    subject,
    date: `2025-09-${(i % 28) + 1}`,
    studentId: studentsSeed[studentIndex].id,
    studentName: studentsSeed[studentIndex].name,
    percentile,
  };
});

/* --------------------------
   Main Page Component
   -------------------------- */
export default function DashboardPage() {
  // data states (we mutate statuses locally)
  const [students, setStudents] = useState(studentsSeed);
  const [teachers, setTeachers] = useState(teachersSeed);
  const [tests] = useState(testsSeed);

  // Tabs
  const [activeTab, setActiveTab] = useState("students");

  // Students tab controls
  const [studentSearch, setStudentSearch] = useState("");
  const [studentCourse, setStudentCourse] = useState("All");
  const [studentPage, setStudentPage] = useState(1);
  const STUDENTS_PER_PAGE = 25;

  // Teachers tab controls
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherCourse, setTeacherCourse] = useState("All");
  const [teacherPage, setTeacherPage] = useState(1);
  const TEACHERS_PER_PAGE = 25;

  // Tests tab controls
  const [testSearch, setTestSearch] = useState("");
  const [testCourse, setTestCourse] = useState("All");
  const [testSubject, setTestSubject] = useState("All");
  const [testPage, setTestPage] = useState(1);
  const TESTS_PER_PAGE = 25;

  /* --------------------------
     Derived metrics for top cards
     -------------------------- */
  const stats = useMemo(() => {
    const byCourse = {};
    COURSES.forEach((c) => {
      const s = students.filter((st) => st.course === c);
      byCourse[c] = {
        total: s.length,
        subscribed: s.filter((x) => x.status === "Subscribed").length,
        unsubscribed: s.filter((x) => x.status === "Unsubscribed").length,
      };
    });
    const revenueTotal = 150000; // as requested ₹1.5L
    return { byCourse, revenueTotal };
  }, [students]);

  /* --------------------------
     Charts data
     -------------------------- */
  const admissionsPie = useMemo(() => {
    return COURSES.map((c) => ({ name: c, value: stats.byCourse[c].total }));
  }, [stats]);

  const revenuePie = [
    { name: "Foundation", value: 50000 },
    { name: "NEET", value: 50000 },
    { name: "JEE", value: 25000 },
    { name: "CET", value: 25000 },
  ];

  const subscriptionPie = [
    { name: "Subscribed", value: students.filter((s) => s.status === "Subscribed").length },
    { name: "Unsubscribed", value: students.filter((s) => s.status === "Unsubscribed").length },
  ];

  /* --------------------------
     Students filtering & pagination
     -------------------------- */
  const filteredStudents = students.filter((s) => {
    const matchesCourse = studentCourse === "All" || s.course === studentCourse;
    const matchesSearch =
      studentSearch.trim() === "" ||
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(studentSearch.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const studentPages = Math.max(1, Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE));
  const studentPageClamped = Math.min(studentPage, studentPages);
  const studentsPageSlice = filteredStudents.slice(
    (studentPageClamped - 1) * STUDENTS_PER_PAGE,
    studentPageClamped * STUDENTS_PER_PAGE
  );

  /* --------------------------
     Teachers filtering & pagination
     -------------------------- */
  const filteredTeachers = teachers.filter((t) => {
    const matchesCourse = teacherCourse === "All" || t.course === teacherCourse;
    const matchesSearch =
      teacherSearch.trim() === "" ||
      t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(teacherSearch.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const teacherPages = Math.max(1, Math.ceil(filteredTeachers.length / TEACHERS_PER_PAGE));
  const teacherPageClamped = Math.min(teacherPage, teacherPages);
  const teachersPageSlice = filteredTeachers.slice(
    (teacherPageClamped - 1) * TEACHERS_PER_PAGE,
    teacherPageClamped * TEACHERS_PER_PAGE
  );

  /* --------------------------
     Tests filtering & pagination
     -------------------------- */
  const filteredTests = tests.filter((r) => {
    const matchesCourse = testCourse === "All" || r.course === testCourse;
    const matchesSubject = testSubject === "All" || r.subject === testSubject;
    const matchesSearch =
      testSearch.trim() === "" ||
      r.name.toLowerCase().includes(testSearch.toLowerCase()) ||
      r.id.toLowerCase().includes(testSearch.toLowerCase()) ||
      r.studentName.toLowerCase().includes(testSearch.toLowerCase());
    return matchesCourse && matchesSubject && matchesSearch;
  });

  const testPages = Math.max(1, Math.ceil(filteredTests.length / TESTS_PER_PAGE));
  const testPageClamped = Math.min(testPage, testPages);
  const testsPageSlice = filteredTests.slice(
    (testPageClamped - 1) * TESTS_PER_PAGE,
    testPageClamped * TESTS_PER_PAGE
  );

  /* --------------------------
     Top 10 students (filterable by course/subject)
     -------------------------- */
  const topStudentsList = useMemo(() => {
    const studentsPerformance = tests
      .filter((t) => (testCourse === "All" || t.course === testCourse) && (testSubject === "All" || t.subject === testSubject))
      .map((t) => ({ id: t.studentId, name: t.studentName, course: t.course, subject: t.subject, percentile: t.percentile }));

    // aggregate to pick highest percentile per student (simple approach)
    const bestByStudent = {};
    studentsPerformance.forEach((s) => {
      if (!bestByStudent[s.id] || s.percentile > bestByStudent[s.id].percentile) {
        bestByStudent[s.id] = s;
      }
    });
    return Object.values(bestByStudent).sort((a, b) => b.percentile - a.percentile).slice(0, 10);
  }, [tests, testCourse, testSubject]);

  /* --------------------------
     Performance counts (Top/Mid/Low)
     -------------------------- */
  const perfCounts = useMemo(() => {
    const arr = filteredTests;
    let top = 0,
      mid = 0,
      low = 0;
    arr.forEach((r) => {
      if (r.percentile >= 85) top++;
      else if (r.percentile >= 50) mid++;
      else low++;
    });
    return { top, mid, low };
  }, [filteredTests]);

  const perfBarData = [
    { category: "Top (85+)", count: perfCounts.top },
    { category: "Mid (50-84)", count: perfCounts.mid },
    { category: "Low (<50)", count: perfCounts.low },
  ];

  const coursePerfPie = COURSES.map((c, idx) => ({
    name: c,
    value: filteredTests.filter((t) => t.course === c).length,
    color: COLORS[idx % COLORS.length],
  }));

  /* --------------------------
     Actions: toggle student/teacher status
     -------------------------- */
  function toggleStudentStatus(id) {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: s.status === "Subscribed" ? "Unsubscribed" : "Subscribed" } : s)));
  }

  function toggleTeacherStatus(id) {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === "Active" ? "Blocked" : "Active" } : t)));
  }

  /* --------------------------
     Render
     -------------------------- */
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* TOP 5 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* 4 course cards */}
        {COURSES.map((course, i) => (
          <div key={course} className={`rounded-2xl p-4 shadow-lg text-white bg-gradient-to-tr ${i === 0 ? "from-indigo-600 to-indigo-400" : i === 1 ? "from-emerald-600 to-emerald-400" : i === 2 ? "from-yellow-500 to-amber-400" : "from-purple-600 to-violet-400"}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-semibold opacity-90">{course}</div>
                <div className="text-3xl font-extrabold mt-2">{stats.byCourse[course].total}</div>
              </div>
              <div className="text-right">
                <div className="text-xs">Subscribed</div>
                <div className="text-lg font-semibold text-green-100">{stats.byCourse[course].subscribed}</div>
                <div className="text-xs mt-1">Unsubscribed</div>
                <div className="text-lg font-semibold text-red-100">{stats.byCourse[course].unsubscribed}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Revenue card */}
        <div className="rounded-2xl p-4 shadow-lg bg-gradient-to-tr from-orange-500 to-rose-400 text-white">
          <div>
            <div className="text-sm font-semibold opacity-90">Total Revenue</div>
            <div className="text-3xl font-extrabold mt-2">₹{(stats.revenueTotal / 1000).toFixed(1)}K</div>
            <div className="mt-3 text-sm opacity-90">Foundation: ₹50,000 • NEET: ₹50,000</div>
            <div className="text-sm opacity-90">JEE: ₹25,000 • CET: ₹25,000</div>
          </div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2">Subscriptions</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={subscriptionPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {subscriptionPie.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
                <ReTooltip />
                <ReLegend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2">Admissions by Course</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={admissionsPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {admissionsPie.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2">Revenue by Course</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={revenuePie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name}: ${(percent*100).toFixed(0)}%`}>
                  {revenuePie.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
                <ReTooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                <ReLegend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TABBED SECTION */}
      <div className="bg-white rounded-2xl shadow p-0 overflow-hidden">
        {/* tab headers */}
        <div className="flex border-b bg-gradient-to-r from-indigo-50 to-purple-50">
          <button className={`flex-1 py-3 font-semibold ${activeTab === "students" ? "bg-indigo-600 text-white" : "text-gray-700"}`} onClick={() => setActiveTab("students")}>Students</button>
          <button className={`flex-1 py-3 font-semibold ${activeTab === "teachers" ? "bg-indigo-600 text-white" : "text-gray-700"}`} onClick={() => setActiveTab("teachers")}>Teachers</button>
          <button className={`flex-1 py-3 font-semibold ${activeTab === "tests" ? "bg-indigo-600 text-white" : "text-gray-700"}`} onClick={() => setActiveTab("tests")}>Tests</button>
        </div>

        <div className="p-4">
          {/* STUDENTS TAB */}
          {activeTab === "students" && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex gap-2">
                  <input value={studentSearch} onChange={(e) => { setStudentSearch(e.target.value); setStudentPage(1); }} placeholder="Search student or ID..." className="border rounded px-3 py-2 w-full md:w-80" />
                  <select value={studentCourse} onChange={(e) => { setStudentCourse(e.target.value); setStudentPage(1); }} className="border rounded px-3 py-2">
                    <option value="All">All Courses</option>
                    {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="text-sm text-gray-500">Showing {filteredStudents.length} results</div>
              </div>

              <div className="overflow-auto max-h-[460px] border rounded">
                <table className="min-w-[1000px] w-full border-collapse">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-2 border">Sr</th>
                      <th className="p-2 border">ID</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Course</th>
                      <th className="p-2 border">Joined</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsPageSlice.map((s, idx) => (
                      <tr key={s.id} className="odd:bg-white even:bg-gray-50">
                        <td className="p-2 border text-sm">{(studentPageClamped - 1) * STUDENTS_PER_PAGE + idx + 1}</td>
                        <td className="p-2 border text-sm">{s.id}</td>
                        <td className="p-2 border flex items-center gap-3">
                          <img src={s.img} alt={s.name} className="w-9 h-9 rounded-full border" />
                          <div>
                            <div className="font-medium">{s.name}</div>
                            <div className="text-xs text-gray-500">{s.course}</div>
                          </div>
                        </td>
                        <td className="p-2 border text-sm">{s.course}</td>
                        <td className="p-2 border text-sm">{s.joined}</td>
                        <td className="p-2 border text-sm">
                          <span className={`px-2 py-0.5 rounded text-xs ${s.status === "Subscribed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.status}</span>
                        </td>
                        <td className="p-2 border">
                          <div className="flex gap-1 justify-center">
                            <button onClick={() => toggleStudentStatus(s.id)} className={`px-2 py-1 text-xs rounded ${s.status === "Subscribed" ? "bg-gray-700 text-white" : "bg-green-600 text-white"}`}>
                              {s.status === "Subscribed" ? <><BlockIcon fontSize="small" /> Unsub</> : <><CheckCircleIcon fontSize="small" /> Sub</>}
                            </button>
                            <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded flex items-center gap-1"><EditIcon fontSize="small" />Edit</button>
                            <button className="px-2 py-1 text-xs bg-yellow-500 text-white rounded flex items-center gap-1"><DeleteIcon fontSize="small" />Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Students pagination */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <button onClick={() => setStudentPage((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-gray-200 rounded" disabled={studentPageClamped === 1}>Prev</button>
                <div className="px-3 py-1">Page {studentPageClamped} / {studentPages}</div>
                <button onClick={() => setStudentPage((p) => Math.min(studentPages, p + 1))} className="px-3 py-1 bg-gray-200 rounded" disabled={studentPageClamped === studentPages}>Next</button>
              </div>
            </div>
          )}

          {/* TEACHERS TAB */}
          {activeTab === "teachers" && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex gap-2">
                  <input value={teacherSearch} onChange={(e) => { setTeacherSearch(e.target.value); setTeacherPage(1); }} placeholder="Search teacher or ID..." className="border rounded px-3 py-2 w-full md:w-80" />
                  <select value={teacherCourse} onChange={(e) => { setTeacherCourse(e.target.value); setTeacherPage(1); }} className="border rounded px-3 py-2">
                    <option value="All">All Courses</option>
                    {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="text-sm text-gray-500">Showing {filteredTeachers.length} results</div>
              </div>

              <div className="overflow-auto max-h-[460px] border rounded">
                <table className="min-w-[1000px] w-full border-collapse">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-2 border">Sr</th>
                      <th className="p-2 border">ID</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Course</th>
                      <th className="p-2 border">Subject</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachersPageSlice.map((t, idx) => (
                      <tr key={t.id} className="odd:bg-white even:bg-gray-50">
                        <td className="p-2 border text-sm">{(teacherPageClamped - 1) * TEACHERS_PER_PAGE + idx + 1}</td>
                        <td className="p-2 border text-sm">{t.id}</td>
                        <td className="p-2 border flex items-center gap-3">
                          <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full border" />
                          <div>
                            <div className="font-medium">{t.name}</div>
                            <div className="text-xs text-gray-500">{t.course}</div>
                          </div>
                        </td>
                        <td className="p-2 border text-sm">{t.course}</td>
                        <td className="p-2 border text-sm">{t.subject}</td>
                        <td className="p-2 border text-sm">
                          <span className={`px-2 py-0.5 rounded text-xs ${t.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{t.status}</span>
                        </td>
                        <td className="p-2 border">
                          <div className="flex gap-1 justify-center">
                            <button onClick={() => toggleTeacherStatus(t.id)} className={`px-2 py-1 text-xs rounded ${t.status === "Active" ? "bg-gray-700 text-white" : "bg-green-600 text-white"}`}>
                              {t.status === "Active" ? <><BlockIcon fontSize="small" /> Block</> : <><CheckCircleIcon fontSize="small" /> Unblock</>}
                            </button>
                            <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded flex items-center gap-1"><EditIcon fontSize="small" />Edit</button>
                            <button className="px-2 py-1 text-xs bg-yellow-500 text-white rounded flex items-center gap-1"><DeleteIcon fontSize="small" />Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-center gap-2 mt-3">
                <button onClick={() => setTeacherPage((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-gray-200 rounded" disabled={teacherPageClamped === 1}>Prev</button>
                <div className="px-3 py-1">Page {teacherPageClamped} / {teacherPages}</div>
                <button onClick={() => setTeacherPage((p) => Math.min(teacherPages, p + 1))} className="px-3 py-1 bg-gray-200 rounded" disabled={teacherPageClamped === teacherPages}>Next</button>
              </div>
            </div>
          )}

          {/* TESTS TAB */}
          {activeTab === "tests" && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex gap-2">
                  <input value={testSearch} onChange={(e) => { setTestSearch(e.target.value); setTestPage(1); }} placeholder="Search test / student / id..." className="border rounded px-3 py-2 w-full md:w-96" />
                  <select value={testCourse} onChange={(e) => { setTestCourse(e.target.value); setTestPage(1); }} className="border rounded px-3 py-2">
                    <option value="All">All Courses</option>
                    {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={testSubject} onChange={(e) => { setTestSubject(e.target.value); setTestPage(1); }} className="border rounded px-3 py-2">
                    <option value="All">All Subjects</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="text-sm text-gray-500">Showing {filteredTests.length} results</div>
              </div>

              {/* Test Records table */}
              <div className="overflow-auto max-h-[420px] border rounded">
                <table className="min-w-[1100px] w-full border-collapse">
                  <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white sticky top-0">
                    <tr>
                      <th className="p-2 border">Sr</th>
                      <th className="p-2 border">Test ID</th>
                      <th className="p-2 border w-1/3">Test Name</th>
                      <th className="p-2 border">Course</th>
                      <th className="p-2 border">Subject</th>
                      <th className="p-2 border">Student</th>
                      <th className="p-2 border">Percentile</th>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testsPageSlice.map((r, idx) => (
                      <tr key={r.id} className="odd:bg-white even:bg-gray-50">
                        <td className="p-2 border text-sm">{(testPageClamped - 1) * TESTS_PER_PAGE + idx + 1}</td>
                        <td className="p-2 border text-sm">{r.id}</td>
                        <td className="p-2 border">{r.name}</td>
                        <td className="p-2 border text-sm">{r.course}</td>
                        <td className="p-2 border text-sm">{r.subject}</td>
                        <td className="p-2 border text-sm flex items-center gap-2">
                          <img src={students.find(s => s.id === r.studentId)?.img} alt={r.studentName} className="w-8 h-8 rounded-full border" />
                          <div>
                            <div className="font-medium text-sm">{r.studentName}</div>
                            <div className="text-xs text-gray-500">{r.studentId}</div>
                          </div>
                        </td>
                        <td className="p-2 border text-sm font-bold">{r.percentile}%</td>
                        <td className="p-2 border text-sm">{r.date}</td>
                        <td className="p-2 border">
                          <div className="flex gap-1 justify-center">
                            <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded flex items-center gap-1"><EditIcon fontSize="small" />Edit</button>
                            <button className="px-2 py-1 text-xs bg-red-500 text-white rounded flex items-center gap-1"><DeleteIcon fontSize="small" />Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tests pagination */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <button onClick={() => setTestPage((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-gray-200 rounded" disabled={testPageClamped === 1}>Prev</button>
                <div className="px-3 py-1">Page {testPageClamped} / {testPages}</div>
                <button onClick={() => setTestPage((p) => Math.min(testPages, p + 1))} className="px-3 py-1 bg-gray-200 rounded" disabled={testPageClamped === testPages}>Next</button>
              </div>

              {/* Bottom area: Top 10 + Performance breakdown side-by-side */}
              <div className="grid md:grid-cols-3 gap-6 mt-4">
                {/* Top 10 */}
                <div className="col-span-1 md:col-span-1 bg-white rounded p-4 shadow">
                  <h4 className="font-semibold mb-3">Top 10 (filterable)</h4>
                  <div className="space-y-2 max-h-[300px] overflow-auto">
                    {topStudentsList.map((s, i) => (
                      <div key={s.id} className="flex items-center gap-3 border-b pb-2">
                        <div className="w-10 text-sm font-medium">{i + 1}.</div>
                        <img src={`https://i.pravatar.cc/150?img=${(i % 70) + 10}`} alt={s.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-gray-500">{s.course} • {s.subject}</div>
                        </div>
                        <div className="font-bold">{s.percentile}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="col-span-2 bg-white rounded p-4 shadow">
                  <h4 className="font-semibold mb-3">Performance Counts</h4>
                  <div style={{ width: "100%", height: 220 }}>
                    <ResponsiveContainer>
                      <BarChart data={perfBarData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#6366F1" radius={[6,6,0,0]}>
                          <Cell fill="#16A34A" />
                          <Cell fill="#F59E0B" />
                          <Cell fill="#EF4444" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                    <div className="p-2 rounded bg-green-50 text-center">
                      <div className="font-semibold text-green-700">{perfCounts.top}</div>
                      <div className="text-gray-500">Top</div>
                    </div>
                    <div className="p-2 rounded bg-yellow-50 text-center">
                      <div className="font-semibold text-yellow-700">{perfCounts.mid}</div>
                      <div className="text-gray-500">Mid</div>
                    </div>
                    <div className="p-2 rounded bg-red-50 text-center">
                      <div className="font-semibold text-red-700">{perfCounts.low}</div>
                      <div className="text-gray-500">Low</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
