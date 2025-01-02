import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import logo from "../../assets/images/logo.png";

const StudentDetails = () => {

    const [axiosSecure] = useAxiosSecure();
    const { data: students = [], refetch } = useQuery(["students"], async () => {
        const res = await axiosSecure("/students");
        return res.data;
    });


    const { id } = useParams();

    const student = students?.find(student => student._id == id);

    return (
        <div className='max-w-[1000px] mx-auto my-20 px-4'>
            <div className='flex items-center justify-center my-5'>
                <Link to={`/updateStudent/${id}`}>
                    <button className='btn   bg-[#1460AB] hover:bg-[#1460AB] text-white '>Update</button>
                </Link>
            </div>
            <div className='  bg-white p-10 shadow-md'>
                <div className='border border-black'>
                    <div className='flex justify-center items-center'>
                        <img className='w-[100px]' src={logo} alt="" />
                    </div>
                    <h3 className='text-3xl font-semibold text-center my-3'>Bangladesh Technical Education Board, Dhaka</h3>
                    <h3 className='text-3xl font-semibold text-center my-1'>Dhaka Polytechnic Institute</h3>
                    <h3 className='text-xl font-semibold text-center my-1'>Tejgoan, Dhaka-1208</h3>
                    <p className='text-center font-semibold'>Phone: 58151880</p>
                    <h3 className='my-8 text-xl font-semibold text-center underline'>Student Information</h3>
                    <div className='flex justify-center items-center my-16'>
                        <img className='w-[200px]' src={student?.image} alt="" />
                    </div>
                    <div className='px-12'>
                        <pre>
                            <p className='text-xl'>Name          :       <span>{student?.name || "xxx"}</span></p>
                            <p className='text-xl mt-3'>Father's Name :       <span>{student?.father_name || "xxx"}</span></p>
                            <p className='text-xl mt-3'>Mother's Name :       <span>{student?.mother_name || "xxx"}</span></p>
                            <p className='text-xl my-4'>Semester      :       <span>{student?.semester || "xxx"}</span></p>
                            <p className='text-xl my-4'>Session       :       <span>{student?.session || "xxx"}</span></p>
                            <p className='text-xl my-4'>Regulation    :       <span>{student?.regulation || "xxx"}</span></p>
                            <p className='text-xl my-4'>Shift         :       <span>{student?.shift || "xxx"}</span></p>
                            <p className='text-xl my-4'>Examinee_type :       <span>{student?.examinee_type || "xxx"}</span></p>
                            <p className='text-xl my-4'>Registration  :       <span>{student?.registration || "xxx"}</span></p>
                            <p className='text-xl my-4'>Department    :       <span>{student?.department || "xxx"}</span></p>
                            <p className='text-xl my-4'>Mobile        :       <span>{student?.phone || "xxx"}</span></p>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;