import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listOrders } from '../actions/orderActions'
import { listProducts, listProductsOnSale, listTopProducts } from '../actions/productActions'
import { paginateButtonReducer } from '../reducers/groupbuttonReducers'

const Paginate = ({ isAdmin = false, keyword = ''}) => {

  const productFilter = useSelector(state => state.productFilter)
  const { mode } = productFilter

  // const productList = useSelector((state) => state.productList)
  // const { page: pp, pages: pps } = productList


  const paginateButton = useSelector(state => state.paginateButton)
  const { page, pages, sort } = paginateButton

  const dispatch = useDispatch()

  return (
    pages > 1 && (
      <div style={{ padding: "8px" }}>
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            // <LinkContainer
            //   
            //   // to={
            //   //   !isAdmin
            //   //     ? keyword
            //   //       ? `/search/${keyword}/page/${x + 1}`
            //   //       : `/page/${x + 1}`
            //   //     : `/admin/productlist/${x + 1}`
            //   // }
            // >
            <div key={x + 1} onClick={(e) => {
              if (x + 1 !== page) {
                switch (mode) {
                  case "ALL_LIST":
                    dispatch(listProducts(keyword, sort, x + 1))
                    break
                  case "TOP_LIST":
                    dispatch(listTopProducts(keyword, "", x + 1))
                    break
                  case "SALE_LIST":
                    dispatch(listProductsOnSale(keyword, "", x + 1))
                    break
                  case "ORDER_LIST":
                    dispatch(listOrders("", "", x + 1))
                }
              }
            }}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </div>

            // </LinkContainer>
          ))}
        </Pagination>
      </div>
    )
  )
}

export default Paginate
