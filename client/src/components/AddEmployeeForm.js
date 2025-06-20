import { useState } from "react";

const AddEmployeeForm = ({ onEmployeeAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !department) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, department }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
      } else {
        alert("Employee added successfully");
        setName("");
        setEmail("");
        setDepartment("");
        onEmployeeAdded();
      }
    } catch (error) {
      alert("Error adding employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Add Employee</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="Tech">Tech</option>
        <option value="Sales">Sales</option>
      </select>
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddEmployeeForm;
