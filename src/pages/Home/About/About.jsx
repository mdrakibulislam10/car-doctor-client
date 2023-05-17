// import React from 'react';
import person from "../../../assets/images/about_us/person.jpg";
import parts from "../../../assets/images/about_us/parts.jpg";

const About = () => {
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="lg:w-1/2 relative">
                        <img src={person} className="w-3/4 rounded-lg shadow-2xl" />
                        <img src={parts} className="w-1/2 rounded-lg shadow-2xl absolute left-1/3 border-8 border-white-600 top-1/2" />
                    </div>
                    <div className="lg:w-1/2">
                        <h1 className="text-2xl font-bold text-[#FF3811]">About Us</h1>
                        <h3 className="text-5xl font-bold mt-5">We are qualified <br /> & of experience <br /> in this field</h3>
                        <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                        <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                        <button className="btn bg-[#FF3811] mt-5">Get More Info</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;