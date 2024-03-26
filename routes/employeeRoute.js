const express = require("express");
const Employee = require("../models/employee");

const router = express.Router();
//endpoint to register a employee
router.post("/addEmployee", async (req, res) => {
    try {
      const {
        employeeName,
        employeeId,
        designation,
        phoneNumber,
        dateOfBirth,
        joiningDate,
        activeEmployee,
        salary,
        address,
      } = req.body;
  
      //create a new Employee
      const newEmployee = new Employee({
        employeeName,
        employeeId,
        designation,
        phoneNumber,
        dateOfBirth,
        joiningDate,
        activeEmployee,
        salary,
        address,
      });
  
      await newEmployee.save();
  
      res
        .status(201)
        .json({ message: "Employee saved successfully", employee: newEmployee });
    } catch (error) {
      console.log("Error creating employee", error);
      res.status(500).json({ message: "Failed to add an employee" });
    }
  });
  
  //endpoint to fetch all the employees
  router.get("/", async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve the employees" });
    }
  });
  
  module.exports = router;