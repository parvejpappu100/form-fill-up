import axios from 'axios';
import React, { useEffect } from 'react';


const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
});

const useAxiosSecure = () => {

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        });

        axiosSecure.interceptors.response.use((response) => response, async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // await logOut();
                // navigate("/login")
            }
            return Promise.reject(error);
        }
        )

    }, [])

    return [axiosSecure];

};

export default useAxiosSecure;