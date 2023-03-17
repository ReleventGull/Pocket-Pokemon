import { healPokemon } from "./apiCalls/userPokemon"
import ReactDom from 'react-dom'




const HealModal = ({token, setHeal}) => {
    return ReactDom.createPortal(
        <>
        <div  className="overlay"/>
        <div className="confirmHeal">
                <h3>Heal your pokemon?</h3>
                <div className="healOptions">
                    <button onClick={async() =>{ healPokemon(token), setHeal(false)}}className="yesHeal">Yes</button>
                    <button className="noHeal" onClick={() => setHeal(false)}>No</button>
                </div>
                
            </div>
            </>,
            document.getElementById('shopBody')
    )
        
}

export default HealModal