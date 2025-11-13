import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router';

const AllBillsPage = () => {
  const { allBills, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading recent bills...</div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-secondary w-[90vw] mx-auto mb-30 rounded-lg shadow-2xl">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">All Bills Here <p className='text-lg text-gray-500'>Total ({allBills.length})</p></h2>

        {allBills.length === 0 ? (
          <p className="text-center text-gray-500">No bills found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
            {allBills.map((bill) => (
              <div
                key={bill._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col  p-4"
              >
                <img
                  src={bill.image}
                  alt={bill.title}
                  className="h-42 object-cover border"
                />
                <div className="p-4 ">
                  <h3 className="text-[16px] font-semibold mb-1 dark:text-gray-900">{bill.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-500">
                    <strong>Category:</strong> {bill.category}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-500">
                    <strong>Location:</strong> {bill.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-500">
                    <strong>Date:</strong> {bill.date}
                  </p>
                  <p className="text-sm font-semibold mt-2 text-blue-600">
                    <strong className='text-gray-500 text-lg'>Amount : </strong> {bill.amount} BDT
                  </p>
                  <Link to={`/bills/${bill._id}`}><button className="mt-3 w-full bg-primary text-white py-1 rounded hover:bg-blue-700 transition">
                    See Details
                  </button></Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBillsPage;