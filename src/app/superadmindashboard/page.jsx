// "use client";

// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// // Dummy data
// const studentData = [
//   { id: 1, name: "Amit", course: "JEE", subject: "Physics", score: 85 },
//   { id: 2, name: "Sneha", course: "NEET", subject: "Biology", score: 90 },
//   { id: 3, name: "Ravi", course: "CET", subject: "Maths", score: 78 },
//   { id: 4, name: "Priya", course: "JEE", subject: "Chemistry", score: 88 },
// ];

// const teacherData = [
//   { id: 1, name: "Mr. Sharma", course: "JEE", subject: "Physics", status: "Active" },
//   { id: 2, name: "Dr. Meena", course: "NEET", subject: "Biology", status: "Blocked" },
//   { id: 3, name: "Mr. Ramesh", course: "CET", subject: "Maths", status: "Active" },
// ];

// const testData = [
//   { id: 1, name: "Test 1", course: "JEE", subject: "Physics", topper: "Amit", score: 85 },
//   { id: 2, name: "Test 2", course: "NEET", subject: "Biology", topper: "Sneha", score: 90 },
//   { id: 3, name: "Test 3", course: "CET", subject: "Maths", topper: "Ravi", score: 78 },
// ];

// const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

// export default function Dashboard() {
//   const [courseFilter, setCourseFilter] = useState("All");
//   const [subjectFilter, setSubjectFilter] = useState("All");
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const filterData = (data, any[]) =>
//     data.filter(
//       (d) =>
//         (courseFilter === "All" || d.course === courseFilter) &&
//         (subjectFilter === "All" || d.subject === subjectFilter)
//     );

//   // Pie chart data
//   const subjectCount = studentData.reduce((acc, cur) => {
//     acc[cur.subject] = (acc[cur.subject] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const pieData = Object.keys(subjectCount).map((key) => ({
//     name: key,
//     value: subjectCount[key],
//   }));

//   const renderTable = (data: any[], type: "student" | "teacher" | "test") => (
//     <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
//       <table className="w-full border-collapse">
//         <thead className="bg-indigo-600 text-white">
//           <tr>
//             {Object.keys(data[0]).map((key) => (
//               <th key={key} className="p-3 text-left capitalize">
//                 {key}
//               </th>
//             ))}
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.slice(0, rowsPerPage).map((row) => (
//             <tr key={row.id} className="border-b hover:bg-indigo-50">
//               {Object.values(row).map((val, i) => (
//                 <td key={i} className="p-3">
//                   {val}
//                 </td>
//               ))}
//               <td className="p-3 flex gap-2">
//                 <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
//                   ✏️ Edit
//                 </Button>
//                 <Button size="sm" className="bg-red-500 hover:bg-red-600">
//                   🗑️ Delete
//                 </Button>
//                 {type !== "test" && (
//                   <Button
//                     size="sm"
//                     className={`${
//                       row.status === "Blocked"
//                         ? "bg-green-500 hover:bg-green-600"
//                         : "bg-gray-500 hover:bg-gray-600"
//                     }`}
//                   >
//                     {row.status === "Blocked" ? "Unblock" : "Block"}
//                   </Button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-6">
//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
//         {["Students", "Teachers", "Tests", "Courses", "Pass Rate"].map((item, i) => (
//           <Card
//             key={i}
//             className={`bg-gradient-to-r from-${["pink", "blue", "green", "yellow", "purple"][i]}-400 to-${["pink", "blue", "green", "yellow", "purple"][i]}-600 text-white shadow-xl rounded-2xl`}
//           >
//             <CardContent className="p-6 text-center">
//               <h2 className="text-lg font-semibold">{item}</h2>
//               <p className="text-3xl font-bold mt-2">{Math.floor(Math.random() * 100)}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="students" className="w-full">
//         <TabsList className="flex justify-center mb-6 bg-white shadow-md rounded-xl p-2">
//           <TabsTrigger value="students">Students</TabsTrigger>
//           <TabsTrigger value="teachers">Teachers</TabsTrigger>
//           <TabsTrigger value="tests">Tests</TabsTrigger>
//           <TabsTrigger value="performance">Performance</TabsTrigger>
//           <TabsTrigger value="reports">Reports</TabsTrigger>
//         </TabsList>

//         {/* Students */}
//         <TabsContent value="students">
//           {renderTable(filterData(studentData), "student")}
//         </TabsContent>

//         {/* Teachers */}
//         <TabsContent value="teachers">
//           {renderTable(filterData(teacherData), "teacher")}
//         </TabsContent>

//         {/* Tests */}
//         <TabsContent value="tests">
//           {renderTable(filterData(testData), "test")}
//         </TabsContent>

//         {/* Performance */}
//         <TabsContent value="performance">
//           <div className="bg-white p-6 shadow-lg rounded-2xl">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Subject-wise Distribution</h2>
//             <div className="h-[400px]">
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={120}
//                     label
//                   >
//                     {pieData.map((_, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </TabsContent>

//         {/* Reports */}
//         <TabsContent value="reports">
//           <div className="bg-white p-6 shadow-lg rounded-2xl text-center">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Reports Section</h2>
//             <p className="text-gray-600">Coming soon...</p>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page