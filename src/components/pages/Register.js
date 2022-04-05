import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { login,selectUser } from '../../features/UserSlice'
import {loginAuth} from "../../utils/index"
import {useDispatch,useSelector} from "react-redux"
import Navbaar from './Navbar'
// import {useFormik} from 'formik';

function Register() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [number,setNumber]=useState("")
    const [role,setRole]=useState("")
    const [gender,setGender]=useState("")

    const [disable, setDisable] = useState(false);
       const dispatch = useDispatch();
    // const selector= useSelector(selectUser)
        const history = useHistory();
    // console.log("selector 1",selector);
 //validate form data
 const [nameErr,setNamedErr] = useState({});
 const [emailErr,setEmailErr] = useState({});
 const [passwordErr,setPasswordErr] = useState({});
 const [numberErr,setNumberErr] = useState({});
 //validation
   const formValidation = () =>{

      const nameErr={};
     const emailErr= {};
     const passwordErr = {};
     const numberErr = {};
    //  const allValidation={};
     let isValid =true;
     if(!name){
        nameErr.namereq = "Name is required";
        isValid = false;
    }
     if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
         emailErr.emailreq = "Email field is required";
         isValid = false;
     }
          
     if(!password){
         passwordErr.passwordreq = "password is required";
         isValid = false;
     }
     if(!number){
        numberErr.numberreq = "password is required";
        isValid = false;
    }
                  setNamedErr(nameErr);
                  setEmailErr(emailErr);
                 setPasswordErr(passwordErr);
                 setNumberErr(numberErr);

   

     return isValid;
  }
  



    async function signUp() {
       
       
        const isValid = formValidation(); 
        
        if (name === "" || password === "" || email === "" ||number=="" ) {
            // alert("fill form")
        }
        
        else {
         
            let item = { name, email, password,number,role,gender}
           
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
            console.log("result", result)
            localStorage.setItem("user-info", JSON.stringify(item))
            localStorage.setItem("user-state","true")
            // alert("account created")
            console.log("user-info")
            loginAuth()
            history.push("/main")

            dispatch(login({
                name:name,
                email:email,
                password:password,
                number:number,
                role:role,
                gender:gender,
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
                <div className="col-lg-6 align-center mx-auto">
                
                    <h3 align="center">Register</h3>
                    <form onsubmit="{handleSubmit}">
                   <div className="border  rounded    p-3">
                      {/* NAME FIELD  */}
                     <div className="mb-3">
                            <label className="m-2">Name:</label>
                            
                            <input  className="mx-2" type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"  autoComplete='off' required placeholder="Name" />
                            {Object.keys(nameErr).map((key)=>{
                                return <div style={{color:"red"}}>{nameErr[key]}</div>
                            })}
                      </div>
                    
                      {/* NAME FIELD END */}
                       {/* NUMBER FIELD START */}
                       <div className="mb-3">
                            <label className="m-2" >Number:</label>
                            <input  className="mx-2" type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="form-control" autoComplete='off' required placeholder="Number" />
                            {Object.keys(numberErr).map((key)=>{
                                return <div style={{color:"red"}}>{numberErr[key]}</div>
                            })}
                        </div>
                              {/* NUMBER FIELD END */}
                              {/* EMAIL FIELD  */}
                             <div className="mb-3">
                                    <label className="m-2">Email:</label>
                                    <input  className="mx-2" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required autoComplete='off'  placeholder="Email" />
                                    {Object.keys(emailErr).map((key)=>{
                                        return <div style={{color:"red"}}>{emailErr[key]}</div>
                                    })}
                             </div>
                                {/*    EMAIL FIELD END */}
                    
                               {/* ROLE FIELD START */}
                               <div className="d-flex justify-content-between form-control">
                                   <div>
                                        <label className="mx-2 my-2">Role:</label>
                                        <label class="radio-inline">
                                        <input type="radio"  name="role" value="Interviewer"/>
                                        <span className="mx-2">Interviewer</span>
                                        </label>
                                        <label class="radio-inline">
                                        <input type="radio"  name="role" value="Candidate"/><span className="mx-2">Candidate</span></label>
                                    </div>
                                    {/* GENDER FIELD START */}
                                   <div>

                                        <label className="mx-2 my-2">Gender:</label>
                                        <label class="radio-inline">
                                        <input type="radio"  name="gender"/> <span className="mx-2">Female</span></label>
                                        <label class="radio-inline">
                                        <input type="radio" name="gender"/>  <span className="mx-2">Male</span></label>
                                   </div>
                                  {/* GENDER FIELD END */}
                                </div>
                                {/*PASSWORD  FIELD  */}
                               <div className="mb-3">
                                    <label className="m-2">Password:</label>
                                    
                                    <input className="mx-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required placeholder="Password" />
                                    {Object.keys(passwordErr).map((key)=>{
                                        return <div style={{color:"red"}}>{passwordErr[key]}</div>
                                    })}
                                </div>
                               {/* PASSWORD FIELD  */}
                              <div className="mb-3">
                                 <button className="mx-5" disabled={disable} onClick={signUp} className="btn btn-success w-100">Register</button>
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

export default Register