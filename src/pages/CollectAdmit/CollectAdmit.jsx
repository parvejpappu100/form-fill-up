import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { useReactToPrint } from "react-to-print";
import dip from '../../assets/images/dip.png'
import t from '../../assets/images/t.png'

const CollectAdmit = () => {

    const searchRef = useRef("fldkdsl");
    const ref = useRef();
    const [admitCard, setAdmitCard] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [allStudents, setAllStudents] = useState([]);

    const [axiosSecure] = useAxiosSecure();

    const { data: students = [], refetch } = useQuery(["payment-data"], async () => {
        const res = await axiosSecure("/payment-data");
        return res.data;
    });

    const student = students?.find(st => st.board_roll == search);
    const contentRef = useRef(ref);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const handleSearch = () => {
        const value = searchRef.current.value;
        setSearch(value);

    };

    useEffect(() => {
        fetch('http://localhost:5000/students')
            .then(res => res.json())
            .then(data => setAllStudents(data))
    }, []);

    const adCard = allStudents?.find(st => st.board_roll == student?.board_roll);

    return (
        <div>
            <div className=' bg-[#F2F2F2] py-32 px-4'>
                <div className='text-center my-8 px-2 bg-[#FF5E6A] py-2 md:py-4 max-w-4xl mx-auto rounded'>
                    <p className='text-[14px] md:text-xl text-center font-semibold text-white'>রেজিষ্ট্রশন শেষ করার পরে আপনার বোর্ড রোল দিয়ে সার্চ করুন। </p>
                </div>
                <div className="form-control">
                    <div className="input-group flex  justify-center items-center">
                        <input ref={searchRef} type="text" placeholder="Your phone number..." className="input input-bordered rounded-none bg-white " />
                        <button onClick={handleSearch} className="btn btn-square bg-black text-white hover:bg-gray-700 hover:text-white
                        rounded-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
                {error && <div>
                    <p className='text-red-600 mt-4 font-semibold text-center px-4 text-[12px] md:text-2xl'>{error}</p>
                </div>}
                <div className='my-32 px-4 max-w-[1120px] mx-auto'>

                    {adCard && <div className='my-12' >
                        <div className='text-center   max-w-4xl mx-auto rounded'>
                            <p className='text-[14px] md:text-xl text-center font-semibold'>ডাউনলোড অথবা প্রিন্ট করার জন্য নিচের বাটনে ক্লিক করুন </p>
                        </div>
                        <div className='my-8 text-center'>
                            <button className='btn shadow bg-[#1460AB] text-white font-semibold' onClick={() => reactToPrintFn()}>Print or Download</button>

                        </div>
                        <div className='hidden lg:block'>
                            <div ref={contentRef} className='bg-white max-w-4xl mx-auto py-12 px-8  '>
                                <div className='border border-black p-5 relative'>
                                    <div className={adCard.image ? "flex gap-3" : ""}>
                                        {
                                            adCard.image && <img className='w-[180px] h-[180px]' src={adCard.image} alt="" />
                                        }
                                        <div className='flex items-center flex-row-reverse gap-5'>
                                            <div className='text-center'>
                                                <h3 className='text-2xl font-semibold text-center my-3'>Bangladesh Technical Education Board, Dhaka</h3>
                                                <h3 className='text-xl font-semibold text-center my-1'>Dhaka Polytechnic Institute</h3>
                                                <h3 className='text-xl font-semibold text-center my-1'>Tejgoan, Dhaka-1208</h3>
                                                <p className='text-center font-semibold'>Phone: 58151880</p>
                                                <h3 className='my-8 text-xl font-semibold text-center underline'>Student Information</h3>
                                                {
                                                    adCard.round && <p className='text-xl font-semibold'>{adCard.round == "Division" ? "Divisional" : adCard.round} Round Admit Card</p>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-16'>
                                        <pre>
                                            <p className='text-xl'>Name          :       <span>{adCard?.name || "xxx"}</span></p>
                                            <p className='text-xl mt-3'>Father's Name :       <span>{adCard?.father_name || "xxx"}</span></p>
                                            <p className='text-xl mt-3'>Mother's Name :       <span>{adCard?.mother_name || "xxx"}</span></p>
                                            <p className='text-xl my-4'>Semester      :       <span>{adCard?.semester || "xxx"}</span></p>
                                            <p className='text-xl my-4'>Session       :       <span>{adCard?.session || "xxx"}</span></p>
                                            <p className='text-xl my-4'>Regulation    :       <span>{adCard?.regulation || "xxx"}</span></p>
                                           
                                            <p className='text-xl my-4'>Registration  :       <span>{adCard?.registration || "xxx"}</span></p>
                                            <p className='text-xl my-4'>Department    :       <span>{adCard?.department || "xxx"}</span></p>
                                        </pre>
                                    </div>
                                    <div className=' flex flex-row-reverse justify-between items-center max-w-2xl mx-auto'>
                                        <div className=''>
                                            <img className='mb-2' src={t} alt="" />
                                            <div className='border-t mb-2 border-dotted'>
                                                <p className='font-bold text-center'>MD. Tonmoy Islam</p>
                                                <p className=' text-center'>Exam Controller</p>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <img className='w-[100px] mt-4' src={dip} alt="" />
                                            <div className='border-t border-dotted mt-2'>
                                                <p className='font-bold text-center'>Mahbub Rahman</p>
                                                <p className=' text-center'>Principal of DPI</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-10 border-t border-dotted'>
                                        <p className='font-semibold'>General Instructions for applicants:</p>

                                        <div>
                                            <p>1.Carry a printed copy of your admit card.</p>
                                            <p>2.Don't carry any unauthorized materials.</p>
                                            <p>3.Late Comers will not be allowed to sit in the examination hall.</p>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    );
};

export default CollectAdmit;