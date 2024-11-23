import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {

    const { singIn, restPassword } = useAuth();
    const [logInError, setLogInError] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, event) => {
        event.preventDefault();
        const email = data.email;
        setUserEmail(email)
        const password = data.password;
        singIn(email, password)
            .then(result => {
                const user = result.user;
                setLogInError("")
                navigate("/payment");
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'User Login Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                setUserEmail("")
            })
            .catch(error => {
                setLogInError(error.message)
            })
    };

    const handleRestPassword = (event) => {
        const email = userEmail;
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please provide a email!'
            })
            return;
        }
        restPassword(email)
            .then(() => {
                Swal.fire('Check your email !')
            })
            .catch(() => {

            })
    }

    return (
        <div>
            <div className='my-16 bg-white max-w-2xl mx-auto'>
                <div className="hero w-full">
                    <div className="hero-content w-full">
                        <div className="card flex-shrink-0 w-full">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <h3 className='text-4xl font-semibold border-b mb-3'>Login</h3>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input name='email' type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered " />
                                    {errors.email && <span className='text-red-600'>Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password", { required: true })} placeholder="Password" className="input input-bordered " />
                                    {
                                        userEmail && <label className="label">
                                            <a onClick={handleRestPassword} className="label-text-alt text-red-600 link link-hover">Forgot password?</a>
                                        </label>
                                    }
                                    {errors.password && <span className='text-red-600'>Password is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <input className='bg-[#1460AB] text-white font-semibold py-3 rounded cursor-pointer hover:bg-[#ED1D24] duration-700' type="submit" value="Login" />
                                </div>
                            </form>
                            <p className="text-red-400 text-center mb-2 font-semibold">{logInError}</p>
                            <p className='text-center font-semibold'>Don't have an account? <Link to="/singUp" className='text-[#113366]'> Register Now!</Link></p>
                        </div>
                    </div>
                </div>
                <div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;