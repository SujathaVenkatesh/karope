import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { IoSearchSharp } from "react-icons/io5";

function Transaction() {
  const [dateRange, setDateRange] = useState('All');
  const [status, setStatus] = useState('All Status');
  const [searchMobile, setSearchMobile] = useState('');

  const transactions = [
    {
      id: 1,
      transactionId: 'TXN-123456',
      user: 'Rohit',
      mobile: '9874563210',
      operator: 'Airtel',
      type: 'Prepaid',
      amount: 799,
      payment: 'UPI',
      status: 'Success',
      date: 'Jan 05, 2025',
      time: '9:21 AM',
    },
    {
      id: 2,
      transactionId: 'TXN-123457',
      user: 'Kishore',
      mobile: '9874563211',
      operator: 'Jio',
      type: 'Postpaid',
      amount: 400,
      payment: 'Card',
      status: 'Failed',
      date: 'Jan 05, 2025',
      time: '9:21 AM',
    },
    {
      id: 3,
      transactionId: 'TXN-123458',
      user: 'Priya',
      mobile: '9874563212',
      operator: 'Airtel',
      type: 'Postpaid',
      amount: 555,
      payment: 'UPI',
      status: 'Success',
      date: 'Jan 05, 2025',
      time: '9:21 AM',
    },
    {
      id: 4,
      transactionId: 'TXN-123459',
      user: 'Gayatri',
      mobile: '9874563213',
      operator: 'Jio',
      type: 'Prepaid',
      amount: 421,
      payment: 'UPI',
      status: 'Success',
      date: 'Jan 05, 2025',
      time: '9:21 AM',
    },
    {
      id: 5,
      transactionId: 'TXN-123450',
      user: 'Krishna',
      mobile: '9874563214',
      operator: 'Airtel',
      type: 'Prepaid',
      amount: 445,
      payment: 'Card',
      status: 'Success',
      date: 'Jan 05, 2025',
      time: '9:21 AM',
    },
  ];

  // 🔹 FILTER LOGIC
  const filteredData = useMemo(() => {
    return transactions.filter((t) => {
      const statusMatch =
        status === 'All Status' || t.status === status;

      const mobileMatch =
        searchMobile === '' ||
        t.mobile.includes(searchMobile);

      return statusMatch && mobileMatch;
    });
  }, [status, searchMobile]);

  // 🔹 EXPORT FUNCTION
  const handleExport = () => {
    const csv = [
      [
        'Transaction ID',
        'User',
        'Mobile',
        'Operator',
        'Type',
        'Amount',
        'Payment',
        'Status',
      ],
      ...filteredData.map((t) => [
        t.transactionId,
        t.user,
        t.mobile,
        t.operator,
        t.type,
        t.amount,
        t.payment,
        t.status,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <div className="container-fluid">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="poppins-bold text-color">Transaction</h4>
          <p className="poppins-regular mb-0 text-muted">
            Manage and Monitor All Recharge Activities.
          </p>
        </div>
        <button className="btn  poppins-regular text-white" onClick={handleExport} style={{backgroundColor:"#399C41"}}>
          Export CSV
        </button>
      </div>

      {/* FILTERS */}
      <div className="card p-3 mb-4">
        <div className="row g-3 align-items-end">

          <div className="col-md-4">
            <label className="form-label poppins-regular">Date Range</label>
            <select
              className="form-select form-control poppins-regular text-muted"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>All</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label poppins-regular ">Status</label>
            <select
              className="form-select form-control poppins-regular text-muted"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All Status</option>
              <option>Success</option>
              <option>Failed</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label poppins-regular">Search Mobile</label>            
            <div className="input-group">
              <input
                type="text"
                className="form-control poppins-regular text-muted"
                placeholder="Search"
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card p-3 mb-4 mt-5">
        <div className="table-responsive text-center poppins-medium">
          <div className="table-responsive text-center poppins-medium">
            <table className="table table-bordered align-middle ">
              <thead className="custom-table-head th text-center poppins-medium">
                <tr>
                  <th>S.No</th>
                  <th>Transaction ID</th>
                  <th>User</th>
                  <th>Operation</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((t, i) => (
                  <tr key={t.id}>
                    <td>{i + 1}</td>
                    <td>{t.transactionId}</td>
                    <td>
                      <h6 className="mb-0">{t.user}</h6>
                      <span className="text-muted">{t.mobile}</span>
                    </td>
                    <td>{t.operator}</td>
                    <td>{t.type}</td>
                    <td>₹{t.amount}</td>
                    <td>{t.payment}</td>
                    <td>
                      <span
                        className={
                          t.status === 'Success'
                            ? 'text-success fw-semibold'
                            : 'text-danger fw-semibold'
                        }
                      >
                        {t.status}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'pre-line' }}>
                      {t.date}<br /> <small className='text-muted'>{t.time}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;