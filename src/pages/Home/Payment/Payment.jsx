import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Home = () => {

    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [isDisable, setIsDisable] = useState(false);

    const searchRef = useRef("fldkdsl");
    const ref = useRef();
    const [search, setSearch] = useState("fpldsafjk");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const [students, setStudent] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:5000/search-student?search=${search ? search : "not found"}`)
            .then(res => res.json())
            .then(data => setStudent(data))
    }, [search]);
    console.log(students)

    const handleSearch = () => {
        const value = searchRef.current.value;
        setSearch(value);
    };


    const handlePayment = async () => {


        const studentData = {
            name: students[0]?.name,
            board_roll: students[0]?.board_roll,
            registration: students[0]?.registration,
            image: students[0]?.image,
            semester: students[0]?.semester,
            shift: students[0]?.shift,
            section: students[0]?.section,
            phone: students[0]?.phone,
            father_name: students[0]?.father_name,
            mother_name: students[0]?.mother_name,
            session: students[0]?.session,
            regulation: students[0]?.regulation,
            examinee_type: students[0]?.examinee_type,
            department: students[0]?.department,
            technology_code: "85"
        };

        await axios.post("http://localhost:5000/api/store-student-data", { studentData }, { withCredentials: true });
        const { data } = await axios.post("http://localhost:5000/api/bkash/payment/create", {
            amount: 2400,
        }, { withCredentials: true });
        window.location.href = data.bkashURL;
        setIsDisable(false);


    };


    return (
        <div className='max-w-[1200px] mx-auto px-4 my-8 bg-[#dee3e9] p-4 lg:p-12 rounded-md '>
            <h3 className='text-2xl font-semibold text-center border-b-2 border-gray-300'>Fee Collection</h3>
            <p className='text-red-600 font-semibold my-5'>**পেমেন্ট সফল হলে কোন প্রকার সংশোধন গ্রহনযোগ্য নয়। প্রদর্শিত টাকার পরিমাণে অসামাঞ্জস্য থাকলে এবং আপনার পরিশোধকৃত টাকা কম/বেশি মনে হলে কলেজ কর্তৃপক্ষের সাথে যোগাযোগ করুন।**</p>

            <div className="form-control py-16">
                <div className="input-group flex gap-7">
                    <label className="label   font-semibold">
                        <span className=" text-2xl"> Board Roll:</span>
                    </label>
                    <input ref={searchRef} type="text" placeholder="Your board roll..." className="input input-bordered rounded-none bg-white " />
                    <button onClick={handleSearch} className="btn btn-square bg-[#1460AB] text-white hover:bg-[#1460AB] hover:text-white
                        rounded-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
                <div className='px-4'>
                    {
                        students?.map(student => <div className='mt-10' key={student._id}>
                            <pre>
                                <p className='text-xl'>Name          :       <span className='border border-black bg-white px-5 py-1'>{student?.name || "xxx"}</span></p>
                                <p className='text-xl my-4'>Semester      :       <span className='border border-black bg-white px-5 py-1'>{student?.semester || "xxx"}</span></p>
                                <p className='text-xl my-4'>Session       :       <span className='border border-black bg-white px-5 py-1'>{student?.session || "xxx"}</span></p>
                                <p className='text-xl my-4'>Registration  :       <span className='border border-black bg-white px-5 py-1'>{student?.registration || "xxx"}</span></p>
                                <p className='text-xl my-4'>Department    :       <span className='border border-black bg-white px-5 py-1'>{student?.department || "xxx"}</span></p>
                                <p className='text-xl my-4'>Amount In BDT :       <span className='border border-black bg-white px-5 py-1'>2400.00</span></p>
                                <p className='text-xl my-4'>Mobile        :       <span className='border border-black bg-white px-5 py-1'>{student?.phone || "xxx"}</span></p>
                            </pre>
                            <button onClick={handlePayment} className='btn bg-[#1460AB] hover:bg-[#1460AB] text-white w-full'>Pay With Bkash</button>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;