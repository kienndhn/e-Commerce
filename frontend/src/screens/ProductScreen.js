import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Gallery from '../components/Gallery'
import cashFormat from '../helper/currencyFormat'

import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  //const [gallery, setGallery] = useState('')

  const dispatch = useDispatch()

  const [description, setDescription] = useState([])
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  const [hideDescription, setHideDescription] = useState(true)

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })

    }
    if (product.description) {
      var list = Object.entries(product.description)
      list.shift()
      setDescription(list)
    }
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Quay lại
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={8}>
              <Row>
                <Col>
                  {!product.gallery
                    ?
                    (<Image src={product.image} alt={product.name} fluid />)
                    : (<Gallery gallery={product.gallery}></Gallery>)
                  }
                </Col>
              </Row>
              <Row>
                <Col>

                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Đánh giá từ khách hàng</h2>
                      {product.reviews.length === 0 && <Message>Không có đánh giá</Message>}
                    </ListGroup.Item>
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h2>Viết đánh giá</h2>
                      {successProductReview && (
                        <Message variant='success'>
                          Review submitted successfully
                        </Message>
                      )}
                      {loadingProductReview && <Loader />}
                      {errorProductReview && (
                        <Message variant='danger'>{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                            <Form.Label>Chất lượng</Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>Đánh giá...</option>
                              <option value='1'>1 - Rất kém</option>
                              <option value='2'>2 - Kém</option>
                              <option value='3'>3 - Bình thường</option>
                              <option value='4'>4 - Tốt</option>
                              <option value='5'>5 - Rất tốt</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment'>
                            <Form.Label>Bình luận</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='3'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            disabled={loadingProductReview}
                            type='submit'
                            variant='primary'
                          >
                            Gửi
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Hãy <Link to='/login'>Đăng nhập</Link> để viết đánh giá{' '}
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h3>{product.name}</h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} đánh giá`}
                        />
                      </ListGroup.Item>
                      {/* <ListGroup.Item>Giá: {cashFormat(parseInt(product.price))} VNĐ</ListGroup.Item> */}
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Row>
                            <Col>Giá:</Col>
                            <Col>
                              <strong>{cashFormat(parseInt(product.price))} VNĐ</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row>
                            <Col>Trạng thái:</Col>
                            <Col>
                              {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Số lượng</Col>
                              <Col>
                                <Form.Control
                                  as='select'
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                          {userInfo ? <Button

                            onClick={addToCartHandler}
                            className='btn-block'
                            type='button'
                            disabled={product.countInStock === 0}
                          >
                            Thêm vào giỏ hàng
                          </Button> :
                            <Message>
                              Hãy <Link to='/login'>Đăng nhập</Link> thêm sản phẩm vào giỏ hàng{' '}
                            </Message>}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup.Item
                        onClick={() => setHideDescription(!hideDescription)}
                      >
                        <h3>Thông số kỹ thuật</h3>

                      </ListGroup.Item>
                      {

                        hideDescription && product.description &&
                        Object.entries(product.description).map((entry) =>
                        (<ListGroup.Item>
                          <strong><b>{entry[0]}:</b></strong> {entry[1]}
                        </ListGroup.Item>)
                        )
                      }
                    </ListGroup>
                  </Card>
                </Col>

              </Row>
            </Col>
          </Row>
          {/* <Row>
            <Col md={6}>
              {!product.gallery
                ?
                (<Image src={product.image} alt={product.name} fluid />)
                : (<Gallery gallery={product.gallery}></Gallery>)

              }
              {console.log(product.gallery)}
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Giá: {cashFormat(parseInt(product.price))} VNĐ</ListGroup.Item>
                <ListGroup.Item
                  onClick={() => setHideDescription(!hideDescription)}
                >
                  <h3>Thông số kỹ thuật</h3>
                </ListGroup.Item>
                {!hideDescription && <>

                </>}
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Giá:</Col>
                      <Col>
                        <strong>{cashFormat(parseInt(product.price))} VNĐ</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Trạng thái:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Số lượng</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    {userInfo ? <Button

                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Thêm vào giỏ hàng
                    </Button> :
                      <Message>
                        Hãy <Link to='/login'>Đăng nhập</Link> thêm sản phẩm vào giỏ hàng{' '}
                      </Message>}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row> */}
          {/* <Row>
            <Col md={6}>
              <h2>Đánh giá từ khách hàng</h2>
              {product.reviews.length === 0 && <Message>Không có đánh giá</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Viết đánh giá</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Chất lượng</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Rất kém</option>
                          <option value='2'>2 - Kém</option>
                          <option value='3'>3 - Bình thường</option>
                          <option value='4'>4 - Tốt</option>
                          <option value='5'>5 - Rất tốt</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Bình luận</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Gửi
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Hãy <Link to='/login'>Đăng nhập</Link> để viết đánh giá{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>*/}
        </>
      )}
    </>
  )
}

export default ProductScreen
