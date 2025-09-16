import EmployeeScheduling from "./EmployeeScheduling";

export default function EmployeeDashboard({ employeeId }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
      <p className="mb-6">Welcome, Employee! You can view and pick up shifts here.</p>

      {/* Scheduling tab */}
      <EmployeeScheduling employeeId={employeeId} />
    </div>
  );
}
