import {
  FaUsers,
  FaUserPlus,
  FaMobileAlt,
  FaChartBar,
} from "react-icons/fa";

const iconMap = {
  users: <FaUsers size={18} />,
  newUsers: <FaUserPlus size={18} />,
  recharge: <FaMobileAlt size={18} />,
  prepaid: <FaChartBar size={18} />,
};

const Dashcard = ({ title, value, percent, type, style }) => {
  return (
    <div className="col-lg-3 col-md-6">
      <div className="text-white rounded p-3" style={{ backgroundColor: '#399c41', height: "110px" }}>
        {/* Title */}
        <h5 className="poppins-semibold mb-3">{title}</h5>

        {/* Value + Percent + Icon (SAME LINE) */}
        <div className="d-flex align-items-center justify-content-between">

          {/* Left: value + percent */}
          <div className="d-flex align-items-center gap-2">
            <h3 className="poppins-bold mb-0">{value}</h3>
            {percent && (
              <small className="poppins-bold mt-1">{percent}</small>
            )}
          </div>

          {/* Right: icon */}
          <div className="bg-white text-success  rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "34px", height: "34px" }}>
            {iconMap[type]}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashcard;
