import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// import { useContext } from 'react';

export default function Feed() {
    let { logout } = useContext(AuthContext);


    // console.log(x);

    async function logOut() {
        await logout();
    }

    return (
        <>
            <div>
                <p>Welcome to Feed</p>
            </div>
            <div>
                <button onClick={logOut}>Logout</button>
            </div>
        </>
    )
}
