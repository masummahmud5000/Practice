import './Register.css'
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faUserTag, faLock, faRotateLeft, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { replace, useNavigate } from 'react-router-dom';
// import {replace, useNavigate} from 'react-router-dom'

const Register = () => {

    // const navigate = (useNavigate);

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [createdError, setCreatedError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    // const transterLogin = () => {
    //     // window.location.href='/login'
    // }
    ///////////////
    const postData = async(e) => {
        e.preventDefault();
        
        const dataSet = {
            name: name,
            username: userName,
            password: password
        };
        const loginData = {
            username: userName,
            password: password
        };

        try{
            // console.log(dataSet)
            await axios.post('http://127.0.0.1:8000/api/', dataSet);
            
            setName('');
            setUserName('');
            setPassword('');
            setCreatedError('');
            // window.location.href='/login';
            try{
                const res = await axios.post('http://127.0.0.1:8000/token/', loginData);
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                window.location.href='/contact'
            }catch(err){
                // console.log(err)
            }
        } catch(error){
            const errorCode = error.response.data.username;
            const errorCodePassword = error.response.data.password;
            // console.log(errorCode)
            if (errorCode?.includes('usernameNotStrong')){
                setCreatedError('User Name is not Strong')
                setPasswordError(null)
                setTimeout(()=>setCreatedError(null),5000)

            }else if(errorCode?.includes('userAlready')){
                setCreatedError('User Name Already Create')
                setPasswordError(null)
                setTimeout(()=>setCreatedError(null),5000)

            }else if(errorCodePassword?.includes('passNotStrong')){
                setPasswordError('Password Minimum 8 Digit!')
                
                setCreatedError(null)
                setTimeout(()=>setPasswordError(null),5000)
            }
        }
    };

    return(
        <div className='main'>
            <form onSubmit={postData}>
                <h1 className='register'>Register</h1>
                <label>Name</label>
                <div>
                    <FontAwesomeIcon icon={faUser}/>
                    <input value={name} type="text" placeholder='Enter Your Name' required onChange={(e) => setName(e.target.value)}/>
                </div>
                <label>User Name</label>
                <div>
                    <FontAwesomeIcon icon={faUserTag}/>
                    <input value={userName} type="text" placeholder='Type Uniqee UserName' required onChange={(e) => setUserName(e.target.value)}/>
                    <p className='error'>{createdError}</p>
                </div>
                
                <label>Password</label>
                <div>
                    <FontAwesomeIcon icon={faLock}/>
                    <input value={password} type="password" placeholder='Minimum 8 Digit Password' required onChange={(e) => setPassword(e.target.value)}/>
                    <p className='error'>{passwordError}</p>
                    
                </div>
                <button className='submit' type='submit'><FontAwesomeIcon icon={faPaperPlane} style={{marginRight: '5px'}}/>Sumbit</button>
                <button className='reset' type='reset'><FontAwesomeIcon icon={faRotateLeft} style={{marginRight: '5px'}}/>Reset Form</button>
            </form>
        </div>
    )
}
export default Register;