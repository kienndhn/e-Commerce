import React, { useEffect, useState } from 'react'
import { ButtonGroup, DropdownButton, Dropdown, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { createProduct, deleteProduct, listProducts, listProductsOnSale } from '../actions/productActions'
import cashFormat from '../helper/currencyFormat'
import Paginate from './Paginate'
export default function AdminProductsList() {
    // const [listMode, setListMode] = useState(localStorage.getItem('listMode'))

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    const [count, setCount] = useState(0)
    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin



    const getDateTime = (value) => {
        const date = new Date(value)
        return date.toLocaleString()
    }

    const listAllHandler = () => {
        dispatch(listProducts())
    }

    const listOnSaleHandler = () => {
        dispatch(listProductsOnSale())
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const buttonFunction = useSelector(state => state.buttonFunction)
    const { mode } = buttonFunction

    useEffect(() => {
        if (mode === "PRODUCTS_LIST") {
            dispatch(listProducts())
        }
    }, [successDelete, mode])

    
    return (
        mode === "PRODUCTS_LIST" &&
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item"><a className="nav-link active show" data-toggle="tab" href="#all"
                    onClick={(e) => {
                        dispatch({ type: "PRODUCT_LIST_RESET" })
                        dispatch({type: "PAGINATE_RESET"})
                        dispatch(listProducts())
                    }
                    }>T???t c??? s???n ph???m</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#promo"
                    onClick={(e) => {
                        dispatch({ type: "PRODUCT_LIST_RESET" })
                        dispatch({type: "PAGINATE_RESET"})
                        dispatch((listProductsOnSale()))
                    }
                    }>S???n ph???m khuy???n m??i</a></li>
            </ul>

            <div className="tab-content">

                <br />



                <div className="tab-pane fade in active show" id="all" >

                    <div className="row no-gutters justify-content-between">
                        <div className="my-3 w-auto" style={{ fontSize: "2rem", fontWeight: "600px" }}>T???t c???</div>

                        <Button className='my-3 float-right' onClick={createProductHandler} >
                            <i className='fas fa-plus'></i> T???o s???n ph???m
                        </Button>
                    </div>
                    <Paginate />

                    <div style={{ maxHeight: "450px", overflow: "auto" }}>
                        {products && <table className='table-sm table-striped table-bordered table-hover table'>
                            <thead>
                                <tr>
                                    <th className='text-center'><p>STT</p></th>
                                    <th className='text-center'><p>T??n</p></th>
                                    <th className='text-center'>
                                        <DropdownButton
                                            as={ButtonGroup}
                                            id="dropdown-variants-Secondary total-price"
                                            variant={''}
                                            title="Gi??">
                                            <Dropdown.Item
                                                onClick={() => dispatch(listProducts('', '{"price":-1}'))}
                                            >
                                                Gi???m d???n
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => dispatch(listProducts('', '{"price":1}'))}
                                            >
                                                T??ng d???n
                                            </Dropdown.Item>
                                        </DropdownButton></th>
                                    <th className='text-center'><p>Ph??n lo???i</p></th>
                                    <th className='text-center'><DropdownButton
                                        as={ButtonGroup}
                                        id="dropdown-variants-Secondary total-price"
                                        variant={''}
                                        title="???? b??n">
                                        <Dropdown.Item
                                            onClick={() => dispatch(listProducts('', '{"countSold":-1}'))}
                                        >
                                            Gi???m d???n
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => dispatch(listProducts('', '{"countSold":1}'))}
                                        >
                                            T??ng d???n
                                        </Dropdown.Item>
                                    </DropdownButton></th>
                                    <th><DropdownButton
                                        as={ButtonGroup}
                                        id="dropdown-variants-Secondary total-price"
                                        variant={''}
                                        title="C??n l???i">
                                        <Dropdown.Item
                                            onClick={() => dispatch(listProducts('', '{"countInStock":-1}'))}
                                        >
                                            Gi???m d???n
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => dispatch(listProducts('', '{"countInStock":1}'))}
                                        >
                                            T??ng d???n
                                        </Dropdown.Item>
                                    </DropdownButton></th>
                                    <th><p>Thay ?????i</p></th>
                                    <th><p>Th??m khuy???n m???i</p></th>
                                    <th><p>X??a</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) =>
                                (
                                    <tr key={product._id}>
                                        <td>{products.indexOf(product) + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{cashFormat(product.price)} VN??</td>
                                        <td>{product.category}</td>
                                        <td>{product.countSold}</td>
                                        <td>{product.countInStock}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/addPromotion`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )

                                )}
                            </tbody>
                        </table>}
                    </div>


                </div>

                <div className="tab-pane fade in" id="promo" style={{ overflow: "auto" }}>
                    <div className="my-3 w-auto" style={{ fontSize: "2rem", fontWeight: "600px" }}>Khuy???n m???i</div>
                    <Paginate />
                    <div style={{ maxHeight: "450px", overflow: "auto" }}>
                        {products && <table className='table-sm table table-striped table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>T??n</th>
                                    <th>Ph??n lo???i</th>
                                    <th>B???t ?????u</th>
                                    <th>K???t th??c</th>
                                    <th>Gi?? b??n</th>
                                    <th>Gi?? khuy???n m???i</th>
                                    <th>Thay ?????i</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    // product.onSale.isOnSale &&
                                    <tr key={product._id}>
                                        <td>{products.indexOf(product) + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{getDateTime(product.onSale.startDate)}</td>
                                        <td>{getDateTime(product.onSale.endDate)}</td>
                                        <td>{cashFormat(product.price)} VN??</td>
                                        <td>{cashFormat(product.price * (1 - product.onSale.salePercent * 0.01))} VN??</td>
                                        <td>
                                            {console.log()}
                                            <LinkContainer to={`/admin/product/${product._id}/addPromotion`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </div>
        </div >
    )
}
