function StatusFilter({ status, setStatus }) {
  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="status-filter"
    >
      <option value="">All Status</option>
      <option value="Open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="Closed">Closed</option>
    </select>
  );
}

export default StatusFilter;

