// import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import SocialLogin from "../Shared/Footer/SocialLogin/SocialLogin";

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);

    const from = location.state?.from?.pathname || "/";
    // console.log(from);

    const handleLogin = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // navigate(from, { replace: true });
                navigate(from, { replace: true }); // login korar por private page er access dibo na, token ta jodi pai tahole access dibo;

                // jwt
                // const loggedUser = { // sudhu email pathabo tai email nichi;
                //     email: user.email,
                // };
                // console.log(loggedUser);

                // fetch("https://car-doctor-server-mocha-theta.vercel.app/jwt", {
                //     method: "POST", // user er data jeomn, emial obj er moddhe rekhe server e pathabo tai post operation korte hobe;
                //     headers: {
                //         "content-type": "application/json",
                //     },
                //     body: JSON.stringify(loggedUser) // token pathnor jonno user er data server e lagbe arki;
                // })
                //     .then(res => res.json()) // token is string so json e convert kora jabe na tai eta na dite pari othoba server theke obj baniye send korte hobe;
                //     .then(data => {
                //         console.log(data);
                //         // warning: local storage is not the best(second best place) to store access token;
                //         localStorage.setItem("car-access-token", data.token);

                //     })
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
                        <h1 className="text-5xl font-bold">Login!</h1>

                        <div className="card-body">
                            <form onSubmit={handleLogin} action="">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input name="email" type="email" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input name="password" type="password" placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Login" />
                                </div>
                            </form>

                            <p className="my-4 text-center">
                                New to cars doctor? <Link className="text-orange-600" to={"/sign-up"}>
                                    Sign Up
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

export default Login;