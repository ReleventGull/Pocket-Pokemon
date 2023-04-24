import { useEffect, useState } from "react"
import { fetchUserItems } from "./apiCalls/users"
const Bag = ({setDisplay, token}) => {
    
    const fetchUserData = async() => {
        const items = await fetchUserItems(token)
        console.log("items here!")
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

        </div>
    )
}

export default Bag