import './Navber.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'

const Navber = () => {

    const load = () => {
        window.location.reload()
    }
    
    return(
        <div>
            <div className="hero">
                <nav>
                    {/* <img className='logo' src={Logo} alt="Logo" /> */}
                    <h1 className='logo' onClick={load}>আদর্শ টেইলার্স</h1>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Staff List</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                    {/* <hr /> */}
                    <div>
                        <div className='orBtn'><FontAwesomeIcon icon={faHandPointer} style={{fontSize: '20px'}}/><h3>Order Now</h3></div>
                    </div>
                </nav>
                <hr />
                <div>
                </div>
            </div>
        </div>
    )
}
export default Navber;