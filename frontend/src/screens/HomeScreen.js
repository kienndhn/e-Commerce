import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import Slider from '../components/Slider'

import { listProducts, listProductsOnSale, listTopProducts } from '../actions/productActions'
import ProductGrid from '../components/ProductGrid'
import ProductFilter from '../components/ProductFilter'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [keyword])

  console.log("home render")

  return (
    <>
      <Slider />
      <div className="d-flex ">
        <Meta title={"Trang chủ"} />

        <ProductFilter />

        <div role="main" className="col-md-10">

          {keyword && <Link to='/' className='btn btn-light'>
            Quay lại
          </Link>}

          {/* <PromoSlick></PromoSlick> */}

          <ProductGrid />
        </div>
      </div>
    </>
  )
}

export default HomeScreen
