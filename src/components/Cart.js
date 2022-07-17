import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { CartState } from '../context/Context'
import Rating from './Rating';
import { useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {changeCartQuantity,removeFromCart} from '../features/product';

const Cart = () => {

    const cartRedux =useSelector((state) => state.cart.value.cart);

    const cartDispatch = useDispatch();
    console.log(cartRedux);
   const {
       state:{cart},
       dispatch
    }= CartState()

    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal(cartRedux.reduce((acc,curr) =>acc + Number(curr.price)*curr.qty ,0))
    }, [cartRedux]);
    return (
        <div className="home">
            <div className="productContainer">
           <ListGroup>
               {
                   cartRedux.map(prod =>(
                       <ListGroup.Item key={prod.id}>
                       <Row>
                       <Col md={2}>
                              <Image src={prod.image} alt={prod.name} fluid rounded/>
                           </Col>
                           <Col md={2}>
                               <span>{prod.name}</span>
                           </Col>
                           <Col md={2}>$ {prod.price}</Col>
                           <Col md={2}>
                               <Rating rating={prod.ratings}/>
                           </Col>
                           <Col md={2}>
                           <Form.Control 
                           as="select" 
                           value={prod.qty}
                           onChange={(e) =>
                        //    dispatch({
                        //        type:"CHANGE_CART_QTY",
                        //        payload:{
                        //            id:prod.id,
                        //            qty:e.target.value
                        //        },
                        //    })
                        cartDispatch(changeCartQuantity(
                            {id:prod.id,
                             qty:e.target.value
                        }))
                         }
                           >
                            {[...Array(prod.inStock).keys()].map((x) =>(
                                <option key={x + 1}>{x + 1}</option>
                   ))}
                           </Form.Control>
                           </Col>
                           <Col md={2}>
                               <Button
                               type="button"
                               variant="light"
                               onClick={() =>
                                cartDispatch(removeFromCart(prod))
                              }
                               >
                              <AiFillDelete fontSize="20px" />
                               </Button>
                           </Col>
                       </Row>
                       </ListGroup.Item>
                   )) 
               }
           </ListGroup>
            </div>
            <div className="filters summary">
            <span className="title">Subtotal ({cartRedux.length}) items</span>
            <span style={{fontWeight:700,fontSize:20}}>Total : ${total}</span>
            <Button type="button" disabled={cartRedux.length === 0}>
              Proceed to Checkout
            </Button>
            </div>
        </div>
    )
}

export default Cart
