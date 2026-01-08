import { useEffect, useState } from 'react';
import './Navber.css';
import { Outlet, Link } from 'react-router-dom';

const Navber = () => {

    const [visible, setVisible] = useState(false);
    // const [border, setBorder] = useState(null);

    const reload = () => {
        window.location.reload();
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
        }else{
            // console.log('The is token is not a null')
            setVisible(true);
        }
        
    }, [])

    
    return(
        <div>
            <nav>
                <h1 onClick={reload} className='logo'><span className='first'>M</span>asum <span className='last'>M</span>ahmud</h1>
                <ul className='linkBox'>
                    <Link to='/' style={visible ? null : borderCon} className='linkHome'>Home</Link>
                    { visible && <Link to='/contact' className='linkContact'>Profile</Link>}
                    { visible && <Link to='/staff' className='linkStuff'>Stuff-List</Link>}
                    <Link to='/register' className='linkRegister'>Register</Link>
                    <Link to='/login' className='linkLogin'>LogIn</Link>
                </ul>
            </nav>
        </div>
    )
}
export default Navber;