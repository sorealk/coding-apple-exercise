import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Carousel, ListGroup } from 'react-bootstrap';
import {Routes, Route, useNavigate, Outlet} from 'react-router-dom'
import axios from 'axios';
import backimg from './img/backimg.jpg'
import './App.css';
import data from './data.js';
import {useQuery} from "react-query"


const Detail = lazy(()=> import('./routes/Detail.js'))
const Cart = lazy(()=> import('./routes/Cart.js'))


function App() {

  useEffect(()=> {
    //값있으면 초기화 안하도록
    if(localStorage.getItem('watched')){
    } else {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  let obj = {name : 'kim'};
  obj = JSON.stringify(obj);
  localStorage.setItem('data', obj);

  let outlet = localStorage.getItem('data');
  JSON.parse(outlet);


  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [click, setClick] = useState(2);
  let [show, setShow] = useState(true);
  let [load, setLoad] = useState(false);


  let result = useQuery('naming', ()=>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      return a.data;
    }),
    {staleTime : 2000}
  )



  function addData() {
    
    setLoad(true);

    if (click > 3) {
      window.alert('상품이 더 이상 존재하지 않습니다.');
      setShow(false);
      setLoad(false);
      return;
    }

    let url = 'https://codingapple1.github.io/shop/data'+click+'.json';

    //ajax 옵션 3개 1)XMLHttpRequest 2)fetch() 3)axios
    axios.get(url)
    .then((result)=>{
      let newData = [...shoes, ...result.data];
      setShoes(newData);
      setLoad(false);
    })
    .catch(()=>{
      setLoad(false);
    })

  }

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={()=>{navigate(-1)}}>JINY SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중임</div>}>   
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{backgroundImage: 'url('+backimg+')'}}></div>
              <Container>
              <Row className="justify-content-md-center">
                { shoes.map(function(a, i){
                  return (<Card item={a} num={i+1} />)
                })}        
              </Row>
            </Container>
          </>
        }/>
        <Route path="/detail/:id" element={
             
          <Detail shoes={shoes}/>

        }/>
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>404</div>}/>
      </Routes>  
      </Suspense>
      {
        load == true
        ? <div>......불러오는 중</div>
        : null
      }
      {
        show == true ?       
        <button onClick={()=>addData()}>더보기</button>
        : null
      }
      <Watched shoes={shoes}/>
    </div>
  );
}

function About() {
  return(
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <>
    <Col xs lg="2">
      <img src={'https://codingapple1.github.io/shop/shoes'+ props.num + '.jpg'} width="80%"/>
      <a href={ '/detail/' + props.item.id}><h4>{props.item.title}</h4></a>
      <p>{props.item.content}</p>
      <p>{props.item.price}</p>
    </Col>
    </>
  )
}


function Watched(props) {
  return(
  <>
  <div>내가 본 상품</div>
  <ListGroup>
      {localStorage.getItem('watched')?
      JSON.parse(localStorage.getItem('watched')).map(function(a, i){
        return(
          <ListGroup.Item>{props.shoes[a].title}</ListGroup.Item>
        )
      })
      :
      <ListGroup.Item>없음</ListGroup.Item>
      }
    </ListGroup>
  </>
  )
}



export default App;


// 로컬 스토리지 숙제 1 최근 본 상품 상품번호들 로컬 스토리지에 저장
// watched, array 자료형
// 주의 1 중복번호는 막기 set 쓰면 제거 쉬움
// 주의 2 사이트 처음접속시 [] 자료형이 있어야 함. useEffect