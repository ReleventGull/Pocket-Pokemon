import { use, useEffect, useState } from "react"
import { fetchUserItems } from "./apiCalls/users"
const Bag = ({setDisplay, token}) => {
    const [items, setItems] = useState([])
    const [featuredItem, setFeaturedItem] = useState(null)
    const fetchUserData = async() => {
        const items = await fetchUserItems(token)
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
                        <div>Pokeballs</div>
                        <div>Healing</div>
                        <div>Revival</div>
                        <div>PP</div>
                        <div>Status</div>
                        <div>Stat</div>
                    </div>
                </div>
                <button onClick={() => setDisplay('')}className="exitShop">X</button>
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