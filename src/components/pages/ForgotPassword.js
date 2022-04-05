import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useHistory, Link } from 'react-router-dom'
import { loginAuth } from '../../utils/index';
import Navbaar from "./Navbar";


function ResetPassword() {

     const [email, setEmail] = useState("");
     const history = useHistory();

     //validate form data
    const [emailErr,setEmailErr] = useState({});
      //validation
     const formValidation = () =>{
        const emailErr= {};
        let isValid =true;
        if(!email.trim()){
            emailErr.emailrq = "Email field is required";
            isValid = false;
        }
         setEmailErr(emailErr);
         return isValid;
     }

    async function logindata() {

        let item = {email};
        //use validation
        const isValid = formValidation(); 
  
        if (email === "") {
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

                    return ( el.email === data.email);

                });
            }
        }
    }

    return (
    <div className="container-fluid h-100"> 
        <div className="row">
           <Navbaar />   
        </div>
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                
                <div className="col-lg-6 align-center mx-auto ">
                        <h3 align="center ">Reset your password</h3>
                    
                        <div className="border border-2  rounded p-2  ">  
                                    {/* EMAIL FIELD START */}
                                <div className="my-2">
                                            <label className="m-2">Enter your user account's verified email address and we will send you a password reset link.
                                            </label>
                                            <input
                                            type="text"
                                            placeholder="Enter your email address"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control w-100"/>
                                        {Object.keys(emailErr).map((key)=>{
                                            return <div style={{color:"red"}}>{emailErr[key]}</div>
                                            })}
                                </div>
                                        {/* EMAIL FIELD END */}
                                
                                        
                                <div className="mb-3">
                                <Link to="./update-password"> <button  onClick={logindata} className="btn btn-success w-100 ">Reset Password</button></Link>
                                </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>    
    );
}

export default  ResetPassword;
