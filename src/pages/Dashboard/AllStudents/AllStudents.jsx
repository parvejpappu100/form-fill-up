import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import useAdmin from '../../../hooks/useAdmin';

const AllStudents = () => {

    const [axiosSecure] = useAxiosSecure();

    const [, , refetch] = useAdmin();


    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/allStudents?search=${search}`)
            .then(res => res.json())
            .then(data => setStudents(data))
    }, [search]);



    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);

    };

    const handleSecond = () => {
        setSearch("2nd")
    };

    const handleFour = () => {
        setSearch("4th")
    };

    const handleSix = () => {
        setSearch("6th")
    };

    const handleMorning = () => {
        setSearch("Morning")
    };

    const handleDay = () => {
        setSearch("Day")
    };

    const tableRef = useRef(null);

    const handleDeleteAll = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/studentsData`)
                    .then(data => {
                        if (data.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Success!',
                                `Deleted Successful `,
                                'success'
                            )
                        }
                    })
            }
        })
    };

    const handleDeleteStudent = (student) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteStudent/${student._id}`)
                    .then(data => {
                        if (data.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Success!',
                                `Deleted Successful `,
                                'success'
                            )
                        }
                    })
            }
        })
    };

    return (
        <div className='max-w-[1200px] mx-auto px-4 my-32'>
            <div className="form-control mb-12 ">
                <div className="input-group flex  justify-center items-center">
                    <input onChange={handleSearch} type="text" placeholder="Search by Roll or Registration or Name or Phone of Shift or Semester" className="input w-96 input-bordered rounded-none " />
                    <button onClick={handleSearch} className="btn btn-square bg-black text-white hover:bg-gray-700 hover:text-white
                        rounded-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
            <h3 className='text-3xl font-semibold'>All Students: {students.length}</h3>
            <div className='flex justify-between items-center'>
                <DownloadTableExcel
                    filename="students data"
                    sheet="students"
                    currentTableRef={tableRef.current}
                >

                    <button className='btn mt-5  text-xl bg-[#1867FE] hover:bg-[#1867FE] text-white font-semibold'>Export Excel</button>

                </DownloadTableExcel>
                <div>
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="btn m-1 bg-[#1867FE] hover:bg-[#1867FE] text-white">Sort By</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><button onClick={handleSecond}>Second Semester</button></li>
                            <li><button onClick={handleFour}>Four Semester</button></li>
                            <li><button onClick={handleSix}>Six Semester</button></li>
                            <li><button onClick={handleMorning}>Morning Shift</button></li>
                            <li><button onClick={handleDay}>Day Shift</button></li>

                        </ul>
                    </div>
                </div>
                <div className=''>
                    <button disabled={true} onClick={handleDeleteAll} className='btn  text-xl bg-[#1867FE] hover:bg-[#1867FE] text-white font-semibold disabled:cursor-not-allowed'>Delete All</button>
                </div>
            </div>
            <div className="overflow-x-auto w-full  mt-5 bg-white shadow-md p-5">
                <table ref={tableRef} className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='bg-[#1867FE] text-white text-xl '> # </th>
                            <th className='bg-[#1867FE] text-white text-xl '>Name</th>
                            <th className='bg-[#1867FE] text-white text-xl '>Roll</th>
                            <th className='bg-[#1867FE] text-white text-xl '>Registration</th>
                            <th className='bg-[#1867FE] text-white text-xl '>Semester</th>
                            <th className='bg-[#1867FE] text-white text-xl '>Shift</th>
                            <th className='bg-[#1867FE] text-white text-xl '>Session</th>
                            <th className='bg-[#1867FE] text-white text-xl '>Phone</th>
                            <th className='bg-[#1867FE] text-white text-xl '>Details</th>
                            <th className='bg-[#1867FE] text-white text-xl '>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students?.map((student, index) => <tr
                                key={student._id}
                            >
                                <td>
                                    <h3 className='text-2xl font-bold'>{index + 1}</h3>
                                </td>
                                <td>
                                    <h3 className=' font-semibold'>{student.name}</h3>
                                </td>
                                <td>
                                    <h3 className=' font-semibold'>{student.board_roll}</h3>
                                </td>
                                <td>
                                    <h3 className=' font-semibold'>{student.registration}</h3>
                                </td>
                                <td>
                                    <h3 className=' font-semibold'>{student.semester}</h3>
                                </td>
                                <td>
                                    <h3 className=' font-semibold'>{student.shift}</h3>
                                </td>
                                <td>
                                    <h3 className=' font-semibold'>{student.session}</h3>
                                </td>
                                <td>
                                    <h3 className=' font-semibold'>{student.phone}</h3>
                                </td>
                                <td>
                                    <Link to={`/studentDetails/${student?._id}`}><button className='btn'>Details</button></Link>
                                </td>

                                <td>
                                    <button onClick={() => handleDeleteStudent(student)} className="btn bg-red-700 duration-500 text-white hover:text-black border-none h-10 w-10 btn-xs">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllStudents;