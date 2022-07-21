import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Cart from './Cart.js'
import { addItem } from "./../store.js"
import { useDispatch } from "react-redux";



function Detail(props) {


    let {id} = useParams();
    let pickItem = props.shoes.find(function(x){ return x.id == id; });
    let [tab, setTab] = useState(0);
    let [ani, setAni] = useState('');

    let dispatch = useDispatch();

    useEffect(()=> {

        let watchedItem = localStorage.getItem('watched');
        watchedItem = JSON.parse(watchedItem);
        watchedItem.push(pickItem.id);

        watchedItem = new Set(watchedItem); //중복제거
        watchedItem = Array.from(watchedItem); //Set->Array 변환

        localStorage.setItem('watched', JSON.stringify(watchedItem));

    },[])


    // function putWatchItem() {
    //     let watchedJson = JSON.parse(localStorage.getItem('watched'));
    //     if (watchedJson.length !== 0) {
    //         let itemIndex = watchedJson.findIndex(element => element = id);
    //         console.log(itemIndex)
    //         if (itemIndex !== -1) {
    //             watchedJson.unshift(watchedJson[itemIndex]);
    //             watchedJson.splice(itemIndex+1, 1);
    //         } else {
    //             watchedJson.unshift(id);
    //         }
    //     } else {
    //         watchedJson.unshift(id);
    //     }
    //     localStorage.setItem('watched', JSON.stringify(watchedJson))
    // }


    setTimeout(() => {
        setAni('end');
    }, 100);


    return (
        <div className={`container start ${ani}`}>
            {
                alert == true 
                ? <div className="alert alert-warning">
                    2초 이내 구매시 할인    
                </div>
                : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{pickItem.title}</h4>
                    <p>{pickItem.content}</p>
                    <p>{pickItem.price}원</p>
                    {/* <button className="btn btn-danger" onClick={()=>{dispatch(addItem(pickItem))}}>주문하기</button>  */}
                    <button className="btn btn-danger" onClick={()=>{dispatch(addItem({id : pickItem.id, name:pickItem.title, count : 1}))}}>주문하기</button> 

                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item> 
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} shoes={props.shoes}/>
            <Cart />
        </div> 
    )
}
function TabContent({tab, shoes}) {
    // if (tab == 0) {
    //     return <div>내용0</div>
    // } else if (tab == 1) {
    //     return <div>내용1</div>
    // } else if (tab == 2) {
    //     return <div>내용2</div>
    // }
//    return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]  <-- 이 방법도 좋음
    
    let [fade, setFade] = useState('');

    useEffect(()=>{
        let a = setTimeout(() => {setFade('end')}, 100);
        return ()=>{
            clearTimeout(a)
            setFade('');
        }    
    },[tab])

    return (<div className={`start ${fade}`}>
        { [<div>내용0 {shoes[0].id}</div>, <div>내용1</div>, <div>내용2</div>][tab] }
        </div>)

}

export default Detail;

// 숙제 본 상품 띄우기