// import React from 'react';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import BookingsRow from "./BookingsRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const url = `https://car-doctor-server-mocha-theta.vercel.app/bookings?email=${user?.email}`;

    useEffect(() => {
        fetch(url, {
            method: "GET", // op;
            headers: {
                authorization: `Bearer ${localStorage.getItem("car-access-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) { // network tab > preview tab > data hisebe ki asteche seta dekhte pabo; time expire houar jonno token ta invalid hoye geche, then, {error:..} obj ta return kortechi seta send korteche arki;
                    setBookings(data)
                }
                else {
                    // logout and navigate // jodi error pay , data na pay arki;
                    navigate("/");
                }
            })
    }, [url, navigate]); // optional;
    // console.log(bookings);

    const handleDelete = (_id) => {
        const proceed = confirm("Are you sure you want to delete?");
        if (proceed) {
            fetch(`https://car-doctor-server-mocha-theta.vercel.app/bookings/${_id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert("deleted successful!");
                        const remaining = bookings.filter(booking => booking._id !== _id);
                        setBookings(remaining);
                    }
                })
        }
    };

    const handleBookingConfirm = (_id) => {
        fetch(`https://car-doctor-server-mocha-theta.vercel.app/bookings/${_id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ status: "confirm" }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) { // .... > 0;
                    // update state; eto kichu korte hoyteche karon reload na dile updated ta pabe nai tai manually set kore diccchi;
                    const remaining = bookings.filter(booking => booking._id !== _id);
                    const updated = bookings.find(booking => booking._id === _id);
                    updated.status = "confirm"; // user reload na dile db te add houa prop pabe na tai set kore dicchi arki jate reload dite na hoy; prop na thakle set hobe ar thakle same value ta e change hobe arki;
                    const newBookings = [updated, ...remaining]; // remaining is arr;
                    setBookings(newBookings);
                }
            })
    };

    return (
        <div>
            <h2>Your bookings: {bookings.length}</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking =>
                                <BookingsRow
                                    booking={booking}
                                    key={booking._id}
                                    handleDelete={handleDelete}
                                    handleBookingConfirm={handleBookingConfirm}
                                />
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;