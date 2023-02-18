import { useNavigate } from "react-router-dom"

const Settings = ({setDisplay, setAllowMove}) => {
    const navigate = useNavigate()
    
    const handleLogout = () => {
        window.localStorage.removeItem('token')
        navigate('/register')
        
    }
    return (
        <div className="settingsPage">
            <button onClick={() => {setAllowMove(true), setDisplay('')}}>Back</button>
            <button onClick={handleLogout}>Logout</button>

        </div>
    )
}

export default Settings