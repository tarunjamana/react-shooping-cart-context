import React, { useState } from 'react'
import { Form , Button} from 'react-bootstrap'
import { CartState } from '../context/Context';
import Rating from './Rating';
import {useDispatch} from 'react-redux';
import { useSelector} from 'react-redux';
import {filterByStock,filterByDelivery,filterByRating,sortByPrice,clearFilters} from '../features/filters';
 
const Filters = () => {
    const {byStock,byFastDelivery,sort,byRating} =useSelector((state) =>state.filters.value);

    const filtersDispatch = useDispatch();
   const {productDispatch} =  CartState();
   console.log(byStock,byFastDelivery,sort,byRating);
    return (
        <div className="filters">
            <span className="title">Filter Products</span>
            <span>
                <Form.Check
                inline
                label="Ascending"
                name="group1"
                type="radio"
                id={`inline-1`}
                onChange={() =>
                //  productDispatch({
                //      type:"SORT_BY_PRICE",
                //      payload:"lowToHigh"
                //  })
                filtersDispatch(sortByPrice("lowToHigh"))
                }
                checked={sort==="lowToHigh" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                inline
                label="Descending"
                name="group1"
                type="radio"
                id={`inline-2`}
                onChange={() =>
                // productDispatch({
                //         type:"SORT_BY_PRICE",
                //         payload:"highToLow"
                //     })
                filtersDispatch(sortByPrice("highToLow"))
                   }
                checked={sort==="highToLow" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                inline
                label="Include Out of Stock"
                name="group1"
                type="checkbox"
                id={`inline-3`}
                onChange={() =>
                // productDispatch({
                //     type: "FILTER_BY_STOCK"
                // })
                filtersDispatch(filterByStock())
                }
                checked={byStock}
                />
            </span>
            <span>
                <Form.Check
                inline
                label="Fast Delivery Only"
                name="group1"
                type="checkbox"
                id={`inline-4`}
                onChange={() =>
                    // productDispatch({
                    //     type: "FILTER_BY_DELIVERY"
                    // })
                    filtersDispatch(filterByDelivery())
                    }
                    checked={byFastDelivery}
                />
            </span>
            <span>
                <label style={{paddingRight:10}}>Rating: </label>
                <Rating 
                rating={byRating}
                 onClick={(i) => 
                //  productDispatch({
                //      type:"FILTER_BY_RATING",
                //      payload:i+1
                //  })
                filtersDispatch(filterByRating(i+1))
                } 
                 style={{cursor:"pointer"}} />
            </span>
            <Button
             variant="light" 
             onClick={() =>
                // productDispatch({
                //     type:"CLEAR_FILTERS"
                // })
                filtersDispatch(clearFilters())
            }
             >Clear Filters</Button>
        </div>
    )
}

export default Filters
