import { useState, useEffect } from 'react';
import './Profile.css'
// import axios from 'axios';
import axiosIns from '../../axiosInstance';
// import axios from 'axios';

const Profile = () => {
    const [user_id, setUser_id] = useState(null);
    const [user_id_valid, setUser_id_valid] = useState(null);

    // const [pass, setPass] = useState(null)
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
    const [charge, setCharge] = useState(null);
    const [tran, setTran] = useState([])

    // setCharge(withBalance / 1000 * 7.70)
    
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
            // let accessToken = localStorage.getItem('access_token');
            try{
                const res = await axiosIns.get('profile/')
                setUsername(res.data.username);
                setBalance(res.data.balance);
                // setPass(res.pass);
                // console.log(res.data.pass)

                const tr = await axiosIns.get('transaction/')
                setTran(tr.data)
                // console.log(tran)

            }catch(err){
                if (err.status === 401){
                    console.log('মাসুম ভাই , আপনার অ্যাক্সেস টুকেন এর মেয়াদ শেষ !')
                }
                // console.log(err)
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
            const res = await axiosIns.post('deposite/',balanceData);
            if (res.status === 200){
                console.log(res.data)
                setBalanceError(null)
                setPasswordValid(null)
                window.location.reload();
            }
        }catch(err){
            const balanceCode = err.response.data.balance?.[0]
            const passwordCode = err.response.data.password?.[0]
            // console.log(err.response.data)
            if (passwordCode == 'password'){
                setPasswordValid('Invalid Password try again!')
                setBalanceError(null)
                setTimeout(() => setPasswordValid(null), 5000)
                
            }else if(balanceCode == 'balance_zero'){
                setBalanceError('Minimum Deposite 50 Taka, without Down!')
                setPasswordValid(null)
                setTimeout(()=>setBalanceError(null), 5000)
                
            }else if(balanceCode == 'balance_limit'){
                setBalanceError('Maximum Deposite 25,000 Taka, without Over')
                setPasswordValid(null)
                setTimeout(()=>setBalanceError(null), 5000)
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
            if(res.status === 200){
                window.location.reload();
                setWith(false)
                setBalanceError(null)
                setPasswordValid(null)
            }

        }catch(err){
            const ErrorCode = err.response?.data.non_field_errors;
            // console.log(ErrorCode)
            if (ErrorCode?.includes('password')){
                setPasswordValid('Invalid Password try again!')
                setBalanceError(null)
                setTimeout(() => setPasswordValid(null), 5000);

            }else if (ErrorCode?.includes('balance_low')){
                setBalanceError('Insufficient Balance!')
                setPasswordValid(null)
                setTimeout(() => setBalanceError(null), 5000)
                
            }else if(ErrorCode?.includes('balance_zero')){
                setBalanceError('Minimum withdaraw 50 Taka!')
                setPasswordValid(null)
                setTimeout(() => setBalanceError(null), 5000)
                
            }else if(ErrorCode?.includes('balance_limit')){
                setBalanceError('Maximun withdaraw 25,000 Taka!')
                setPasswordValid(null)
                setTimeout(() => setBalanceError(null), 5000)
            }else{
                // console.log(err)
            }
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
            if (res.status === 200){
                setSend(false)
                setUser_id_valid(null)
                setPasswordValid(null)
                setBalanceError(null)
                window.location.reload()
            }
        }catch(err){
            const errorCode = err.response?.data.non_field_errors;
            // console.log(errorCode)
            if (errorCode?.includes('password')){
                setPasswordValid('Invalid Password try again!')
                setBalanceError(null)
                setUser_id_valid(null)

                setTimeout(()=>setPasswordValid(null), 5000)
            }else if(errorCode?.includes('receiver')){
                setUser_id_valid('User Not Found')
                setPasswordValid(null)
                setBalanceError(null)

                setTimeout(()=>setUser_id_valid(null), 5000)
            }else if(errorCode?.includes('self')){
                setUser_id_valid('Sorry Self Transaction Not Allow')
                setPasswordValid(null)
                setBalanceError(null)

                setTimeout(()=> setUser_id_valid(null), 5000)
            }else if(errorCode?.includes('balance_low')){
                setBalanceError('insufficient Balance')
                setPasswordValid(null)
                setUser_id_valid(null)

                setTimeout(()=> setBalanceError(null),5000)
            }else if(errorCode?.includes('balance_zoro')){
                setBalanceError('Minimum Send Money 50 Taka')
                setPasswordValid(null)
                setUser_id_valid(null)

                setTimeout(()=> setBalanceError(null),5000)
            }else if(errorCode?.includes('balance_limit')){
                setBalanceError('Maximum Send Money 20,000 Taka')
                setUser_id_valid(null)
                setPasswordValid(null)

                setTimeout(()=>setBalanceError(null),5000)
            }else{
                // console.log(err)
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
                    <h3>Balance : $ <span className='balance'>{balance?.toLocaleString()}</span></h3>
                    <button onClick={deposite} className='depo'>Deposite</button>
                    <button onClick={withdraw} className='with'>Withdraw</button>
                    <button onClick={sendMoney} className='send'>Send Money</button>
                    {/* <h1>{pass}</h1> */}
                </div>
                { depo && <form className='form' onSubmit={depositePost}>
                    <input onChange={(e) => {setDepoBalance(e.target.value)}} type="number" placeholder='Enter Your Balance!' required/>
                    <p className='erro'>{balanceError}</p>
                    <input onChange={(e) => {setDepoPassword(e.target.value)}} type="password" placeholder='Enter Your Password' required/>
                    <p className='erro'>{passwordValid}</p>
                    <button>Deposite</button>
                </form>}

                { withh && <form className='form form2' onSubmit={withdrawPost}>
                    <p className='charge'>Service Charge : {(withBalance / 1000 * 7.70).toFixed(2)} Taka</p>
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
                <table>
                    <thead>
                        <tr>
                            <th>Transaction</th>
                            <th>Amount</th>
                            <th>Charge</th>
                            <th>Status</th>
                            <th>Time</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tran.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.charge}</td>
                                <td>{item.status}</td>
                                <td>{new Date(item.time).toLocaleTimeString('en-US', {hour12:true})}</td>
                                <td>{new Date(item.time).toLocaleDateString('en-US')}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Profile;