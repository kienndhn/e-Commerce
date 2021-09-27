import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import cashFormat from '../helper/currencyFormat'
const Product = ({ product }) => {
  return (
    // <Card
    //   className='rounded'
    //   style={{ borderRadius: '50%' }}
    // >
    //   {product.onSale.isOnSale &&
    //     <p style={{
    //       background: '#d10909',
    //       borderRadius: '50%',
    //       width: '40px',
    //       height: '40px',
    //       fontSize: '0.8rem',
    //       textAlign: 'center',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       display: 'flex',
    //       color: 'white'
    //     }} >
    //       -{product.onSale.salePercent}%
    //     </p>}
    //   <Link to={`/product/${product._id}`}>
    //     <Card.Img src={product.image} variant='top' />
    //   </Link>

    //   <Card.Body>
    //     <Link to={`/product/${product._id}`}>
    //       <Card.Title as='div'>
    //         <strong>{product.name}</strong>
    //       </Card.Title>
    //     </Link>

    //     <Card.Text as='div' >
    //       <Rating
    //         value={product.rating}
    //         text={`${product.numReviews} đánh giá`}
    //       />
    //     </Card.Text>

    //     <Card.Text
    //       as={product.onSale.isOnSale ? 'h5' : 'h4'}
    //       style={product.onSale.isOnSale ? {
    //         textDecorationLine: 'line-through',
    //         textDecorationStyle: 'solid', textAlign: 'center',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         display: 'flex'
    //       } : {
    //         textAlign: 'center',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         display: 'flex'
    //       }}
    //     ><span>
    //         {cashFormat(product.price)} VNĐ
    //       </span></Card.Text>
    //     {product.onSale.isOnSale &&
    //       <Card.Text as={'h4'}
    //         style={{
    //           background: '#d10909',
    //           borderRadius: '5px',
    //           textAlign: 'center',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           display: 'flex'
    //         }}>
    //         <span>{cashFormat(product.price * (1 - 0.01 * product.onSale.salePercent))} VNĐ</span>
    //       </Card.Text>}
    //   </Card.Body>
    // </Card >
    <a href={`/product/${product._id}`} className="text-decoration-none">
      <div className="card h-100">
        <p style={{
          display: product.onSale.isOnSale ? "flex" : 'none',
          background: '#d10909',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '0.8rem',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          // display: 'flex',
          color: 'white',
          position: "absolute"
        }}>
          -{product.onSale.salePercent}%
        </p>
        {/* <div className="card-img"> */}
        <img src={product.image} variant='top' className="card-img" />
        {/* </div> */}

        <div className="card-body d-flex flex-column">
          {/* <div> */}
          <Rating
            value={product.rating}
            text={`${product.numReviews} đánh giá`}
          />
          {/* </div> */}
          <div className="card-title text-center">
            <div className="h5" style={{ fontWeight: "900" }}>{product.name}</div>
          </div>

          <div className="text-center d-flex flex-column mt-auto font-weight-bold">
            <span style={{ textDecorationLine: product.onSale.isOnSale ? 'line-through' : "none", fontSize: product.onSale.isOnSale ? "1rem" : "1.15rem" }}>{cashFormat(product.price)} VNĐ</span>
            <span style={{ display: product.onSale.isOnSale ? 'block' : 'none', fontSize: "1.15rem" }}>{cashFormat(product.price * (1 - 0.01 * product.onSale.salePercent))} VNĐ</span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default Product
