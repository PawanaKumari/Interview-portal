import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import {logoutAuth } from '../../utils/index';




const Main = () => {

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

    // console.log(localStorage.getItem('user-info'),"local")
    return (
        <div className="container">
            <div className="row">
                <div className="col my-5 text-center">
                  <h1>You are  Logged In</h1>
                  <div className="d-flex justify-content-center mr-2">  
                       {/* <div className="mx-2">
                            <button className="btn btn-success" onClick={()=>setstate(true)}>Show  details 
                                </button>
                                {state?(<>
                               
                                <span> email:{data.email}</span>
                                <button className="btn btn-success " onClick={()=>setstate(false)}>Hide</button>
                                </>):""}
                        </div> */}
                            <div className="mx-2">
                              <button className="btn btn-success mr-5" onClick={clear}>Logout</button>
                            </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Main

