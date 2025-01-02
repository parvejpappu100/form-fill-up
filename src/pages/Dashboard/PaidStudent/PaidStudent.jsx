import React from 'react';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaidStudent = () => {


    const [axiosSecure] = useAxiosSecure();

    const { data: students = [], refetch } = useQuery(["payment-data"], async () => {
        const res = await axiosSecure("/payment-data");
        return res.data;
    });

    

    // const fullData = allStudents.filter(st => st.board_roll == students.find(s => s.board_roll));
    // console.log(fullData)

    return (
        <div className='max-w-[1200px] mx-auto px-4 my-32 bg-white'>
            <h3 className='text-4xl font-bold'>All Students : {students.length }</h3>
        </div>
    );
};

export default PaidStudent;