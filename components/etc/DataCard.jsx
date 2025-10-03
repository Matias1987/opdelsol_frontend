

const DataCard = ({ title, value, icon }) => (
  <div className="data-card">
    <div className="card-icon">{icon}</div>
    <div className="card-content">
      <h3 className="card-title">{title}</h3>
      <p className="card-value">{value}</p>
    </div>
  </div>
);

export default DataCard;