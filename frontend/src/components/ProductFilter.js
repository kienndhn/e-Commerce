import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { listProducts, listProductsOnSale, listTopProducts } from '../actions/productActions'

const ProductFilter = () => {

    const dispatch = useDispatch()

    const [active, setActive] = useState('btn1')


    console.log("filter render")
    return (

        <aside className="col d-none d-md-flex flex-column"  >
            <div className="text-center" style={{position: "sticky", top:"100px"}}>
                <h2>Bộ lọc</h2>
                <div className="d-flex flex-column w-100 border btn-group-vertical" style={{ height: "fit-content", }}>
                    <div className={`btn ${active === 'btn1' ? 'btn-dark' : 'btn-light'}`} key="btn1"
                        onClick={(e) => {
                            setActive('btn1')
                            dispatch(listProducts())
                        }}>Tất cả sản phẩm</div>
                    <div className={`btn ${active === 'btn2' ? 'btn-dark' : 'btn-light'} `} name="btn2"
                        onClick={(e) => {
                            setActive('btn2')
                            dispatch(listTopProducts())
                        }}>Đáng giá cao</div>
                    <div className={`btn ${active === 'btn3' ? 'btn-dark' : 'btn-light'} `} name="btn3"
                        onClick={(e) => {
                            setActive('btn3')
                            dispatch(listProductsOnSale())
                        }
                        }>Khuyến mại</div>
                </div>
            </div>
        </aside>
    )
}

export default ProductFilter