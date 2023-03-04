import { useState, useEffect } from "react"
import { healPokemon } from "./apiCalls/userPokemon"
import {getAllItems} from './apiCalls/index'
import e from "cors"
const Shop = ({token, setDisplay, setAllowMove}) => {
    const [heal, setHeal ] = useState(false)
    const [items, setItems] = useState([])
    const [featuredItem, setFeaturedItem] = useState(null)
    const [itemValue, setItemValue] = useState(1)
    console.log(itemValue)
    const fetchShopItems = async() => {
        let items = await getAllItems()
        setItems(items)
    }
    useEffect(() => {
        fetchShopItems()
    }, [])

return (
    <>
        <div className={!heal ? 'shopBody' : 'shopBody disable'}>
            <div className="top-shop">
            <button className='exitShop' disabled={heal} onClick={() => {setAllowMove(true), setDisplay('')}}>X</button>
            </div>
            <div className="shop">
                <div className="shopItems">
                {items.length > 0 ?
                    items.map(item => 
                        <div onClick={() => {setFeaturedItem(item), console.log(featuredItem)}} className="item">{item.name}</div>
                    )
                    :
                    null
                    }
                </div>
                <div className="displayItem">
                    {featuredItem ?
                    <>
                    <h2>{featuredItem.name}</h2>
                    <h3>{featuredItem.category}</h3>
                    <div className="itemDesc">{featuredItem.description}</div>
                    <div><span>Cost:</span><span className="costItem">{featuredItem.cost}</span></div>
                        <div className="costBox">
                            <div className="inputBox">
                            <input  type='number' value={itemValue < 1 ? '' : itemValue} min='1' max='100' onChange={(e) => e.target.value > 100 ? null : setItemValue(Number(e.target.value))}className="amountInput"></input>
                                <div className="increaseDecrease">
                                    <button onClick={() => itemValue == 100 ? null : setItemValue((pre) => pre+1)}>+</button>
                                    <button onClick={() => itemValue <= 1 ? null : setItemValue((pre) => pre - 1)}>-</button>
                                </div>
                            </div>
                            <button className='purchaseButton' disabled={itemValue > 0 ? false : true}>Buy</button>
                        </div>
                    </>
                    :
                    null
                    }
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