import React from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'
import Paginate from './Paginate'
import Product from './Product'

const ProductGrid = ({ keyword="" }) => {

    const productList = useSelector((state) => state.productList)
    const { error, products, title } = productList

    console.log("product grid render")
    return (
        <>
            {title&&<div style={{padding:"8px"}}><h2 className="p-0 m-0">{title} {keyword}</h2></div>}

            {
                products && (
                    <div className="row no-gutters" >
                        {products.length > 0 ? products.map((product) => (
                            <div className="col-sm-6 col-lg-4 col-xl-3 p-2" key={product._id} >
                                <Product product={product} />
                            </div>
                        ))
                            :
                            <div style={{padding:"8px"}}>Không tìm thấy</div>
                        }
                    </div>
                )
            }

        </>
    )
}

export default ProductGrid