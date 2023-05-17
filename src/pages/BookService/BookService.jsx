// import React from 'react';

import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const BookService = () => {
    const service = useLoaderData();
    console.log(service);
    const { user } = useContext(AuthContext);
    console.log(user);

    const { _id, title, price, img } = service;

    const handleBookService = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        // const email = form.email.value;
        const email = user?.email;

        const booking = {
            customerName: name, // make mew propNm;
            email, // keep current name;
            date,
            img,
            services: title,
            service_id: _id,
            // price: price,
            price,
        };
        console.log(booking);

        fetch("https://car-doctor-server-mocha-theta.vercel.app/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(booking),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert("service book successful!");
                }
            })
    };

    return (
        <div>
            <h2>Book service: {title}</h2>

            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                <form onSubmit={handleBookService} action="">
                    <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} placeholder="name" name="name" className="input input-bbookinged" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bbookinged" />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" defaultValue={user?.email} name="email" placeholder="email" className="input input-bbookinged" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due amount</span>
                            </label>
                            <input type="text" defaultValue={"$" + price} placeholder="password" className="input input-bbookinged" />

                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn bg-orange-600" value="booking Confirm" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookService;