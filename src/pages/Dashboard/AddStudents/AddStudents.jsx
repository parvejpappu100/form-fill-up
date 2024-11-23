import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddStudents = () => {

    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [isDisable, setIsDisable] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const [selectedSemester, setSelectedSemester] = useState('');

    const handleSemesterChange = event => {
        setSelectedSemester(event.target.value);
    }
    const [selectedShift, setSelectedShift] = useState('');

    const handleShiftChange = event => {
        setSelectedShift(event.target.value);
    }
    const [selectedSection, setSelectedSection] = useState('');

    const handleSectionChange = event => {
        setSelectedSection(event.target.value);
    };


    const onSubmit = (data, event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", data.image[0]);
        setIsDisable(true);

        fetch(image_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const newStudent = { 
                        name: data.name,
                        board_roll: data.roll,
                        registration: data.registration,
                        image: imgURL,
                        semester: selectedSemester,
                        shift:selectedShift,
                        section: selectedSection,
                        phone: data.phone,
                        father_name: data.father_name,
                        mother_name: data.mother_name,
                        session: data.session,
                        regulation: data.regulation,
                        examinee_type: "Regular",
                        department: "Computer Science and Technology",
                        technology_code: "85"
                    };
                    axiosSecure.post("/addStudent", newStudent)
                        .then(data => {
                            if (data.data.insertedId) {
                                reset();
                                setIsDisable(false);
                                navigate("/allStudents")
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Slider added !',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            else {
                                setIsDisable(false);
                            }
                        })
                }
                else {
                    setIsDisable(false);
                }
            })

    }


    return (
        <div className='max-w-[1200px] mx-auto px-4 my-32 bg-white'>
            <div className='border mt-32 shadow-sm'>
                <div className="hero w-full">
                    <div className="hero-content w-full">
                        <div className="card flex-shrink-0 w-full">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <h3 className='text-xl text-center md:text-2xl lg:text-4xl font-semibold border-b mb-3'>Add Students</h3>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Name</span>
                                        </label>
                                        <input type="text"  {...register("name", { required: true })} placeholder="Name..." className="input input-bordered bg-white " />
                                        {errors.Name && <span className='text-red-600'>Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Father's Name</span>
                                        </label>
                                        <input type="text"  {...register("father_name", { required: true })} placeholder="Father's Name..." className="input input-bordered bg-white " />
                                        {errors.father_name && <span className='text-red-600'>Father's Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Mother's Name</span>
                                        </label>
                                        <input type="text"  {...register("mother_name", { required: true })} placeholder="Mother's Name..." className="input input-bordered bg-white " />
                                        {errors.mother_name && <span className='text-red-600'>Mother's Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Board Roll</span>
                                        </label>
                                        <input type="text"  {...register("roll", { required: true })} placeholder="Board Roll..." className="input input-bordered bg-white " />
                                        {errors.roll && <span className='text-red-600'>Board Roll is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold"> Registration</span>
                                        </label>
                                        <input type="text"  {...register("registration", { required: true })} placeholder=" Registration" className="input input-bordered bg-white " />
                                        {errors.offline && <span className='text-red-600'> registration is required</span>}
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-xl font-medium">Semester<sup className='text-red-600'>*</sup></span>
                                        </label>
                                        <select required className="select  w-full border border-gray-300 bg-white text-black" value={selectedSemester} onChange={handleSemesterChange}>
                                            <option disabled value="">Select Semester</option>
                                            <option value="2nd">Second</option>
                                            <option value="4th">Four</option>
                                            <option value="6th">Six</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Session</span>
                                        </label>
                                        <input type="text"  {...register("session", { required: true })} placeholder="Session..." className="input input-bordered bg-white " />
                                        {errors.session && <span className='text-red-600'>Session is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Regulation</span>
                                        </label>
                                        <input type="text"  {...register("regulation", { required: true })} placeholder="regulation..." className="input input-bordered bg-white " />
                                        {errors.regulation && <span className='text-red-600'>regulation is required</span>}
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-xl font-medium">Section<sup className='text-red-600'>*</sup></span>
                                        </label>
                                        <select required className="select  w-full border border-gray-300 bg-white text-black" value={selectedSection} onChange={handleSectionChange}>
                                            <option disabled value="">Select Section</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                        </select>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-xl font-medium">Shift<sup className='text-red-600'>*</sup></span>
                                        </label>
                                        <select required className="select  w-full border border-gray-300 bg-white text-black" value={selectedShift} onChange={handleShiftChange}>
                                            <option disabled value="">Shift</option>
                                            <option value="Morning">Morning</option>
                                            <option value="Day">Day</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Phone Number</span>
                                        </label>
                                        <input type="text"  {...register("phone", { required: true })} placeholder="Phone Number " className="input input-bordered bg-white " />
                                        {errors.phone && <span className='text-red-600'>Phone Number is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text"> Photo</span>
                                        </label>
                                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full f" />
                                        {errors.image && <span className='text-red-600'>Image is required</span>}
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <input disabled={isDisable} className='bg-[#1460AB] text-white font-semibold py-3 rounded cursor-pointer hover:bg-[#1460AB]
                                     duration-700 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-400' type="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStudents;