import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router-dom';
import {Navbar, NavItem,NavbarToggler,Collapse,NavLink, Nav,NavbarBrand} from 'reactstrap';
import { useHistory } from 'react-router-dom'
import {logoutAuth } from '../../utils/index';

const Home = () => {
    const [state, setstate] = useState(false)
    let data=JSON.parse( localStorage.getItem('user-info'))
    console.log(data,"data");
    const history = useHistory();
    function clear(){
        // localStorage.clear()
        // history.push("/")
        logoutAuth()
        history.push("/")
      
        console.log("ddddddddddddddddddddd",JSON.parse( localStorage.getItem('user-info')))

        localStorage.setItem("user-state","false")
        
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                        <div>
                            <Navbar color="success" expand="lg" fixed="top" light className="text-white">
                                <NavbarBrand className="text-white" href="/"> Reactstrap
                                </NavbarBrand>
                                <NavbarToggler onClick={function noRefCheck(){}} />
                                    <Collapse navbar>
                                        <Nav className="me-auto" navbar>
                                                <NavItem>
                                                    <Link className='text-white mx-5 text-decoration-none'  to="/register"> Register</Link>
                                                </NavItem>
                                                <NavItem>
                                                    <Link className='text-white text-decoration-none'  to="/login"> Login</Link>
                                                   
                                                </NavItem>
                                        </Nav>
                                        <div className="text-right">
                                                   <button className="btn btn-success  btn-small"  onClick={clear}>Log Out</button>
                                                </div>
                                    </Collapse>
                            </Navbar>
                    </div>
                    <div className="my=5">
                        Welcome to the home page 
                    </div>

                  </div>
           </div>
        </div>
    )
}

export default Home