// import React from 'react';

import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProviders";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;

            })
            .catch(err => console.log(err.message))
    };

    return (
        <div>
            <div className="flex flex-col w-full border-opacity-50">

                <div className="divider">OR</div>

                <div className="text-center">
                    <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                        G
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;