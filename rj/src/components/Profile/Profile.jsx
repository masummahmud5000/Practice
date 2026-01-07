import { useEffect, useState } from 'react';
import './Profile.css'
import axios from 'axios';

const Profile = () => {

    const [balance, setBalance] = useState(0)
    const [username, setUserName] = useState('')

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const load = async () => {
            try{
                let res = await axios.get('http://127.0.0.1:8000/profile/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredentials: true
                })
                setBalance(res.data.balance)
                setUserName(res.data.username)
            }catch(err){
                console.log(err)
            }
        }
        load();
    }, [])
    
    return(
        <div>
            <h1>User Name : {username}</h1>        
            <h1>Balance : {balance}</h1>        
        </div>
    )
}
export default Profile;