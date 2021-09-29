import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, listProductsOnSale, listTopProducts } from '../actions/productActions'

const ProductFilter = ({ keyword = "" }) => {

    const dispatch = useDispatch()

    // const [active, setActive] = useState('btn1')

    const productFilter = useSelector(state => state.productFilter)
    const { mode } = productFilter

    console.log("filter render")
    return (

        <aside className="col-2 d-none d-md-flex flex-column"  >
            <div className="text-center" style={{ position: "sticky", top: "100px" }}>
                <h2>Bộ lọc</h2>
                <div className="d-flex flex-column w-100 border btn-group-vertical" style={{ height: "fit-content", }}>
                    <div className={`btn ${mode === 'ALL_LIST' ? 'btn-dark' : 'btn-light'}`} key="btn1"
                        onClick={(e) => {
                            // setActive('btn1')
                            // dispatch({ type: "ALL_LIST" })
                            dispatch(listProducts(keyword))
                        }}>Tất cả sản phẩm</div>
                    <div className={`btn ${mode === 'TOP_LIST' ? 'btn-dark' : 'btn-light'} `} name="btn2"
                        onClick={(e) => {
                            // dispatch({ type: "TOP_LIST" })
                            dispatch(listTopProducts(keyword))
                        }}>Đáng giá cao</div>
                    <div className={`btn ${mode === 'SALE_LIST' ? 'btn-dark' : 'btn-light'} `} name="btn3"
                        onClick={(e) => {
                            // dispatch({ type: "SALE_LIST" })
                            dispatch(listProductsOnSale(keyword))
                        }}>Khuyến mại</div>
                </div>
            </div>
        </aside>
    )
}

export default ProductFilter