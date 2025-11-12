import React from "react";
import {
    FaBolt,
    FaFire,
    FaWifi,
    FaTint,
    FaUserGraduate,
    FaPlane,
    FaUniversity,
    FaCreditCard,
    FaPhone,
    FaRoad,
} from "react-icons/fa";

const categories = [
    { id: 1, name: "Electricity", icon: <FaBolt /> },
    { id: 2, name: "Gas", icon: <FaFire /> },
    { id: 3, name: "Internet", icon: <FaWifi /> },
    { id: 4, name: "Water", icon: <FaTint /> },
    { id: 5, name: "Education Fee", icon: <FaUserGraduate /> },
    { id: 6, name: "Aeroplane", icon: <FaPlane /> },
    { id: 7, name: "Govt. Fee", icon: <FaUniversity /> },
    { id: 8, name: "Credit Card", icon: <FaCreditCard /> },
    { id: 9, name: "Telephone", icon: <FaPhone /> },
    { id: 10, name: "Toll Fee", icon: <FaRoad /> },
];

const Category = () => {
    return (
        <section className="py-12 bg-white w-[90vw] mx-auto ">
            <div className="container  mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Choose a Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
                    {
                        categories.map((cat) => (
                            <div key={cat.id} className="w-36 h-36 flex flex-col items-center justify-center bg-gray-50  shadow-md rounded-2xl hover:shadow-xl transition-transform hover:scale-105 cursor-pointer">
                                <div className={`text-4xl ${cat.color} w-16 h-16 flex items-center justify-center rounded-full mb-3`}>
                                    {cat.icon}
                                </div>
                                <h3 className="text-lg font-semibold">{cat.name}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Category;
