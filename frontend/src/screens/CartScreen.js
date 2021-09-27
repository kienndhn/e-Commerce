import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { addToCart, removeFromCart } from '../actions/cartActions'

import cashFormat from '../helper/currencyFormat'
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <div className="row justify-content-around">
        <div className="col-md-8">
          <h1>Giỏ hàng</h1>
          {cartItems.length === 0 ? (
            <Message>
              Không có gì trong giỏ hàng <Link to='/'>Quay lại</Link>
            </Message>
          ) : (
            <div className="list-group" style={{ height: "500px", overflow: "auto" }}>
              {cartItems.map((item) => (
                <>
                  <div className="list-group-item" key={item.product}>
                    <div className="row justify-content-around">
                      <div className="col-2">
                        <Image className="img-fluid rounded" src={item.image} alt={item.name} />
                      </div>
                      <div className="col-3 text-nowrap" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="col-2 text-nowrap" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{cashFormat(item.price)} VNĐ</div>
                      <div className="col-2">
                        <select className="form-control"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-2">
                        <div className="btn btn-light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-4">
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Tổng ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  sản phẩm
                </h2>

                {cashFormat(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))} VNĐ
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Tiếp tục
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </>
  )
}

export default CartScreen
