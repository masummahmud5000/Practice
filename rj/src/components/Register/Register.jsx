import './Register.css'

const Register = () => {
    return(
        <div>
            <form action='get'>
                <h1>Register</h1>
                <label>Name</label>
                <input type="text" placeholder='Enter Your Name' required/>

                <label>Email</label> 
                <input type="email" placeholder='Enter Your Email' required/>

                <label>Password</label> 
                <input type="text" placeholder='Enter 8 Digit Password' required/>
                <hr />
                <p>Already Register / </p><a href="#">Login</a>
                <button type='submit' className='btn'>Submit</button>
            </form>
        </div>
    )
}
export default Register;