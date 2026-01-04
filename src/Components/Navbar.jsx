import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../Context/AuthContext';
import { Link, NavLink } from 'react-router';
import toast from 'react-hot-toast';

const Navbar = () => {

    // CHANGED: Give theme a safe default so it never becomes null on first load.
    // (Your previous code used localStorage.getItem("theme") directly.)
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    const { user, setUser, togl, setTogl, logOut } = useContext(AuthContext);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleToggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    const handleLogout = () => {
        console.log("logout clicked");
        logOut()
            .then(res => {
                setUser(null);
                toast.success("log out successfull");
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message);
            });
    };

    return (
        // CHANGED: wrap navbar in a sticky header container
        <header className="sticky top-0 z-50">
            <div className="navbar glass bg-base-100/40 backdrop-blur-lg border-b border-base-content/10 shadow-sm lg:px-[5vw]">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        {/* CHANGED: dropdown background also glass so it matches navbar */}
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content glass bg-base-100/60 backdrop-blur-lg rounded-box z-50 mt-3 w-52 p-2 shadow"
                        >
                            <NavLink to={"/"}>Home</NavLink>
                            <NavLink to={"bills/all-bills"}>All Bills</NavLink>

                            <NavLink to={"my-profile"}>
                                <li>
                                    <a className="justify-between">
                                        My Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                            </NavLink>

                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Bills</a></li>
                                    <li><a>Add Bill</a></li>
                                </ul>
                                <NavLink onClick={handleLogout}>Logout</NavLink>
                            </li>
                        </ul>
                    </div>

                    <NavLink to={"/"} className="btn btn-ghost text-xl lg:text-2xl font-extrabold">Verdian Bills</NavLink>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4 items-center">
                        <NavLink to={"/"}>Home</NavLink>
                        <NavLink to={"bills/all-bills"}>All Bills</NavLink>

                        <li>
                            <details>
                                <summary>Bills</summary>

                                {/* CHANGED: submenu glass too (also removed bg-primary/text-white) */}
                                <ul className="p-2 w-[150px] glass bg-base-100/70 backdrop-blur-lg flex flex-col gap-2 z-50">
                                    <NavLink to={"bills/add-bills"} className={"hover:bg-base-200 py-2 px-5 rounded-lg"}>
                                        Add Bills
                                    </NavLink>
                                    <NavLink to={"bills/my-bills"} className={"hover:bg-base-200 py-2 px-5 rounded-lg"}>
                                        My Bills
                                    </NavLink>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="user profile picture" src={user.photoURL} />
                                </div>
                            </div>

                            {/* CHANGED: avatar dropdown glass */}
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm max-sm:hidden dropdown-content glass bg-base-100/60 backdrop-blur-lg rounded-box z-50 mt-3 w-52 p-2 shadow"
                            >
                                <li className='flex justify-center items-center'>
                                    <label className="flex cursor-pointer gap-2">
                                        <span className="label-text">Light</span>

                                        {/* CHANGED: Make toggle controlled so UI matches current theme */}
                                        <input
                                            onChange={handleToggleTheme}
                                            type="checkbox"
                                            className="toggle"
                                            checked={theme === "dark"}
                                        />

                                        <span className="label-text">Dark</span>
                                    </label>
                                </li>

                                <li>
                                    <NavLink to="/my-profile">My Profile</NavLink>
                                </li>

                                <li onClick={handleLogout}><a>Logout</a></li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <Link to={"/auth/login"}>
                                <button onClick={() => setTogl(true)} className={`btn btn-primary ${togl ? "bg-white text-black" : ""}`}>
                                    Login
                                </button>
                            </Link>

                            <Link to={"/auth/signup"}>
                                <button onClick={() => setTogl(false)} className={`btn btn-primary ${togl ? "" : "bg-white text-black"}`}>
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Navbar;
