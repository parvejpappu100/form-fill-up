import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentData = urlParams.get('payment');

    return (
        <div className='max-w-xl mx-auto my-32 px-4 shadow py-12 bg-green-500 text-white rounded-md text-center'>
            <h2 className='text-3xl font-bold mb-4'>Payment Successful!</h2>
            <p className='text-[16px]'>Thank you for your registration.</p>
            {paymentData && <p>Your TraxId: {paymentData}</p>}
            <Link to={""} className='font-bold underline text-2xl'>Collect your admit card</Link>
        </div>
    );
};

export default PaymentSuccess;