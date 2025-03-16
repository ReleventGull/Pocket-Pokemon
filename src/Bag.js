import { useEffect, useState } from "react"
import { fetchUserItems, fetchUserItemsByCategory } from "./apiCalls/users"
import { usePokeball } from './apiCalls/battle'
const Bag = ({setDisplay, token, setView, setAllowMove, UseButton, pokemonEncountered}) => {
    const [items, setItems] = useState([])
    const [featuredItem, setFeaturedItem] = useState(null)
    
    const fetchUserData = async() => {
        const items = await fetchUserItems(token)
        setItems(items)
    }
    const fetchItems  = async(category) => {
        if(!category) {
            fetchUserData();
            return
        }
        const items = await fetchUserItemsByCategory({token: token, category:category})
        setItems(items)
    }
    const useItem = async() => {
        if(featuredItem.category == "standard-balls") {
            console.log("Standard ballls" ,pokemonEncountered)
            const response = await usePokeball({token: token, enemyPokemon: pokemonEncountered, usedPokeball: featuredItem})
            setView('message')
            if(!response.success) {
                //If it's not success, take the shakes and do stuff lol
            }else {
                //If successful, set message that you have capture the pokemon
            }
            
        }else {
            console.log("This is not a ball")
            //Will add a different endpoint here
        }
    }
    useEffect(() => {
        fetchUserData()
        console.log("Bag opened", pokemonEncountered)
    }, [])



    return (
        <div className="bagContainer">
            <div className="topBag">
                <div className="bagCategories">
                    <div className="categoryContainer">
                        <div>All</div>
                        <div onClick={() => fetchItems('standard-balls')}>Pokeballs</div>
                        <div onClick={() => fetchItems('healing')}>Healing</div>
                        <div onClick={() => fetchItems('revival')}>Revival</div>
                        <div onClick={() => fetchItems('pp-recovery')}>PP</div>
                        <div onClick={() => fetchItems('status_cures')}>Status</div>
                        <div onClick={() => fetchItems('stat-boosts')}>Stat</div>
                    </div>
                </div>
                <button onClick={() => {setView ? setView('') : setAllowMove(true), setDisplay('')}}className="exitShop">X</button>
            </div>
            <div className="bagBody">
                <div className="bagItems">
                {items.length > 0 ?
                    items.map(item => 
                        <div className="itemContainer" key={item.id} onClick={() => {setFeaturedItem(item), console.log(featuredItem)}}>
                            <div>{item.name}</div>
                            <div className="itemQuantity">x{item.quantity}</div>
                        </div>
                    )
                    :
                    null
                    }

                </div>
                <div className="displayBagItem">
                    {featuredItem ?
                    <>
                    <h2>{featuredItem.name}</h2>
                    <h3>{featuredItem.category}</h3>
                    <div className="itemDesc">{featuredItem.description}</div>
                    {UseButton ? <UseButton useItem={useItem} /> : null}
                    </>
                    :
                    null
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Bag