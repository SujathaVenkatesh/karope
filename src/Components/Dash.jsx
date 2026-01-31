import Dashcard from "../Components/Dashcard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,       
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,        
  Tooltip,
  Legend
);







const Dash = () => {

//  graph

 const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Recharge",
        data: [50, 150, 120, 140, 250, 200, 230, 180, 250, 190, 240, 300],
        borderColor: "#399c41",
        backgroundColor: "rgba(52, 141, 59, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // circle
   const data2 = {
    labels: ["Success", "Failed"],
    datasets: [
      {
        data: [95, 5],
        backgroundColor: ["#399c41", "#dc3545"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  return (
    <>
      <h4 className="poppins-bold mb-4 text-color">Dashboard</h4>

     {/* STATS SECTION */}
<div className="bg-white shadow-sm rounded p-3 mb-4">
  <div className="row g-3">
    <Dashcard 
      title="Total Users"
      value="2,543"
      percent="+12.5%"
      type="users"
    />

    <Dashcard
      title="New Users"
      value="1,923"
      percent="+12.5%"
      type="newUsers"
    />

    <Dashcard
      title="Today Recharge"
      value="620"
      percent="+12.5%"
      type="recharge"
    />

    <Dashcard
      title="Prepaid / Postpaid"
      value="743 / 1045"
      type="prepaid"
    />
  </div>
</div>



      {/* CHART SECTION */}
      <div className="row mb-4">
  {/* LEFT: Recharge Line Chart */}
  <div className="col-lg-8 mb-4">
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="poppins-bold mb-3 text-color">Recharge</h5>

        {/* Chart container */}
        <div style={{ height: "260px" }} className="poppins-regular">
          <Line  data={data} options={options} />
        </div>
      </div>
    </div>
  </div>

  {/* RIGHT: Success & Failed Donut */}
  <div className="col-lg-4 mb-4">
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="poppins-bold text-color mb-3">
          Success & Failed
        </h5>

        <div className="d-flex flex-column align-items-center justify-content-center">
          <div style={{ width: "180px", height: "180px" }}>
            <Doughnut data={data2} options={options2} />
          </div>

          <div className="mt-3 fw-semibold">
            <span className="text-color poppins-regular">● Success 95%</span>
            <span className="mx-3">|</span>
            <span className="text-danger poppins-regular">● Failed 5%</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>


      {/* TRANSACTION TABLE */}
      <div className="card shadow-sm mt-2">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <h5 className="poppins-bold text-color">Transactions History</h5>
            <a href="#" className="text-color poppins-bold">
              View All
            </a>
          </div>

          <div className="table-responsive text-center poppins-medium">
            <table className="table table-bordered align-middle ">
              <thead className="custom-table-head th">
                <tr>
                  <th>S.no</th>
                  <th>Transaction ID</th>
                  <th>User</th>
                  <th>Operator</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>TXN-123456</td>
                  <td>Rohit<br /><span className="text-muted">9874563210</span></td>
                  <td>Airtel</td>
                  <td>Prepaid</td>
                  <td>₹799</td>
                  <td>UPI</td>
                  <td className="text-success poppins-semibold">Success</td>
                  <td>Jan 02, 2026<br />11:03 AM</td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>TXN-123457</td>
                  <td>Kishore<br /><span className="text-muted">9874563211</span></td>
                  <td>Jio</td>
                  <td>Postpaid</td>
                  <td>₹409</td>
                  <td>Card</td>
                  <td className="text-danger poppins-semibold">Failed</td>
                  <td>Jan 02, 2026<br />11:03 AM</td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>TXN-123458</td>
                  <td>Priya<br /><span className="text-muted">9874563212</span></td>
                  <td>Airtel</td>
                  <td>Postpaid</td>
                  <td>₹799</td>
                  <td>UPI</td>
                  <td className="text-success poppins-semibold">Success</td>
                  <td>Jan 02, 2026<br />11:03 AM</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dash;
