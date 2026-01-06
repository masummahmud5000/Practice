import './Navber.css';
import { Outlet, Link } from 'react-router-dom';

const Navber = () => {

    const reload = () => {
        window.location.reload();
    }
    
    return(
        <div>
            <nav>
                <h1 onClick={reload} className='logo'><span className='first'>M</span>asum <span className='last'>M</span>ahmud</h1>
                <ul className='linkBox'>
                    <Link to='/' className='linkHome'>Home</Link>
                    <Link to='/contact' className='linkContact'>Profile</Link>
                    <Link to='/staff' className='linkStuff'>Stuff-List</Link>
                    <Link to='/register' className='linkRegister'>Register</Link>
                    <Link to='/login' className='linkLogin'>LogIn</Link>
                </ul>
            </nav>
        </div>
    )
}
export default Navber;