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
                    <h1 className='logo' onClick={load}>Masum Software Foundation</h1>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Stuff List</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                    {/* <hr /> */}
                    <div>
                        <div className='orBtn'><FontAwesomeIcon icon={faHandPointer} style={{fontSize: '20px'}}/><h3>LogIn</h3></div>
                    </div>
                </nav>
                <hr />
                <div>
                </div>
            </div>
            <div className='bgImg'>
                <h1>Hi, I am Full Stake Web Developer!</h1>
                <div className="skill">
                    <div>HTML</div>
                    <div>CSS</div>
                    <div>javaScript</div>
                    <div>React js</div>
                    <div>Python</div>
                    <div>Django</div>
                    <div>Rest Framework</div>
                    <div>Git Github</div>
                </div>
            </div>
        </div>
    )
}
export default Navber;