import { useEffect, useState } from 'react';
import './Profile.css'
import axios from 'axios';

const Profile = () => {

    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const load = async () => {
            try{
                res = await axios.get('http://127.0.0.1:8000/profile/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredentials: true
                })
                console.log(res.data.balance)
            }catch(err){
                console.log(err)
            }
        }
    }, [])
    
    return(
        <div>
            <h1>{balance}</h1>        
        </div>
    )
}
export default Profile;