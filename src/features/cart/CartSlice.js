import { createSlice, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/ModalSlice";


const url='https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: [],
    amount: 5,
    total: 0,
    isLoading: true,

}


// using axios
 export const getCartItems = createAsyncThunk('cart/getCartItems', async (name,thunkAPI)=>{
try {
    // console.log(name)
    // console.log(thunkAPI.getState())
    // thunkAPI.dispatch(openModal())
    const resp= await axios(url)
    // console.log(resp)
    return resp.data
} catch (error) {
    return thunkAPI.rejectWithValue('Something went wrong')
}

 }) 


//  using fetch
// export const getCartItems = createAsyncThunk('cart/getCartItems', ()=>{
//     return fetch(url)
//     .then(resp=>resp.json())
//     .catch((err)=>console.log(err))


// }) 

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {

            state.cartItems = [];

        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => (
                item.id !== itemId
            ))
        },

        increaseItem: (state, action) => {
            const itemToIncrease = state.cartItems.find((item) => item.id === action.payload)
            itemToIncrease.amount = itemToIncrease.amount + 1
        },

        decreaseItem: (state, action) => {
            const itemToDecrease = state.cartItems.find((item) => item.id === action.payload)
            itemToDecrease.amount = itemToDecrease.amount - 1
        },
        calculateTotal: (state, action) => {
let amount=0;
let total =0 ;
state.cartItems.forEach((item)=>{
    amount+=item.amount
    total+=item.amount * item.price
})
state.amount=amount
state.total=total

        }
    },

    extraReducers:{
        [getCartItems.pending]:(state)=>{
            state.isLoading=true
        },
        [getCartItems.fulfilled]:(state,action)=>{
            console.log(action)
            state.isLoading=false
            state.cartItems=action.payload

        },
        [getCartItems.rejected]:(state,action)=>{
            state.isLoading=false
            console.log(action)
        },
    }
})


export default CartSlice.reducer
export const { clearCart, removeItem, increaseItem, decreaseItem,calculateTotal } = CartSlice.actions;
