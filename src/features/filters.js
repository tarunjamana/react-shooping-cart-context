import {createSlice} from '@reduxjs/toolkit';


const initialState ={
    byStock:false,
    byFastDelivery:false,
    byRating:0,
    searchQuery:""

}


export const filtersSlice = createSlice({
    name:"filters",
    initialState:{value:initialState},
    reducers:{
        sortByPrice:(state,action) =>{
            state.value ={...state.value,sort:action.payload}
        },
        filterByStock:(state) =>{
            state.value ={...state.value,byStock:!state.value.byStock}
        },
        filterByDelivery:(state) =>{
            state.value={...state.value,byFastDelivery:!state.value.byFastDelivery}
        },
        filterByRating:(state,action) =>{
            state.value={...state.value,byRating:action.payload}
        },
        filterBySearch:(state,action)=>{
            state.value={...state,searchQuery:action.payload}
        },
        clearFilters:(state) =>{
            state.value=initialState
        }
    }
})

export const {sortByPrice,filterByStock,filterByDelivery,filterByRating,filterBySearch,clearFilters} = filtersSlice.actions;

export default filtersSlice.reducer