const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const moment = require("moment");
const Employee = require("./routes/employeeRoute")

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/employees",Employee)

mongoose
  .connect('mongodb+srv://employeepaymentuser:i8PQeZX1bVovuUPi@cluster0.wgnqycb.mongodb.net/EMPLOYEE_APP', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});



// app.get("/attendance-report-all-employees", async (req, res) => {
//     try {
//       const { month, year } = req.query;
  
//       console.log("Query parameters:", month, year);
//       // Calculate the start and end dates for the selected month and year
//       const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
//         .startOf("month")
//         .toDate();
//       const endDate = moment(startDate).endOf("month").toDate();
  
//       // Aggregate attendance data for all employees and date range
//       const report = await Attendance.aggregate([
//         {
//           $match: {
//             $expr: {
//               $and: [
//                 {
//                   $eq: [
//                     { $month: { $dateFromString: { dateString: "$date" } } },
//                     parseInt(req.query.month),
//                   ],
//                 },
//                 {
//                   $eq: [
//                     { $year: { $dateFromString: { dateString: "$date" } } },
//                     parseInt(req.query.year),
//                   ],
//                 },
//               ],
//             },
//           },
//         },
  
//         {
//           $group: {
//             _id: "$employeeId",
//             present: {
//               $sum: {
//                 $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
//               },
//             },
//             absent: {
//               $sum: {
//                 $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
//               },
//             },
//             halfday: {
//               $sum: {
//                 $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
//               },
//             },
//             holiday: {
//               $sum: {
//                 $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
//               },
//             },
//           },
//         },
//         {
//           $lookup: {
//             from: "employees", // Name of the employee collection
//             localField: "_id",
//             foreignField: "employeeId",
//             as: "employeeDetails",
//           },
//         },
//         {
//           $unwind: "$employeeDetails", // Unwind the employeeDetails array
//         },
//         {
//           $project: {
//             _id: 1,
//             present: 1,
//             absent: 1,
//             halfday: 1,
//             name: "$employeeDetails.employeeName",
//             designation:"$employeeDetails.designation",
//             salary: "$employeeDetails.salary",
//             employeeId: "$employeeDetails.employeeId",
//           },
//         },
//       ]);
  
//       res.status(200).json({ report });
//     } catch (error) {
//       console.error("Error generating attendance report:", error);
//       res.status(500).json({ message: "Error generating the report" });
//     }
//   });
  
