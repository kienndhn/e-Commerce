import React, { useEffect, useState } from 'react'
import { ButtonGroup, DropdownButton, Dropdown, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { createProduct, deleteProduct, listProducts, listProductsOnSale } from '../actions/productActions'
import cashFormat from '../helper/currencyFormat'
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

    useEffect(() => {
        // if (!products) {
        dispatch(listProducts())
        // }
    }, [successDelete])

    const buttonFunction = useSelector(state => state.buttonFunction)
    const { mode } = buttonFunction
    return (
        mode === "PRODUCTS_LIST" && <div>

            <ul className="nav nav-tabs">
                <li className="nav-item"><a className="nav-link active show" data-toggle="tab" href="#all" onClick={(e) => dispatch(listProducts())}>Tất cả sản phẩm</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#promo" onClick={(e) => dispatch(listProductsOnSale)}>Sản phẩm khuyến mãi</a></li>
            </ul>

            <div className="tab-content">

                <br />



                <div className="tab-pane fade in active show" id="all">
                    <h2>Tất cả</h2>
                    {products && <table className='table-sm table-striped table-bordered table-hover table-responsive table' style={{ height: "425px" }}>
                        <thead>
                            <tr>
                                <th className='text-center'><p>STT</p></th>
                                <th className='text-center'><p>Tên</p></th>
                                <th className='text-center'>
                                    <DropdownButton
                                        as={ButtonGroup}
                                        id="dropdown-variants-Secondary total-price"
                                        variant={''}
                                        title="Giá">
                                        <Dropdown.Item
                                            onClick={() => dispatch(listProducts('', '{"price":-1}'))}
                                        >
                                            Giảm dần
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => dispatch(listProducts('', '{"price":1}'))}
                                        >
                                            Tăng dần
                                        </Dropdown.Item>
                                    </DropdownButton></th>
                                <th className='text-center'><p>Phân loại</p></th>
                                <th className='text-center'><DropdownButton
                                    as={ButtonGroup}
                                    id="dropdown-variants-Secondary total-price"
                                    variant={''}
                                    title="Đã bán">
                                    <Dropdown.Item
                                        onClick={() => dispatch(listProducts('', '{"countSold":-1}'))}
                                    >
                                        Giảm dần
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => dispatch(listProducts('', '{"countSold":1}'))}
                                    >
                                        Tăng dần
                                    </Dropdown.Item>
                                </DropdownButton></th>
                                <th><DropdownButton
                                    as={ButtonGroup}
                                    id="dropdown-variants-Secondary total-price"
                                    variant={''}
                                    title="Còn lại">
                                    <Dropdown.Item
                                        onClick={() => dispatch(listProducts('', '{"countInStock":-1}'))}
                                    >
                                        Giảm dần
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => dispatch(listProducts('', '{"countInStock":1}'))}
                                    >
                                        Tăng dần
                                    </Dropdown.Item>
                                </DropdownButton></th>
                                <th><p>Thay đổi</p></th>
                                <th><p>Thêm khuyến mại</p></th>
                                <th><p>Xóa</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) =>
                            (
                                <tr key={product._id}>
                                    <td>{products.indexOf(product) + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{cashFormat(product.price)} VNĐ</td>
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
                    <Button className='my-3 float-left' onClick={createProductHandler} >
                        <i className='fas fa-plus'></i> Tạo sản phẩm
                    </Button>
                </div>

                <div className="tab-pane fade in" id="promo">
                    <h2>Khuyến mãi</h2>
                    {products && <table className='table-sm table table-striped table-bordered table-hover table-responsive' style={{ height: "500px" }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Phân loại</th>
                                <th>Bắt đầu</th>
                                <th>Kết thúc</th>
                                <th>Giá bán</th>
                                <th>Giá khuyến mại</th>
                                <th>Thay đổi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                product.onSale.isOnSale &&
                                <tr key={product._id}>
                                    <td>{products.indexOf(product) + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{getDateTime(product.onSale.startDate)}</td>
                                    <td>{getDateTime(product.onSale.endDate)}</td>
                                    <td>{cashFormat(product.price)} VNĐ</td>
                                    <td>{cashFormat(product.price * (1 - product.onSale.salePercent * 0.01))} VNĐ</td>
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
    )
}
