import './Login.css'
import axios from 'axios'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag, faLock, faRotateLeft, faPaperPlane} from '@fortawesome/free-solid-svg-icons'

const Login = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const login = async(e) => {
        e.preventDefault();
        const setData = {
            username: userName,
            password: password
        }
        try{
            const res = await axios.post('http://127.0.0.1:8000/token/', setData)
            // localStorage.setItem('access_token', res.data.access);
            // console.log(res.data.access_token)
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            setUserName('');
            setPassword('');
            console.log('Login Successfull!')
            // console.log(
        }catch(err){
            console.log(err)
        }
        
    }
    

    return(
        <div className='main'>
            <form onSubmit={login}>
                <h1 className='register'>Login</h1>
                <label>User Name</label>
                <div>
                    <FontAwesomeIcon icon={faUserTag}/>
                    <input value={userName} type="text" placeholder='Your UserName' required onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <label>Password</label>
                <div>
                    <FontAwesomeIcon icon={faLock}/>
                    <input value={password} type="password" placeholder='Your Password' required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className='submit' type='submit'><FontAwesomeIcon icon={faPaperPlane} style={{marginRight: '5px'}}/>Login</button>
                <button className='reset' type='reset'><FontAwesomeIcon icon={faRotateLeft} style={{marginRight: '5px'}}/>Reset Form</button>
            </form>
        </div>
    )
}
export default Login;