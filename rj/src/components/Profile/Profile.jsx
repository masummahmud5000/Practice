import { useState, useEffect } from 'react';
import './Profile.css'
// import axios from 'axios';
import axiosIns from '../../axiosInstance';
// import axios from 'axios';

const Profile = () => {
    const [username, setUsername] = useState(null);
    const [balance, setBalance] = useState(null);

    const [depo, setDepo] = useState(false);
    const [withh, setWith] = useState(false);
    // const [visible, setVisible] = useState(false);
    const [depoBalance, setDepoBalance] = useState(null);
    const [withBalance, setWithBalance] = useState(null);

    const [balanceError, setBalanceError] = useState(null);
    
    const deposite = () => {
        setDepo(true);
        setWith(false);
        // console.log(depo, withh)
    }
    const withdraw = () => {
        setDepo(false);
        setWith(true);
        // console.log(depo, withh)
    }

    useEffect(() => {
        const userProfile = async () => {
            let accessToken = localStorage.getItem('access_token');
            try{
                const res = await axiosIns.get('profile/', 
                    // headers : {
                    //     Authorization : `Bearer ${accessToken}`
                    // }
                )
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

    const depositePost = async (e) => {
        e.preventDefault();
        // console.log(depoBalance)
        // setDepo(false)
        let balanceData = {
            balance : depoBalance
        };
        try{
            // console.log(balanceData)
            const accessToken = localStorage.getItem('access_token');
            const res = await axiosIns.post('deposite/', balanceData);
            // console.log(res.data)
            setDepo(false);
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    };
    //////////////////////////////////////////////////////////////////////////////////
    const withdrawPost = async (e) => {
        e.preventDefault();
        let balanceData = {
            balance : withBalance
        }
        try{
            await axiosIns.post('withdraw/', balanceData);
            // if res.data.status === 400:
            setBalanceError(null)
            window.location.reload();
        }catch(err){
            if (err.status === 400){
                setBalanceError('insufficient Balance!')
            }
        }
    }


    // const logout = () => {
    //     localStorage.removeItem('access_token');
    //     localStorage.removeItem('refresh_token');
    //     window.location.reload();
    // }
    
    return(
        <div className='body'>
            <div className="bashboard">
                <div className="userDetails">
                    <h1>User Name : {username}</h1>
                    <h3>Balance : ${balance}</h3>
                    <button onClick={deposite} className='depo'>Deposite</button>
                    <button onClick={withdraw} className='with'>Withdraw</button>
                </div>
                { depo && <form className='form' onSubmit={depositePost}>
                    <input onChange={(e) => {setDepoBalance(e.target.value)}} type="number" placeholder='Enter Your Balance!' required/>
                    <button>Deposite</button>
                </form>}

                { withh && <form className='form form2' onSubmit={withdrawPost}>
                    <input onChange={(e) => {setWithBalance(e.target.value)}} type="number" placeholder='Enter Your Balance!' required/>
                    <p className='erro'>{balanceError}</p>
                    <button>Withdraw</button>
                </form>}
            </div>
        </div>
    )
}
export default Profile;