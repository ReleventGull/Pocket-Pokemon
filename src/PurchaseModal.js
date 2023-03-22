import ReactDom from 'react-dom'
import {purchseItem} from './apiCalls/users'

const PurchaseModal = ({setBuy, featuredItem, itemValue, token}) => {
   
    const purchase = async() => {
        await purchseItem({token: token, itemId: featuredItem.id, quantity: itemValue})
    }
    
    return ReactDom.createPortal(
        <>
        <div  className="overlay"/>
        <div className="confirmBuy">
                <h3>Purchase {itemValue} {featuredItem.name}s for ${featuredItem.cost * itemValue}?</h3>
                <div className="healOptions">
                    <button className="yesHeal">Yes</button>
                    <button className="noHeal" onClick={() => setBuy(false)}>No</button>
                </div>
                
            </div>
            </>,
            document.getElementById('shopBody')
    )
}

export default PurchaseModal