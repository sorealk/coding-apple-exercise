import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from "./../store/userSlice.js";
import { addCount, deleteItem } from "./../store.js";

function Cart() {

    let state = useSelector((state)=>{ return state });
    let user = useSelector((state)=> {return state.user}); // 원하는 store state만 골라서 가져올 수 있음.

    let dispatch = useDispatch();

    return(
        <div>
            <h6>{state.user.name}{state.user.age}의 장바구니</h6>
            <button onClick={()=>{dispatch(increase(100))}}>버튼</button>
            <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    <th>삭제하기</th>
                </tr>
            </thead>
            <tbody>
                { 
                    state.cart.map((a, i)=>
                    <tr key={i}>
                        <td>{state.cart[i].id}</td>
                        <td>{a.name}</td>
                        <td>{a.count}</td>
                        <td><button onClick={()=>{
                           dispatch(addCount(a))
                        }}>+</button></td>
                        <td><button onClick={()=>dispatch(deleteItem(state.cart[i].id))}>삭제</button></td>
                    </tr>
                    ) 
                }
            </tbody>
            </Table>
        </div>
    )
}

export default Cart

//숙제1 +버튼 누르면 수량 +1 되도록 (순서 바뀌어도 매칭 되도록)
//숙제2 주문하기 버튼 누르면 장바구니 상품 추가하기


//응용1 장바구니 항목 삭제
//응용2 같은 상품 있을시 새 아이템 추가 아닌 카운트 올리기