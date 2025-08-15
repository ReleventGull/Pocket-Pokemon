import { useState, useEffect } from "react"
import {getAllItems, fetchItemsByName} from './apiCalls/index'
import {purchseItem, fetchUserCash} from './apiCalls/users'
import HealModal from "./HealModal"
import PurchaseModal from './PurchaseModal'
const Shop = ({token, setDisplay, setAllowMove}) => {
    const [heal, setHeal ] = useState(false)
    const [items, setItems] = useState([])
    const [featuredItem, setFeaturedItem] = useState(null)
    const [itemValue, setItemValue] = useState(1)
    const [userCash, setUserCash] = useState(0)
    const [buy, setBuy] = useState(false)
    
    const getuserCash = async() => {
        const cash = await fetchUserCash(token)
        setUserCash(cash.cash.cash)
    }
    
    const fetchShopItems = async() => {
        let items = await getAllItems(token)
        setItems(items)
    }
    useEffect(() => {
        getuserCash()
        fetchShopItems()
    }, [])

return (
    <>
        <div id='shopBody'>
            <div className="top-shop">
            <button className='exitShop' disabled={heal} onClick={() => {setAllowMove(true), setDisplay('')}}>X</button>
            </div>
            <div className="filterOptions">
                <div className="cashBox">
                <p>Cash: <span>{userCash}</span></p>
                </div>
                <div className="filter">
                    <div onClick={() => fetchShopItems()}>All</div>
                    <div onClick={async() => {let items = await fetchItemsByName('standard-balls'); setItems(items)}}>Pokeballs</div>
                    <div onClick={async() => {let items = await fetchItemsByName('healing'); setItems(items)}}>Healing</div>
                    <div onClick={async() => {let items = await fetchItemsByName('revival'); setItems(items)}}>Revival</div>
                    <div onClick={async() => {let items = await fetchItemsByName('pp-recovery'); setItems(items)}}>PP</div>
                    <div onClick={async() => {let items = await fetchItemsByName('status-cures'); setItems(items)}}>Status</div>
                    <div onClick={async() => {let items = await fetchItemsByName('stat-boosts'); setItems(items)}}>Stat</div>
                </div>
            </div>
            <div className="shop">
                <div className="shopItems">
                {items.length > 0 ?
                    items.map(item => 
                        <div key={item.id} onClick={() => {setFeaturedItem(item)}} className="item">{item.name}</div>
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
                            <button onClick={() => setBuy(true)}className='purchaseButton' disabled={itemValue > 0 ? false : true}>Buy</button>
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
            <HealModal setHeal={setHeal} token={token}/>
        : 
        null
        }
        
        {buy ? 

        <PurchaseModal getuserCash={getuserCash} token={token} featuredItem={featuredItem} itemValue={itemValue} setBuy={setBuy}/>
        :
        null
        }
        </>
    )
}





export default Shop