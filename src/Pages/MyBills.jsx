import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyBills = () => {
  const { loading, setLoading, user } = useContext(AuthContext);
  const [myBills, setMyBills] = useState([]);
  const [editBill, setEditBill] = useState(null); // for update modal
  const [showEditModal, setShowEditModal] = useState(false); // toggle edit modal
  const [deleteBillId, setDeleteBillId] = useState(null); // for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // toggle delete modal

  // Calculate total
  const totalBills = myBills.length;
  const totalAmount = myBills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0);

  useEffect(() => {
    // if (user && user.email) {
    //   setLoading(true);

      axios.get(`https://bill-management-server-five.vercel.app/bills/my-bills?email=${user.email}`)
        .then((res) => {
          setMyBills(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    // }
  }, [user.email,setLoading]);

  // Download Report as pdf
 const handleDownloadReport = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("My Bills Report", 14, 22);

  // Prepare table columns and data
  const tableColumn = ["Username", "Email", "Amount (৳)", "Address", "Phone", "Date"];
  const tableRows = [];

  myBills.forEach(bill => {
    const billData = [
      bill.username,
      bill.email,
      bill.amount,
      bill.address,
      bill.phone,
      bill.date
    ];
    tableRows.push(billData);
  });

  // Add AutoTable
  doc.autoTable({
    startY: 30,
    head: [tableColumn],
    body: tableRows,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [22, 160, 133] }
  });

  // Footer with total bills and total amount
  const finalY = doc.lastAutoTable.finalY || 30;
  doc.setFontSize(12);
  doc.text(`Total Bill Paid: ${myBills.length}`, 14, finalY + 10);
  doc.text(`Total Amount: ৳${totalAmount.toLocaleString()}`, 14, finalY + 18);

  // Save the PDF
  doc.save("my_bills_report.pdf");
};

  // Handle Update
  const handleEdit = (bill) => {
    setEditBill(bill);
    setShowEditModal(true);
  };

  const handleUpdateBill = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put(`https://bill-management-server-five.vercel.app/bills/${editBill._id}`, editBill)
      .then(res => {
        setMyBills(myBills.map(b => b._id === editBill._id ? editBill : b));
        setShowEditModal(false);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // Handle Delete
  const handleDelete = (billId) => {
    setDeleteBillId(billId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setLoading(true);
    axios.delete(`https://bill-management-server-five.vercel.app/bills/${deleteBillId}`)
      .then(res => {
        setMyBills(myBills.filter(b => b._id !== deleteBillId));
        setShowDeleteModal(false);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="w-[60vw] mx-auto my-5 p-3 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-3">My Pay Bills</h2>
      
      <div className="mb-4 flex justify-between items-center">
        <div>
          <span className="font-bold">Total Bill Paid:</span> {totalBills}<br />
          <span className="font-bold">Total Amount:</span> ৳{totalAmount.toLocaleString()}
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleDownloadReport}
        >
          Download Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">Username</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">Amount</th>
              <th className="px-3 py-2 border">Address</th>
              <th className="px-3 py-2 border">Phone</th>
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBills.map((bill) => (
              <tr key={bill._id}>
                <td className="px-3 py-2 border">{bill.username}</td>
                <td className="px-3 py-2 border">{bill.email}</td>
                <td className="px-3 py-2 border">৳{bill.amount}</td>
                <td className="px-3 py-2 border">{bill.address}</td>
                <td className="px-3 py-2 border">{bill.phone}</td>
                <td className="px-3 py-2 border">{bill.date}</td>
                <td className="px-3 py-2 border flex gap-2">
                  <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(bill)}>Update</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(bill._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {myBills.length === 0 && <div className="text-gray-600 my-4">No bills found.</div>}
      </div>

      {/* Update Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-40">
          <form onSubmit={handleUpdateBill} className="bg-white p-6 rounded shadow-md space-y-3 min-w-[300px]">
            <h3 className="text-lg mb-3 font-semibold">Update Bill</h3>
            <input
              type="number"
              required
              className="w-full p-2 border rounded"
              value={editBill.amount}
              onChange={e => setEditBill({ ...editBill, amount: e.target.value })}
              placeholder="Amount"
            />
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={editBill.address}
              onChange={e => setEditBill({ ...editBill, address: e.target.value })}
              placeholder="Address"
            />
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={editBill.phone}
              onChange={e => setEditBill({ ...editBill, phone: e.target.value })}
              placeholder="Phone"
            />
            <input
              type="date"
              required
              className="w-full p-2 border rounded"
              value={editBill.date}
              onChange={e => setEditBill({ ...editBill, date: e.target.value })}
              placeholder="Date"
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Update</button>
              <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-40">
          <div className="bg-white p-6 rounded shadow-md min-w-[250px]">
            <h3 className="mb-4 font-semibold">Confirm Delete?</h3>
            <p className="mb-6 text-gray-600">Are you sure you want to permanently delete this bill?</p>
            <div className="flex gap-2">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <div className="mt-4 text-blue-800">Loading...</div>}
    </div>
  );
};

export default MyBills;
