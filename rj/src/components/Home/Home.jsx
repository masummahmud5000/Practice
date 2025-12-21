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
        // e.preventDefault()

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

    // Delete List 
    const deleteUser = (id) => {
        // console.log(id)

        if (window.confirm('You are sure Click Item Delete!')){
                fetch(`http://127.0.0.1:8000/main/api/${id}/`, {
                method: 'DELETE'
            });
            window.location.reload();
        }else{
            alert('Your Item is not Deleted!')
        }
    };
    
    
    return(
        <div>

            <form action="POST" onSubmit={submitHandle}>
                <label>Name</label>
                <input type="text" required placeholder='Enter Your Name' name='yourName'/>
                <label>Age</label>
                <input type="float" required placeholder='Enter Your Age' name='yourAge' />
                <label>Number</label>
                <input type="number" required placeholder='Enter Number' name='yourNumber'/>
                <h1></h1>
                <button className='btn' type='submit'> Submit</button>
            </form>
            
            <table>
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Number</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map(data => (<tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.age}</td>
                        <td>{data.phoneNumber}</td>
                        <td>
                        
                            <button className='edit'>Edit</button>
                            
                        </td>
                        <td>

                            <button onClick={() => deleteUser(data.id)} className='delete'>Delete</button>
                            
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}
export default Home;