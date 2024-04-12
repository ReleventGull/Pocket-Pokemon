import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./apiCalls/users";

const Login = ({setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMesage, setErrorMesage] = useState('')
    const [isEmpty, setIsEmpty] = useState('')
    
    const navigate = useNavigate()
    useEffect(() => {
        if(username && password) {
            setIsEmpty('display')
        }else {
            setIsEmpty('')
        }
    }, [username, password])
    
const handleLogin = async (e) => {
    e.preventDefault()
        const response = await loginUser({
            username: username,
            password: password
        })
        if(response.error) {
            setErrorMesage(response.message)
        }else {
            localStorage.setItem('token', response.token)
            setToken(response.token)
            navigate('/')
        }
    }
return (
<div id="definePlayerPokemon">
    <div className="starterPage">   
      <form onSubmit={handleLogin} className='registerForm'>
        <h1 className="titleMon">Pokemon!</h1>
        <div className="inputContainer">
            <label>Username</label>
            <input type='username' onChange={(event) => setUsername(event.target.value)}value={username}></input>
        </div>
       
        <div className="inputContainer">
            <label>Password</label>
            <input type='password' onChange={(event) => setPassword(event.target.value)} value={password}></input>
        </div>
       
        <button className={`continueButton ${isEmpty}`}>Continue!</button>
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </form>
      <h2 className="errorMessage">{errorMesage}</h2>
    </div>
    
</div>
    )
}

export default Login