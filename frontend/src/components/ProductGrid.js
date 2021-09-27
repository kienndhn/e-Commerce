import React from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'
import Product from './Product'

const ProductGrid = () => {

    const productList = useSelector((state) => state.productList)
    const { error, products, title } = productList

    console.log("product grid render")
    return (
        <>
            <h2>{title}</h2>
            {
                (
                    <div className="row no-gutters" >
                        {products && products.map((product) => (
                            <div className="col-sm-6 col-lg-4 col-xl-3 p-2" key={product._id} >
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                )}

        </>
    )
}

export default ProductGrid