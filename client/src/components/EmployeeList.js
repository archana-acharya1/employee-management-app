import { useEffect, useState } from "react";

const EmployeeList = ({ refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [department, refresh]);

  const fetchEmployees = async () => {
    let url = "http://localhost:3000/employees";
    if (department) {
      url += `?department=${department}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>

      <label>Filter by Department: </label>
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">All</option>
        <option value="HR">HR</option>
        <option value="Tech">Tech</option>
        <option value="Sales">Sales</option>
      </select>

      <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="3">No employees found</td>
            </tr>
          ) : (
            employees.map((emp) => {
              const isGmail = emp.email.endsWith("@gmail.com");

              return (
                <tr
                  key={emp.id}
                  style={{
                    backgroundColor: isGmail ? "#d4edda" : "white",
                  }}
                >
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
