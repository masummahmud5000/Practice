import { useEffect, useState } from 'react';
import './Navber.css';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navber = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [visiblebtn, setVisiblebtn] = useState(true);
    // const [border, setBorder] = useState(null);

    const reload = () => {
        navigate('/')
    }

    const borderCon = {
        borderRight: '2px solid gold',
    }
    
    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh_token');
        // console.log(refreshToken)
        
        if (refreshToken === null){
            // console.log('The token is null')
            setVisible(false);
            setVisiblebtn(true);
        }else{
            // console.log('The is token is not a null')
            setVisible(true);
            setVisiblebtn(false);
        }
        
    }, [])

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload();
    }
    
    return(
        <div>
            <nav>
                <h1 onClick={reload} className='logo'><span className='first'>M</span>asum <span className='last'>M</span>ahmud</h1>
                <ul className='linkBox'>
                    <Link to='/' style={visible ? null : borderCon} className='linkHome'>Home</Link>
                    { visible && <Link to='/contact' className='linkContact'>Profile</Link>}
                    { visible && <Link onClick={logout} className='linkStuff'>Logout</Link>}
                    { visiblebtn && <Link to='/register' className='linkRegister'>Register</Link>}
                    {visiblebtn && <Link to='/login' className='linkLogin'>LogIn</Link>}
                </ul>
            </nav>
        </div>
    )
}
export default Navber;