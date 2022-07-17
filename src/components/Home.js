import React from 'react'
import { CartState } from '../context/Context';
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import './styles.css';
import { useSelector} from 'react-redux';

const Home = () => {
    const productsRedux = useSelector((state) =>state.cart.value.products);
    const {byStock,byFastDelivery,sort,byRating,searchQuery} =useSelector((state) =>state.filters.value);
    console.log(productsRedux)
    console.log(byStock,byFastDelivery,sort,byRating,searchQuery);
    const {
        state:{products},
        // productState:{byStock,byFastDelivery,sort,byRating,searchQuery}
    } = CartState();

    const transformProducts = () =>{
        let sortedProducts = productsRedux

        if(sort){
            sortedProducts = sortedProducts.slice().sort((a,b) =>(
                sort==='lowToHigh'?a.price-b.price:b.price-a.price
            ))
        }

        if(!byStock){
            sortedProducts = sortedProducts.filter((prod) => prod.inStock)
        }

        if(byFastDelivery){
            sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
        }

        if(byRating) {
            sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating)
        }

        if(searchQuery) {
            sortedProducts = sortedProducts.filter((prod) =>
            prod.name.toLowerCase().includes(searchQuery)
            )
        }

        return sortedProducts;
    }
    return (
        <div className="home">
            <Filters />
            <div className="productContainer">
              {transformProducts().map((prod) =>{
                  return <SingleProduct prod={prod} key={prod.id}/>
              })}
            </div>
        </div>
    )
}

export default Home
