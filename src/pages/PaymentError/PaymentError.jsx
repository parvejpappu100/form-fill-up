import React from 'react';

const PaymentError = () => {

    const searchData = new URLSearchParams(window.location.search)
    const message = searchData.get('message')

    return (
        <div className='max-w-xl mx-auto my-32 px-4 shadow py-12 bg-red-500 text-white rounded-md text-center'>
            <h2 className='text-3xl font-bold mb-4'>Payment Unsuccessful</h2>
            <p className='text-xl font-semibold'>{message}</p>
        </div>
    );
};

export default PaymentError;