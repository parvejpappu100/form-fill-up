import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';


const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const UpdateStudent = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [isDisable, setIsDisable] = useState(false);

    const { data: students = [], refetch } = useQuery(["students"], async () => {
        const res = await axiosSecure("/students");
        return res.data;
    });

    const { id } = useParams();

    const student = students.find(student => student._id == id);
    console.log(student)

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
                    const updateStudent = {
                        name: data.name ? data.name : student.name,
                        father_name: data.father_name ? data.father_name : student.father_name,
                        mother_name: data.mother_name ? data.mother_name : student.mother_name,
                        board_roll: data.roll ? data.roll : student.board_roll,
                        registration: data.registration ? data.registration : student.registration,
                        semester: selectedSemester ? selectedSemester : student.semester,
                        session: data.session ? data.session : student.session,
                        regulation: data.regulation ? data.regulation : student.regulation,
                        section: selectedSection ? selectedSection : student.section,
                        shift: selectedShift ? selectedShift : student.shift,
                        phone: data.phone ? data.phone : student.phone,
                        image: imgURL ? imgURL : student.image
                    };

                    axiosSecure.put(`/updateStudent/${id}`, updateStudent)
                        .then(data => {
                            if (data.data.modifiedCount > 0) {
                                refetch();
                                setIsDisable(false);
                                navigate(`/studentDetails/:${id}`);
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Update successfully !',
                                    showConfirmButton: false,
                                    timer: 1000
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
                                <h3 className='text-xl text-center md:text-2xl lg:text-4xl font-semibold border-b mb-3'>Update Student</h3>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Name</span>
                                        </label>
                                        <input type="text" defaultValue={student?.name}  {...register("name", )} placeholder="Name..." className="input input-bordered bg-white " />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Father's Name</span>
                                        </label>
                                        <input type="text" defaultValue={student?.father_name}  {...register("father_name", )} placeholder="Father's Name..." className="input input-bordered bg-white " />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Mother's Name</span>
                                        </label>
                                        <input type="text" defaultValue={student?.mother_name}  {...register("mother_name", )} placeholder="Mother's Name..." className="input input-bordered bg-white " />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Board Roll</span>
                                        </label>
                                        <input type="text" defaultValue={student?.board_roll}  {...register("roll", )} placeholder="Board Roll..." className="input input-bordered bg-white " />
                                        
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold"> Registration</span>
                                        </label>
                                        <input type="text" defaultValue={student?.registration}  {...register("registration", )} placeholder=" Registration" className="input input-bordered bg-white " />
                                        
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-xl font-medium">Semester<sup className='text-red-600'>*</sup></span>
                                        </label>
                                        <select  className="select  w-full border border-gray-300 bg-white text-black" value={selectedSemester} onChange={handleSemesterChange}>
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
                                        <input type="text" defaultValue={student?.session}  {...register("session", )} placeholder="Session..." className="input input-bordered bg-white " />
                                       
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Regulation</span>
                                        </label>
                                        <input type="text" defaultValue={student?.regulation}  {...register("regulation", )} placeholder="regulation..." className="input input-bordered bg-white " />
                                        
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-xl font-medium">Section<sup className='text-red-600'>*</sup></span>
                                        </label>
                                        <select  className="select  w-full border border-gray-300 bg-white text-black" value={selectedSection} onChange={handleSectionChange}>
                                            <option disabled value="">Select Section</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                        </select>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-xl font-medium">Shift<sup className='text-red-600'>*</sup></span>
                                        </label>
                                        <select  className="select  w-full border border-gray-300 bg-white text-black" value={selectedShift} onChange={handleShiftChange}>
                                            <option disabled value="">Shift</option>
                                            <option value="Morning">Morning</option>
                                            <option value="Day">Day</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black text-xl font-semibold">Phone Number</span>
                                        </label>
                                        <input type="text" defaultValue={student?.phone}  {...register("phone", )} placeholder="Phone Number " className="input input-bordered bg-white " />
                                        
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text"> Photo</span>
                                        </label>
                                        <input type="file" {...register("image")} className="file-input file-input-bordered w-full f" />
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <input disabled={isDisable} className='bg-[#1460AB] text-white font-semibold py-3 rounded cursor-pointer hover:bg-[#1460AB]
                                 duration-700 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-400' type="submit" value="Update" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStudent;