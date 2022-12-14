import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const history = useNavigate();
    const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})

    const onChangeHandler = (e) =>{
        // console.log(e.target.name,"____________name");
        // console.log(e.target.value,"____________value");
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  
    const handleSubmit = async(e) =>{
        e.preventDefault();
        // API CALL
        const url = `${host}/api/auth/createuser`
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name:credentials.name,email: credentials.email,password: credentials.password})
        });
        const json = await response.json();
        if (json.success){
            // SAVE THE TOKEN AND REDIRECT 
            localStorage.setItem('token',json.authtoken)
            history('/')
            props.showAlert("Account Created Successfully","success")
        }else{
            props.showAlert("Invalid Credentials","danger")
        }
      }


    return(
        <div className="mt-3 container">
    <h2>Create your iNotebook Account now</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name='name' onChange={onChangeHandler} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' onChange={onChangeHandler} aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name='password' onChange={onChangeHandler} minLength={5} required/>
    </div>
    <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChangeHandler} minLength={5} required/>
    </div>

    <button type="submit" className="btn btn-dark">Create Account</button>
    </form>
    </div>
    )
}
