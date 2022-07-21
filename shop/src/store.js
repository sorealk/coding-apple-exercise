import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";


let stock = createSlice({
    name : 'stock',
    initialState: [10, 11, 12]
})

let cart = createSlice({
    name : 'cart',
    initialState: 
        [
            {id : 0, name : 'White and Black', count : 2},
            {id : 2, name : 'Grey Yordan', count : 1}
        ],
    reducers : {
        addCount(state, action){
            // 반복문
            for (let i=0; i<state.length; i++) {
                if (action.payload.id == state[i].id) {
                    state[i].count += 1;
                    return;
                }
            }
            // findIndex
            // let num = state.findIndex((a)=> {return a.id == action.payload} )
            // state[num].count++;
        },
        addItem(state, action) {
            let num = state.findIndex((element)=>{return element.id == action.payload.id});
            if (num !== -1) {
                state[num].count++;
            } else {
                state.push(action.payload);
            }
        },
        deleteItem(state, action) {
            // filter 안먹음;;;
            // state = state.filter((element)=> element.id !== action.payload);

            // splice로 특정값 삭제는 먹음
            for (let i=0; i<state.length; i++) {
                if (state[i].id == action.payload) {
                    state.splice(i, 1);
                    i--;
                }
            }

        }
    }
})

export let { addItem, addCount, deleteItem } = cart.actions

export default configureStore({
    reducer: {
        stock : stock.reducer,
        user : user.reducer,
        cart : cart.reducer
    }
})