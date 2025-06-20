import { useState } from "react";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleEmployeeAdded = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Employee Management App</h1>
      <AddEmployeeForm onEmployeeAdded={() => console.log("Employee added")} />
      <EmployeeList refresh={refreshFlag} />
    </div>
  );
}

export default App;
