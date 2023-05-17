// import React from 'react';

const BookingsRow = ({ booking, handleDelete, handleBookingConfirm }) => {

    const { _id, price, img, date, services, status } = booking;

    // const handleDelete = (_id) => {
    //     const proceed = confirm("Are you sure you want to delete?");
    //     if (proceed) {
    //         fetch(`https://car-doctor-server-mocha-theta.vercel.app/bookings/${_id}`, {
    //             method: "DELETE",
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 if (data.deletedCount) {
    //                     alert("deleted successful!")
    //                 }
    //             })
    //     }
    // };

    return (
        <>
            <tr>
                <th>
                    <button onClick={() => handleDelete(_id)} className="btn btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </th>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                {
                                    img && <img src={img} alt="Avatar Tailwind CSS Component" />
                                }
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">Hart Hagerty</div>
                            <div className="text-sm opacity-50">United States</div>
                        </div>
                    </div>
                </td>
                <td>
                    {services}
                </td>
                <td>{date}</td>
                {/* <td>{email}</td> */}
                <td>${price}</td>
                <th>
                    {
                        status === "confirm" // we can check with only status ? .. : ..
                            ? <span className='font-bold text-primary'>confirmed</span>
                            : <button onClick={() => handleBookingConfirm(_id)} className="btn btn-ghost btn-xs">please confirm</button>
                    }
                </th>
            </tr>
        </>
    );
};

export default BookingsRow;