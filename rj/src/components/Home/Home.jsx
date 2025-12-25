import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    const [info, setInfo] = useState([])
    const [time, setTime] = useState(null)
    const [updateName, setUpdateName] = useState('')
    const [formStatus, setFormStatus] = useState(false)
    const [editStatus, setEditStatus] = useState(true)
    const [dataBox, setDataBox] = useState(null)
    const [editData, setEditData] = useState(null)
    const [mainForm, setMainForm] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const getUrl = await axios.get('http://127.0.0.1:8000/main/api/',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }                       
                });
                setInfo(getUrl.data)
                // window.location.reload();
            }
            catch(error){
                console.log('error message')
            }
        };
        // window.location.reload()
        fetchData();
        
    }, [])
    ////////////////////////////////////
    const submitHandle = async(e) => {
        e.preventDefault()

        let yourName = e.target.yourName.value
        let yourAge = e.target.yourAge.value
        let yourNumber = e.target.yourNumber.value
        
        const userData = {
            name: yourName,
            age: yourAge,
            phoneNumber: yourNumber
        };
        const url = 'http://127.0.0.1:8000/main/api/';
        const header = {'Content-Type':'application/json'};

        try{
            await axios.post(url,userData,{headers: header});
            // console.log(response.data);
            window.location.reload();

        } catch(error){
            
        }
        // window.location.reload();
    };

    // Delete List , Start Point 
    const deleteUser  = async (id) => {

        let counTime = 6;
        if (window.confirm('are your sure Delete your Data!')){
            const timer = setInterval( async () => {
            if (counTime >= 2){
                
                counTime --
                setTime(counTime);
            }else {
                setTime(null)
                clearInterval(timer)

                try{
                    await axios.delete(`http://127.0.0.1:8000/main/api/${id}/`);
                    await window.location.reload();
                }
                catch(error){
                    console.log('masum', error);
                }
            }
        }, 1000)
        }else{
            alert('Not Deleted Data!')
        }        
    };
    // Delete List End Point

    /// Edit Update Start ///
    const updateUser  = async (data) => {
        setEditData(data)
        setFormStatus(true)
        setEditStatus(false)
        setUpdateName(data.name)
        setDataBox(data.id)
        setMainForm(false)
    }
    const Edit = async (e) => {
        e.preventDefault();
        let name = e.target.upName.value
        let age = e.target.upAge.value
        let phoneNumber = e.target.upNumber.value
        // let updateData = null
        
        if (name == ''){
            name = editData.name
        }
        if(age == ''){
            age = editData.age
        }
        if (phoneNumber == ''){
            phoneNumber = editData.phoneNumber
        }
        // console.log(name , age , phoneNumber)
        const updateData = {
            name: name,
            age: age,
            phoneNumber: phoneNumber
        };
        // console.log(updateData, dataBox);
// |
        try{
            await axios.patch(`http://127.0.0.1:8000/main/api/${dataBox}/`, updateData, {headers: {'Content-Type':'application/json'}});
            // console.log('update Successfull!');
            // console.log(updateData)
            await window.location.reload();
            // await setEditStatus(true);
        }
        catch(error){
            console.log(error)
        }
        

    };

    /// Edit Update End ///

    return(
        <div>

            {mainForm && (
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
            )}
            <h1 className='count'>{time}</h1>
            
                {formStatus && (
                    <form onSubmit={Edit} action="patch">
                        <input type="text" name='upName' placeholder='Enter your update Name'/>
                        <input type="float" name='upAge' placeholder='Enter your update Age' />
                        <input type="number" name='upNumber' placeholder='Enter your update Number' />
                        <br />
                        <button type='submit' className='btn'>Update</button>
                    </form>
                )}
                        <h1>{updateName}
            </h1>
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
                        
                            {editStatus && <button onClick={() => updateUser(data)} className='edit'>Edit</button>}
                            
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