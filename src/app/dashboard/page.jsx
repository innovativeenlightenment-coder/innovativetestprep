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

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
import Image from "next/image";

// Chart Colors
const COLORS = ["#22c55e", "#f87171", "#3b82f6", "#f59e0b", "#a855f7"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("students");

  // Chart Data
  const subscriptionData = [
    { name: "Subscribed", value: 120 },
    { name: "Unsubscribed", value: 40 },
  ];

  const admissionData = [
    { name: "Foundation", value: 60 },
    { name: "NEET", value: 40 },
    { name: "JEE", value: 30 },
    { name: "CET", value: 20 },
  ];

  const revenueData = [
    { name: "Foundation", value: 50000 },
    { name: "NEET", value: 50000 },
    { name: "JEE", value: 25000 },
    { name: "CET", value: 25000 },
  ];

  // Dummy Data
  const students = [
    { id: 1, name: "Rahul Sharma", course: "Foundation", status: "Active", img: "/student1.jpg" },
    { id: 2, name: "Sneha Patil", course: "NEET", status: "Blocked", img: "/student2.jpg" },
    { id: 3, name: "Amit Kumar", course: "CET", status: "Active", img: "/student3.jpg" },
  ];

  const teachers = [
    { id: 1, name: "Prof. Anjali Mehta", course: "Foundation", subject: "Mathematics", img: "/teacher1.jpg" },
    { id: 2, name: "Dr. Rakesh Iyer", course: "NEET", subject: "Biology", img: "/teacher2.jpg" },
    { id: 3, name: "Prof. Kiran Deshmukh", course: "JEE", subject: "Physics", img: "/teacher3.jpg" },
  ];

  const tests = [
    { id: 1, name: "Mock Test 1", course: "NEET", subject: "Biology", date: "2025-09-01", img: "/test1.jpg" },
    { id: 2, name: "Mock Test 2", course: "JEE", subject: "Physics", date: "2025-09-10", img: "/test2.jpg" },
    { id: 3, name: "Mock Test 3", course: "Foundation", subject: "Mathematics", date: "2025-09-15", img: "/test3.jpg" },
  ];

  // Action Buttons
  const ActionButtons = () => (
    <div className="flex gap-1">
      <button className="px-2 py-1 text-xs flex items-center gap-1 bg-red-500 text-white rounded hover:bg-red-600">
        <BlockIcon fontSize="small" /> Block
      </button>
      <button className="px-2 py-1 text-xs flex items-center gap-1 bg-green-500 text-white rounded hover:bg-green-600">
        <CheckCircleIcon fontSize="small" /> Unblock
      </button>
      <button className="px-2 py-1 text-xs flex items-center gap-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        <EditIcon fontSize="small" /> Modify
      </button>
      <button className="px-2 py-1 text-xs flex items-center gap-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        <DeleteIcon fontSize="small" /> Delete
      </button>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Row - 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        {[
          { title: "Foundation", total: 60, subscribed: 45, unsubscribed: 15, icon: <SchoolIcon />, gradient: "from-indigo-500 to-purple-500" },
          { title: "NEET", total: 40, subscribed: 30, unsubscribed: 10, icon: <SchoolIcon />, gradient: "from-pink-500 to-rose-500" },
          { title: "JEE", total: 30, subscribed: 20, unsubscribed: 10, icon: <SchoolIcon />, gradient: "from-emerald-500 to-green-600" },
          { title: "CET", total: 20, subscribed: 15, unsubscribed: 5, icon: <PeopleIcon />, gradient: "from-blue-500 to-cyan-500" },
          { title: "Revenue", total: "₹1.5L", subscribed: null, unsubscribed: null, icon: <MonetizationOnIcon />, gradient: "from-yellow-400 to-orange-500" },
        ].map((course, i) => (
          <div key={i} className={`bg-gradient-to-r ${course.gradient} text-white shadow-xl rounded-xl p-5`}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <div className="bg-white/20 p-2 rounded-full">{course.icon}</div>
            </div>
            <p className="text-3xl font-bold mb-3">{course.total}</p>

            {course.subscribed !== null && (
              <div className="text-sm flex justify-between bg-white/20 px-2 py-1 mb-1 rounded">
                <span>✅ Subscribed</span>
                <span>{course.subscribed}</span>
              </div>
            )}
            {course.unsubscribed !== null && (
              <div className="text-sm flex justify-between bg-white/20 px-2 py-1 rounded">
                <span>❌ Unsubscribed</span>
                <span>{course.unsubscribed}</span>
              </div>
            )}
            {course.title === "Revenue" && (
              <div className="mt-2 text-sm space-y-1">
                <p>📘 Foundation: ₹50,000</p>
                <p>📗 NEET: ₹50,000</p>
                <p>📕 JEE: ₹25,000</p>
                <p>📙 CET: ₹25,000</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold mb-2">Subscriptions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={subscriptionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {subscriptionData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold mb-2">Admissions by Course</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={admissionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {admissionData.map((_, i) => <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold mb-2">Revenue by Course</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={revenueData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {revenueData.map((_, i) => <Cell key={i} fill={COLORS[(i + 1) % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white shadow rounded-xl">
        {/* Tab Headers */}
        <div className="flex border-b">
          {["students", "teachers", "tests"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-center font-semibold ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {/* Students Table */}
          {activeTab === "students" && (
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Sr No</th>
                  <th className="p-2">ID</th>
                  <th className="p-2 w-1/3">Name</th>
                  <th className="p-2">Course</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{s.id}</td>
                    <td className="p-2 flex items-center gap-2">
                      <Image src={s.img} alt={s.name} width={32} height={32} className="rounded-full border" />
                      {s.name}
                    </td>
                    <td className="p-2">{s.course}</td>
                    <td className="p-2">{s.status}</td>
                    <td className="p-2"><ActionButtons /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Teachers Table */}
          {activeTab === "teachers" && (
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Sr No</th>
                  <th className="p-2">ID</th>
                  <th className="p-2 w-1/3">Name</th>
                  <th className="p-2">Course</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t, i) => (
                  <tr key={t.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{t.id}</td>
                    <td className="p-2 flex items-center gap-2">
                      <Image src={t.img} alt={t.name} width={32} height={32} className="rounded-full border" />
                      {t.name}
                    </td>
                    <td className="p-2">{t.course}</td>
                    <td className="p-2">{t.subject}</td>
                    <td className="p-2"><ActionButtons /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Tests Table */}
          {activeTab === "tests" && (
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Sr No</th>
                  <th className="p-2">ID</th>
                  <th className="p-2 w-1/3">Test Name</th>
                  <th className="p-2">Course</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((t, i) => (
                  <tr key={t.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{t.id}</td>
                    <td className="p-2 flex items-center gap-2">
                      <Image src={t.img} alt={t.name} width={32} height={32} className="rounded border" />
                      {t.name}
                    </td>
                    <td className="p-2">{t.course}</td>
                    <td className="p-2">{t.subject}</td>
                    <td className="p-2">{t.date}</td>
                    <td className="p-2"><ActionButtons /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
