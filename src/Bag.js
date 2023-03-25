import { useEffect } from "react"

const Bag = ({setDisplay}) => {

    return (
        <div className="bagContainer">
            <div className="topBag">
                <div className="bagCategories">

                </div>
                <button onClick={() => setDisplay('')}className="exitShop">X</button>
            </div>

        </div>
    )
}

export default Bag