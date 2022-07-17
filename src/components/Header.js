import React from 'react';
import { Badge, Container, Dropdown, FormControl, Nav, Navbar,Button } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import {FaShoppingCart} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';
import "./styles.css";
const Header = () => {
   const {
       state:{ cart},
       dispatch,
       productDispatch
    } =  CartState();
    return (
        <div>
            <Navbar bg="dark" variant="dark" style={{height:80}}>
                <Container>
                    <Navbar.Brand>
                        <Link to="/">Shopping cart</Link>
                    </Navbar.Brand>
                    <Navbar.Text>
                        <FormControl 
                        style={{width:500}} 
                        placeholder="Search a product" 
                        className="m-auto search" 
                        onChange={(e) =>{
                            productDispatch({
                                type:'FILTER_BY_SEARCH',
                                payload:e.target.value
                            })
                        }}
                        />
                    </Navbar.Text>
                    <Nav>
                        <Dropdown alignRight>
                       <Dropdown.Toggle variant="success">
                       <FaShoppingCart color="white" fontSize="25px" />
                       <Badge>{cart.length}</Badge>
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                           {cart.length > 0 ? (
                               <>{
                                   cart.map(prod => (
                                       <span className="cartitem" key={prod.id}>
                                       <img
                                        src={prod.image}
                                        className="cartItemImg"
                                        alt={prod.name}
                                       />
                                       <div className="cartItemDetail">
                                         <span>{prod.name}</span>
                                         <span>${prod.price.split(".")[0]}</span>
                                       </div>
                                       <AiFillDelete
                                        fontSize="20px"
                                        style={{cursor:"pointer"}}
                                        onClick={() =>
                                            dispatch({
                                                type:"REMOVE_FROM_CART",
                                                payload:prod
                                            })
                                        }
                                       />
                                       </span>
                                   ))
                               }
                               <Link to="/cart">
                                   <Button style={{width:"93%",margin:"0 10px"}}>
                                       Go to Cart
                                   </Button>
                               </Link>
                               </>
                           ) : (
                                <span style={{padding:10}}>Cart is empty!</span>
                           )}
                       </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
