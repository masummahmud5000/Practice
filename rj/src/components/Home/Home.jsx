import './Home.css'
import { useState, useEffect } from 'react';

const Home = () => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/main/api/')
        .then(res => res.json())
        .then(d => setInfo(d))
    }, [])
    ////////////////////////////////////
    const submitHandle = (e) => {
        e.preventDefault()

        let yourName = e.target.yourName.value
        let yourAge = e.target.yourAge.value
        let yourNumber = e.target.yourNumber.value
        
        fetch('http://127.0.0.1:8000/main/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: yourName,
                age: yourAge,
                phoneNumber: yourNumber
            }),
        })
        .then(res => res.json())
        .then(d => console.log(d))
    };
    return(
        <div>

            <form action="POST" onSubmit={submitHandle}>
                <input type="text" required placeholder='Enter Your Name' name='yourName'/>
                <input type="number" required placeholder='Enter Your Age' name='yourAge' />
                <input type="number" required placeholder='Enter Number' name='yourNumber'/>
                <button type='submit'> Submit</button>
                <hr />
            </form>
            
            <table>
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map(data => (<tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.age}</td>
                        <td>{data.name}</td>
                        <td>{data.phoneNumber}</td>
                        
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}
export default Home;