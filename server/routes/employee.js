const express = require("express");
const router = express.Router();
const db = require("../db");

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

router.post("/", async (req, res) => {
  if (!req.body?.name || !req.body?.email || !req.body?.department) {
    return res
      .status(400)
      .json({ error: "Name, email and department are required" });
  }

  const { name, email, department } = req.body;

  const capitalizedDepartment = capitalizeFirstLetter(department);

  if (!["Hr", "Tech", "Sales"].includes(capitalizedDepartment)) {
    res.status(400).json({ error: "Invalid Department" });
  }

  try {
    const emailCheck = await db.query(
      "SELECT * FROM employees WHERE email = $1",
      [email]
    );
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const result = await db.query(
      "INSERT INTO employees (name, email, department) VALUES ($1, $2, $3) RETURNING *",
      [name, email, capitalizedDepartment]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  const { department } = req.query;

  try {
    let query = "SELECT * FROM employees";
    let params = [];

    if (department) {
      query += " WHERE department = $1";
      params.push(capitalizeFirstLetter(department));
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
