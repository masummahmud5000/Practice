import './Register.css'
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faUserTag, faLock, faRotateLeft, faPaperPlane} from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [createdError, setCreatedError] = useState('');

    ///////////////
    const postData = async(e) => {
        e.preventDefault();

        const dataSet = {
            name: name,
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
        } catch(error){
            if (error.response.status === 406){
                setCreatedError('UserName Alredy Created');
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
                    
                </div>
                <button className='submit' type='submit'><FontAwesomeIcon icon={faPaperPlane} style={{marginRight: '5px'}}/>Sumbit</button>
                <button className='reset' type='reset'><FontAwesomeIcon icon={faRotateLeft} style={{marginRight: '5px'}}/>Reset Form</button>
            </form>
        </div>
    )
}
export default Register;