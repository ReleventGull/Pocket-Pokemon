import { useState } from "react"
import { healPokemon } from "./apiCalls/userPokemon"
const Shop = ({token, setDisplay, setAllowMove}) => {
    const [heal, setHeal ] = useState(false)
    return (
<>
        <div className={!heal ? 'shopBody' : 'shopBody disable'}>
            <div className="top-shop">
            <button className='exitShop' disabled={heal} onClick={() => {setAllowMove(true), setDisplay('')}}>X</button>
            </div>
            <div className="shop">
                <div className="shopItems">
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                </div>
                <div className="displayItem">

                </div>
            </div>
            <button onClick={() => setHeal(true)}className="healPokemon">
            Heal Pokemon
            </button>
        </div>
        
         {heal ? 
            <div className="confirmHeal">
                <h3>Heal your pokemon?</h3>
                <div className="healOptions">
                    <button onClick={async() =>{ healPokemon(token), setHeal(false)}}className="yesHeal">Yes</button>
                    <button className="noHeal" onClick={() => setHeal(false)}>No</button>
                </div>
                
            </div>
        : 
        null
        }
        </>
    )
}





export default Shop