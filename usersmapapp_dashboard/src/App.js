import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Home} from "./components/Home";
import {Map} from "./components/Map"; 
import {commonFunctions} from "./helpers/commonFunctions"
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';


function App() {
   const [ isLogged , SetIsLogged ] = useState(false)
   const [ displayname, setDisplayname ] = useState('')
   useEffect ( ()=> { 
      SetIsLogged(localStorage.getItem("token")) 
      commonFunctions.getUsers(localStorage.getItem("token"), setDisplayname)
   } , [])

   const getLogout = () => {
      localStorage.removeItem("token");
      SetIsLogged(false);
   }

   return <BrowserRouter>

      <header className="p-2 bg-light text-dark">
         <div className="container">
               <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                  {!isLogged ? 
                     <div className="text-end">
                           <Link to="/dashboard/login" className="btn btn-primary me-2">Login</Link>
                           <Link to="/dashboard/register" className="btn btn-primary me-2">Register</Link>
                     </div>
                  : 
                     <div className="text-end">
                        <span>Hallo <b>{displayname}</b> </span>
                        <Link to="/dashboard/profile" className="btn btn-primary me-2">My Profile</Link>
                        <Button onClick={getLogout} className="btn btn-primary me-2">Logout</Button>
                     </div>
                  }
               </div>
         </div>
      </header>

      <Routes>
         <Route path="/dashboard/home" element={<Home/>}/>
         <Route path="/dashboard/login" element={<Login SetIsLogged={SetIsLogged} setDisplayname={setDisplayname} />}/>
         <Route path="/dashboard/register" element={<Register/>}/>
      </Routes>
      <Map/>

   </BrowserRouter>;
}

export default App;
