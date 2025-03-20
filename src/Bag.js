import { useEffect, useState } from "react"
import { fetchUserItems, fetchUserItemsByCategory } from "./apiCalls/users"
import { usePokeball } from './apiCalls/battle'
import {expGain} from './apiCalls/battle'
const Bag = ({setEncounter, setMessage, animateBall, setDisplay, token, setView, setAllowMove, UseButton, pokemonEncountered}) => {
    const [items, setItems] = useState([])
    const [featuredItem, setFeaturedItem] = useState(null)
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
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
            const response = await usePokeball({token: token, enemyPokemon: pokemonEncountered, usedPokeball: featuredItem})
            setView('message')
             await animateBall({success: response.success, pokeball: response.ball, shakes: response.shakes})
            if(!response.success) {
                setMessage(response.message)
                await delay(3000)
                setView('')
                setMessage('')
            }else {
                setMessage(response.message)
                await delay(3000)
                setMessage('')
                await delay(500)
                setMessage(response.message2)
                await delay(3000)
                let result = await expGain({token: token, faintedPokemonBaseExperience: pokemonEncountered.baseExperience, faintedPokemonLevel: pokemonEncountered.level})
                setMessage('')
                await delay(500)
                setMessage(`You gained $${result.cash}!`)
                await delay(3000)
                setView('')
                setEncounter(false)
            }
            
        }else {
            console.log("This is not a ball")
            //Will add a different endpoint here
        }
    }
    useEffect(() => {
        fetchUserData()
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
                        <div className="itemContainer" key={item.id} onClick={() => {setFeaturedItem(item)}}>
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