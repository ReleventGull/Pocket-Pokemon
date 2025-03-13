import { use, useEffect, useState } from "react"
import { fetchUserItems, fetchUserItemsByCategory } from "./apiCalls/users"
const Bag = ({setDisplay, token, setView, setAllowMove}) => {
    const [items, setItems] = useState([])
    const [featuredItem, setFeaturedItem] = useState(null)
    
    const fetchUserData = async() => {
        const items = await fetchUserItems(token)
        setItems(items)
    }
    const fetchItems  = async(category) => {
        console.log("Calling...")
        if(!category) {
            fetchUserData();
            return
        }
        const items = await fetchUserItemsByCategory({token: token, category:category})
        console.log("Results of fetch user items here:", items)
        setItems(items)
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