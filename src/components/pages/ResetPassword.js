import React, { useState } from 'react'
import { useHistory,Link } from 'react-router-dom'
import { login,selectUser } from '../../features/UserSlice'
import {loginAuth} from "../../utils/index"
import {useDispatch,useSelector} from "react-redux"
import Navbaar from './Navbar'
// import {useFormik} from 'formik';

function UpdatePassword() {
   
    const [newPassword, setNewPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [disable, setDisable] = useState(false);
   
    const dispatch = useDispatch();

    const history = useHistory();

 //validate form data
 
 const [newPasswordErr,setNewPasswordErr] = useState({});
 const [confPasswordErr,setConfPasswordErr] = useState({});


 //validation

  const formValidation = () =>{
     const newPasswordErr= {};
     const confPasswordErr = {};
    
    //  const allValidation={};
     let isValid =true;
     
     if(!newPassword){
         newPasswordErr.passwordreq = "password is required";
         isValid = false;
     }
     if(!newPassword===confPassword){
        confPasswordErr.confPasswordreq = "password is required";
        isValid = false;
     }
         setNewPasswordErr(newPasswordErr);
         setConfPasswordErr(confPasswordErr);
       
     return isValid;
  }
  
    async function signUp() {
       
        const isValid = formValidation(); 
        
        if (newPassword === "" || confPassword === "") {
            confPasswordErr.confPasswordreq = "password is required";
        }
        
        else {
           let item = { newPassword, confPassword}
           
            console.warn(item);
            let result = await fetch("https://61d6b80c35f71e0017c2e79e.mockapi.io/details", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })

            result = await result.json()
            // console.warn("result", result)
            localStorage.setItem("user-info", JSON.stringify(item))
            localStorage.setItem("user-state","true")
            // alert("account created")
            loginAuth()
            history.push("/main")

            dispatch(login({
                newPassword:newPassword,
                confPassword:confPassword,
                 loggedin:true
               
            }))
            // console.log("selector 2",selector);
        }
    }
 

    return (
    <div className="container-fluid h-100"> 
        <div className="row">
           <Navbaar />   
        </div>
      <div className="container h-100">
          <div className="row h-100 align-items-center"> 
             
                <div className="col-md-6 align-center mx-auto ">
                        <h3 align="center" className="">Update Password</h3>
                    <form onsubmit="{handleSubmit}">
                        <div className="border border-2 rounded  p-3">
                            {/* NEW PASSWORD  FIELD  */}
                              <div className="">
                                    <label className=" my-2">Set New Password:</label>
                                    <input  className="mx-2" type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" required   placeholder="Set New Password" />
                                    {Object.keys(newPasswordErr).map((key)=>{
                                        return <div style={{color:"red"}}>{newPasswordErr[key]}</div>
                                    })}
                                </div>
                                {/*    NEW PASSWORD FIELD END */}
                                <div className="">
                                    <label className="my-2">Confirm Password:</label>
                                    <input  className="mx-2" type="text" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="form-control" required   placeholder="Confirm Password" />
                                    {Object.keys(confPasswordErr).map((key)=>{
                                        return <div style={{color:"red"}}>{confPasswordErr[key]}</div>
                                    })}
                                </div>
                            
                                <div className="my-2">
                                    <Link to="/login"><button className="mx-5" disabled={disable} onClick={signUp} className="btn btn-success w-100">Update Password</button></Link>
                                </div>
                            </div>
                    </form>
                    {/* <Link to="/login"><button  className="btn btn-primary">login</button></Link> */}
                </div>
           </div>
    
        </div> 
    </div>
    )
}

export default UpdatePassword