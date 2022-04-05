import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useHistory, Link } from 'react-router-dom'
import { loginAuth } from '../../utils/index';
import Navbaar from "./Navbar";





function Login() {

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const history = useHistory();
     const [passwordType, setPasswordType] = useState("password");
     const [passwordInput, setPasswordInput] = useState("");

     //validate form data
    const [emailErr,setEmailErr] = useState({});
    const [passwordErr,setPasswordErr] = useState({});

    //validation
     const formValidation = () =>{ 
        const emailErr= {};
        const passwordErr = {};
        let isValid =true;
        if(!email.trim()){
            emailErr.emailrq = "Email field is required";
            isValid = false;
        }
        if(!password){
            passwordErr.passwordreq = "password is required";
            isValid = false;
        }
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        return isValid;
     }

    async function logindata() {

        let item = { email, password };
        //use validation
        const isValid = formValidation(); 
  
        if (password === "" || email === "") {
            //alert("fill form")
       

        }
        else {

            let result = await fetch("https://61d6b80c35f71e0017c2e79e.mockapi.io/details", {
                method: 'GET',
                // body: JSON.parse(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })

            

            result = await result.json()



            console.log("result", result);

            if (userExists(item)) {
                localStorage.removeItem("user-info")
                localStorage.setItem("user-info", JSON.stringify(item))
                loginAuth()
                history.push("/main")
            }
            else {
                alert("account does not exist please signup")
            }
           

            function userExists(data) {
                return result.some(function (el) {

                    return (el.password === data.password && el.email === data.email);

                });
            }
        }
    }

    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }

    return (
    <div className="container-fluid h-100"> 
            <div className="row">
            <Navbaar />   
            </div>
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                  <div className="col">
                    <div className="my-3">
                        <h3 align="center">Login to the Github</h3>
                     <div className="col-sm-6 align-center mx-auto">
                        <div className="border rounded mx-0 p-3 ">  
                            {/* EMAIL FIELD START */}
                             <div className="mb-3 ">
                                    <label className="w-100 py-2 ">Username or email address
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Email"
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control  w-100"/>
                                   {Object.keys(emailErr).map((key)=>{
                                    return <div style={{color:"red"}}>{emailErr[key]}</div>
                                    })}
                               </div>
                                    {/* EMAIL FIELD END */}
                               <div className="mb-3">
                                  <label className=" w-100 py-2 ">Password:
                                   </label>
                                     <div className="position-relative">
                                           <input
                                            type={passwordType}
                                            autoComplete="off"
                                            name="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control  w-100"/>
                                        
                                            <span className="position-absolute eye-btn ">{ passwordType==="password"? <i onClick={togglePassword} className="fa fa-eye-slash eye-btn"></i> :<i onClick={togglePassword} className="fa fa-eye"></i> }</span>
                                     </div>

                                    {Object.keys(passwordErr).map((key)=>{
                                    return
                                     <div style={{color:"red"}}>{passwordErr[key]}
                                    </div>
                                    })}
                               </div>

                               
                                  <div className="my-5">
                                     <Link to="/main">   <button className="btn btn-success px-5 w-100" onClick={logindata}>
                                         Login
                                        </button></Link>

                                      
                                        {/* <Link to="/forgot-password"><button  className="btn btn-primary m-2">Forgot password</button></Link> */}
                                        {/* <Link to="/reset-password"><button  className="btn btn-primary m-2">Reset Password </button></Link> */}
                                  </div>
                                  <div className="text-end ">
                                       <Link to="/reset-password" className="text-decoration-none "> Forgot password?</Link>
                                   </div> 
                            </div> 

                            <div className="col border  rounded  py-2 my-3 text-center">  
                              <span> New to GitHub? <Link to="/register" className="text-decoration-none"> Create an account. </Link></span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    );
}

export default Login;