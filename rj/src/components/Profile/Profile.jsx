import { useState, useEffect } from 'react';
import './Profile.css'
// import axios from 'axios';
import axiosIns from '../../axiosInstance';
// import axios from 'axios';

const Profile = () => {
    const [user_id, setUser_id] = useState(null);
    const [user_id_valid, setUser_id_valid] = useState(null);

    const [username, setUsername] = useState(null);
    const [balance, setBalance] = useState(null);

    const [depo, setDepo] = useState(false);
    const [withh, setWith] = useState(false);
    const [send, setSend] = useState(false)
    // const [visible, setVisible] = useState(false);
    const [depoBalance, setDepoBalance] = useState(null);
    const [withBalance, setWithBalance] = useState(null);
    const [sendBalance, setSendBalance] = useState(null);

    const [depoPassword, setDepoPassword] = useState(null);
    const [withPassword, setWithPassword] = useState(null);
    const [sendPassword, setSendPassword] = useState(null);

    const [balanceError, setBalanceError] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    
    const deposite = () => {
        setDepo(true);
        setWith(false);
        setSend(false);
        // console.log(depo, withh)
    }
    const withdraw = () => {
        setWith(true);
        setDepo(false);
        setSend(false);
        // console.log(depo, withh)
    }
    const sendMoney = () => {
        setSend(true);
        setDepo(false);
        setWith(false);
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
            balance : depoBalance,
            password: depoPassword
        };
        try{
            const res = await axiosIns.post('deposite/', balanceData);
            // console.log(res.data)
            if (res.status === 202){
                setDepo(false)
                setBalanceError(null)
                setPasswordValid(null)
                window.location.reload();
            }
        }catch(err){
            if (err.status === 404){
                setPasswordValid('Password Not Match!');
            }
        }
    };
    //////////////////////////////////////////////////////////////////////////////////
    const withdrawPost = async (e) => {
        e.preventDefault();
        let balanceData = {
            balance : withBalance,
            password: withPassword
        }
        try{
            const res = await axiosIns.post('withdraw/', balanceData);
            if (res.status === 202){
                setWith(false)
                setBalanceError(null)
                setPasswordValid(null)
                window.location.reload();
            }
        }catch(err){
            if (err.status === 404){
                setPasswordValid('Password Not Match!')
                setBalanceError(null)
            }else{
                if (err.status === 400){
                    setBalanceError('insufficient Balance')
                    setPasswordValid(null)
                }
            }
            console.log(err)
        }
    }

    const sendMoneyPost = async(e) => {
        e.preventDefault();

        let dataSet = {
            userId: user_id,
            balance: sendBalance,
            password: sendPassword
        };
        try{
            const res = await axiosIns.post('sendMoney/', dataSet);
            // console.log(res.data.success)
            const errorType = res.data.Error;
            if (errorType === 'password'){
                // console.log('password not match')
                setPasswordValid('Password Not Match')
                setUser_id_valid(null)
                setBalanceError(null)

            }else if(errorType === 'userName'){
                // console.log('user not found')
                setUser_id_valid('Sorry User Not Found!')
                setPasswordValid(null)
                setBalanceError(null)

            }else if(errorType === 'self'){
                // console.log('sorry this your id')
                setUser_id_valid('Invalid transiction!')
                setPasswordValid(null)
                setBalanceError(null)

            }else if(errorType === 'balance'){
                setBalanceError('your balance insufficient')
                setPasswordValid(null)
                setUser_id_valid(null)

            }else if(errorType === 'success'){
                setPasswordValid(null)
                setUser_id_valid(null)
                setBalanceError(null)
                window.location.reload();
            }
        }catch(err){
            console.log(err)
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
                    <h3>Balance : $ {balance?.toLocaleString()}</h3>
                    <button onClick={deposite} className='depo'>Deposite</button>
                    <button onClick={withdraw} className='with'>Withdraw</button>
                    <button onClick={sendMoney} className='send'>Send Money</button>
                </div>
                { depo && <form className='form' onSubmit={depositePost}>
                    <input onChange={(e) => {setDepoBalance(e.target.value)}} type="number" placeholder='Enter Your Balance!' required/>
                    <input onChange={(e) => {setDepoPassword(e.target.value)}} type="password" placeholder='Enter Your Password' required/>
                    <p className='erro'>{passwordValid}</p>
                    <button>Deposite</button>
                </form>}

                { withh && <form className='form form2' onSubmit={withdrawPost}>
                    <input onChange={(e) => {setWithBalance(e.target.value)}} type="number" placeholder='Enter Your Balance!' required/>
                    <p className='erro'>{balanceError}</p>
                    <input onChange={(e) => {setWithPassword(e.target.value)}} type="password" placeholder='Enter Your Password' required/>
                    <p className='erro'>{passwordValid}</p>
                    <button>Withdraw</button>
                </form>}
                { send && <form className='form form3' onSubmit={sendMoneyPost}>
                    <input onChange={(e) => {setUser_id(e.target.value)}} type="text" placeholder='Send Money User Name' required/>
                    <p className='erro'>{user_id_valid}</p>
                    <input onChange={(e) => {setSendBalance(e.target.value)}} type="number" placeholder='Enter Balance!' required/>
                    <p className='erro'>{balanceError}</p>
                    <input onChange={(e) => {setSendPassword(e.target.value)}} type="password" placeholder='Enter Your Password' required/>
                    <p className='erro'>{passwordValid}</p>
                    <button>Send Money</button>
                </form>}
            </div>
        </div>
    )
}
export default Profile;