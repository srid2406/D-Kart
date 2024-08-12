import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, dappazon, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(null)

  const fetchDetails = async () => {
    const events = await dappazon.queryFilter('Buy')
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )

    if(orders.length === 0) return

    const order = await dappazon.orders(account, orders[0].args.orderId)
    setOrder(order)
  }
  

  const buyHandler =  async() => {
    const signer = await provider.getSigner()
    let transaction = await dappazon.connect(signer).buy(item.id, { value: item.cost })
    await transaction.wait()
    window.alert("Purchased Successfully")

    setHasBought(true)
  }

  useEffect(() => {
    fetchDetails()
  }, [hasBought])

  return (
    <div className="product">
      <div className='product__details'>
        <div className='product__image'>
          <img src={item.image} alt='Product' />
        </div>
        <div className='product__overview'>
          <h1>{item.name}</h1>

          <Rating value={item.rating} />
          <hr />
          <p>{item.address}</p>
          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>
          <hr />
          <h2>Overview</h2>
          <p>
            {item.description}

            Introducing the "ActiveStride" Running Shoe - the perfect blend of style and performance. These shoes are designed to help you achieve your fitness goals with comfort and ease.

The "ActiveStride" features a lightweight yet sturdy construction, with a breathable mesh upper that keeps your feet cool and dry during even the most intense workouts. The responsive sole provides excellent traction and support, allowing for quick and natural movements.
          </p>

        </div>
        <div className='product__order'>
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>

          <p>
            FREE delivery <br />
            <strong>
              {/* random dates are generated right now for the testing purpose... */}
              {new Date(Date.now() + 1000000000).toLocaleDateString(undefined, {weekday: 'long', month: 'long', day:'numeric'})}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

          <button className='product__buy' onClick={buyHandler}>
            Buy Now
          </button>

          <p><small>Ships from</small> Dappazon</p>
          <p><small>Sold by</small> Dappazon</p>

          {order && (
            <div className='product__bought'>
              Payment processed on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  }
                ) }
              </strong>
              <hr />
              Delivery Expected on or before <br />
              <strong>
                {new Date(Date.now() + 500000000).toLocaleDateString(undefined, {weekday: 'long', month: 'long', day:'numeric'})}
              </strong>
            </div>
          )}

        </div>
        <button onClick={togglePop} className='product__close'>
          <img src={close} alt='Close' />
        </button>


      </div>

    </div >
  );
}

export default Product;