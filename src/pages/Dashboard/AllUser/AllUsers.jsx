import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';

const AllUsers = () => {

    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await axiosSecure("/users");
        return res.data;
    });

    const handleMakeAdmin = (user) => {
        const updatedRole = { role: "admin" };
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
                axiosSecure.put(`/users/${user._id}`, updatedRole)
                    .then(data => {
                        if (data.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Success!',
                                `${user.name} is Admin Now `,
                                'success'
                            )
                        }
                    })
            }
        })

    };

    const handleMakeUser = (user) => {
        const updatedRole = { role: "user" };
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
                axiosSecure.put(`/users/${user._id}`, updatedRole)
                    .then(data => {
                        if (data.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Success!',
                                `${user.name} is only user Now `,
                                'success'
                            )
                        }
                    })
            }
        })

    };

    const handleDeleteUser = (user) => {
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
                axiosSecure.delete(`/users/${user._id}`)
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
        <div>
            <div className='max-w-[1120px] mx-auto my-24 px-4'>
                <h3 className='text-2xl font-semibold'>Total Users : {users?.length}</h3>
                <div className="overflow-x-auto w-full  mt-12">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='bg-[#1460AB] text-white text-xl'> # </th>
                                <th className='bg-[#1460AB] text-white text-xl'> Image</th>
                                <th className='bg-[#1460AB] text-white text-xl'>Name</th>
                                <th className='bg-[#1460AB] text-white text-xl'>Email</th>
                                <th className='bg-[#1460AB] text-white text-xl'>Role</th>
                                <th className='bg-[#1460AB] text-white text-xl'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr
                                    key={user._id}
                                >
                                    <td>
                                        <h3 className='text-2xl font-bold'>{index + 1}</h3>
                                    </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h4>{user.name}</h4>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        <div className='flex gap-5 items-center'>
                                            <div>
                                                {
                                                    user.role === "admin" ? "Admin" : <button onClick={() => handleMakeAdmin(user)} className="btn normal-case btn-xs text-[12px]">
                                                        Make Admin
                                                    </button>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    user.role === "user" ? "User" : <button onClick={() => handleMakeUser(user)} className="btn normal-case btn-xs text-[12px]">
                                                        Make User
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn bg-red-700 duration-500 text-white hover:text-black border-none h-10 w-10 btn-xs">
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;