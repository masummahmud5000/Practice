import { useState, useEffect } from 'react';
import './Profile.css'
// import axios from 'axios';
import axiosIns from '../../axiosInstance';

const Profile = () => {
    const [username, setUsername] = useState(null)
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const userProfile = async () => {
            let accessToken = localStorage.getItem('access_token');
            try{
                const res = await axiosIns.get('profile/', {
                    headers : {
                        Authorization : `Bearer ${accessToken}`
                    }
                })
                // console.log(res.data);
                setUsername(res.data.username);
                setBalance(res.data.balance);
            }catch(err){
                if (err.status === 401){
                    console.log('মাসুম ভাই , আপনার অ্যাক্সেস টুকেন এর মেয়াদ শেষ !')
                }
                console.log(err)
            }
        }
        userProfile();
    }, [])

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload();
    }
    
    return(
        <div>
            <h1>User Name : {username}</h1>        
            <h1>Balance : {balance}</h1>      
            <button onClick={logout}>Log Out</button>
        </div>
    )
}
export default Profile;