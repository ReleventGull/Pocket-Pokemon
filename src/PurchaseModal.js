import ReactDom from 'react-dom'

import {purchseItem} from './apiCalls/users'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const PurchaseModal = ({getuserCash, setBuy, featuredItem, itemValue, token}) => {
   const [error, setError] = useState('')
    const purchase = async() => {
        let result = await purchseItem({token: token, itemId: featuredItem.id, quantity: itemValue})
        console.log(result)
        if (result.error) {
            setError(result.error)
        }else {
            getuserCash()
        }
    }
    
    return ReactDom.createPortal(
        <>
        <div  className="overlay"/>
        <div className="confirmBuy">
                <h3>Purchase {itemValue} {featuredItem.name}s for ${featuredItem.cost * itemValue}?</h3>
                <div className="healOptions">
                    <button onClick={purchase} className="yesHeal">Yes</button>
                    <button className="noHeal" onClick={() => setBuy(false)}>No</button>
                    
                </div>
                {error ? <p>{error}</p>: null}
            </div>
            
            </>,
            document.getElementById('shopBody')
    )
}

export default PurchaseModal