import React, {useState} from 'react'
import CartContext from '../../context/CartContext'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

const CartSummary = () => {
  const [paymentOption, setPaymentOption] = useState('')
  const [confirmOrder, setConfirmOrder] = useState(false)

  const handlePaymentChange = event => setPaymentOption(event.target.value)

  const handleConfirmOrder = () => {
    setConfirmOrder(true)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <>
                    <div className="popup-container">
                      <h1>Order Summary</h1>
                      <p>Total Items: {cartList.length}</p>
                      <p>Total Cost: Rs {total}/-</p>
                      <form className="payment-options">
                        <label htmlFor="netBanking">
                          <input
                            type="radio"
                            id="netBanking"
                            value="NetBanking"
                            disabled
                          />
                          Net Banking
                        </label>
                        <label htmlFor="cod">
                          <input
                            type="radio"
                            value="COD"
                            id="cod"
                            checked={paymentOption === 'COD'}
                            onChange={handlePaymentChange}
                          />
                          Cash on Delivery
                        </label>
                      </form>
                      <button
                        type="button"
                        onClick={handleConfirmOrder}
                        disabled={paymentOption !== 'COD'}
                        className="close-button"
                      >
                        Confirm Order
                      </button>
                      {confirmOrder ? (
                        <p>Your order has been placed successfully</p>
                      ) : (
                        ''
                      )}
                    </div>
                    <button
                      type="button"
                      className="close-button"
                      onClick={() => close()}
                    >
                      Close
                    </button>
                  </>
                )}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
