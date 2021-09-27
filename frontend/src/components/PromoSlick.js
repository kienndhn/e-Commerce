import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listProductsOnSale } from '../actions/productActions'
import { Image } from 'react-bootstrap'
import Product from './Product'

const PromoSlick = () => {

    const dispatch = useDispatch()

    const productOnSale = useSelector(state => state.productOnSale)
    const { loading, error, products } = productOnSale

    useEffect(() => {
        dispatch(listProductsOnSale())
    }, [dispatch])

    const settings = {
        // dots: true,
        // infinite: true,
        // speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1

        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: products.length > 4,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        products.length > 0 &&
        <>
            <h2>khuyến mại hấp dẫn</h2>
            <Slider {...settings}>

                {products.map((product) => (
                    <>
                        <div key={product._id}>
                            <Product product={product} />
                        </div>

                    </>
                )
                )
                }
            </Slider>
        </>
    );
}

export default PromoSlick