import { faker } from '@faker-js/faker';
import {createSlice} from '@reduxjs/toolkit';

faker.seed(99);

 export  const products = [...Array(20)].map(() =>({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:faker.commerce.price(),
        image:faker.image.fashion(),
        inStock:faker.helpers.arrayElement([0,3,5,6,7]),
        fastDelivery:faker.datatype.boolean(),
        ratings:faker.helpers.arrayElement([1,2,3,4,5])
    }))

    const initialState = {
        products:products,
        cart:[]
    }

export const cartSlice = createSlice({
    name:"cart",
    initialState:{value:initialState},
    reducers:{
        addToCart:(state,action) =>{
            // return {...state,cart:[...state.cart,{...action.payload,qty:1}]}
            state.value = {...state.value,cart:[...state.value.cart,{...action.payload,qty:1}]}
        },
        removeFromCart:(state,action) =>{
            // return{...state,cart:state.cart.filter(c => c.id !== action.payload.id)}
            state.value = {...state.value,cart:state.value.cart.filter(c => c.id !== action.payload.id)}
        },
        changeCartQuantity: (state,action) =>{
            // return {
            //     ...state,
            //     cart:state.cart.filter((c) =>
            //      c.id === action.payload.id ? (c.qty = action.payload.qty) :c.qty
            //      )}
            state.value = {...state.value,cart:state.value.cart.filter((c) => c.id === action.payload.id ? (c.qty=action.payload.qty): c.qty)}
        }
    }
})


export const {addToCart,removeFromCart,changeCartQuantity} = cartSlice.actions;

export default cartSlice.reducer;