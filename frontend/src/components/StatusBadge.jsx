function StatusBadge({ status }) {

  return (
    <span className={`badge ${status.toLowerCase().replace(" ", "-")}`}>
      {status}
    </span>
  );
}

export default StatusBadge;

