import React from 'react';
import logo from "../../assets/images/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const navOptions = <>
        <li> <Link>Payment</Link> </li>
        <li> <Link>Collect Admit</Link> </li>
    </>

    return (
        <div className='bg-[#1460AB] text-white'>
            <div className="navbar max-w-[1200px] mx-auto px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>
                    </div>
                    <div className='flex items-center gap-4'>
                        <img className='w-16' src={logo} alt="" />
                        <a className=" text-xl">Dhaka Polytechnic Institute</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl ">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end text-xl">
                    <Link className="">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;