// import React from 'react';

import { Link } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import SocialLogin from "../Shared/Footer/SocialLogin/SocialLogin";

const SignUp = () => {
    const { createUser } = useContext(AuthContext);

    const handleSignUp = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(err => console.log(err.message))
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2 mr-12">
                        <img className="" src={img} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <h1 className="text-5xl font-bold">Sign Up!</h1>

                        <div className="card-body">
                            <form onSubmit={handleSignUp} action="">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input name="password" type="password" placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Sign Up" />
                                </div>
                            </form>

                            <p className="my-4 text-center">
                                Already have an account? <Link className="text-orange-600" to={"/login"}>
                                    Login
                                </Link>
                            </p>

                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;