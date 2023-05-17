import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);

            if (currentUser && currentUser?.email) {// if (currentUser) / if (currentUser?.email)

                const loggedUser = { // sudhu email pathabo tai email nichi;
                    email: currentUser?.email,
                };

                fetch("https://car-doctor-server-mocha-theta.vercel.app/jwt", {
                    method: "POST", // user er data jeomn, emial obj er moddhe rekhe server e pathabo tai post operation korte hobe;
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(loggedUser) // token pathnor jonno user er data server e lagbe arki;
                })
                    .then(res => res.json()) // token is string so json e convert kora jabe na tai eta na dite pari othoba server theke obj baniye send korte hobe;
                    .then(data => {
                        console.log(data);
                        // warning: local storage is not the best(second best place) to store access token;
                        localStorage.setItem("car-access-token", data.token);

                    })
            }
            else { // user na thakle remove korbo;
                localStorage.removeItem("car-access-token");
            }

        })

        return () => {
            unsubscribe();
        }
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;