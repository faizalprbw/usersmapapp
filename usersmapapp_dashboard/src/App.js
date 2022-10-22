import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Profile} from "./components/Profile";
import {Map} from "./components/Map"; 
import {commonFunctions} from "./helpers/commonFunctions"
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';


function App() {
   const [ isLogged , SetIsLogged ] = useState(false)

   useEffect ( ()=> { 
      SetIsLogged(localStorage.getItem("token"))
      commonFunctions.getUsers(localStorage.getItem("token"))
   } , [])

   const getLogout = () => {
      localStorage.clear();
      SetIsLogged(false);
      window.location.reload();
   }

   return <BrowserRouter>

      <header className="p-2 bg-light text-dark">
         <div className="container">
               <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                  {isLogged ? 
                     <div className="text-end">
                        <span>Hallo <b>{localStorage.getItem('profilename')}</b> </span>
                        <Link to="/dashboard/profile" className="btn btn-primary me-2">My Profile</Link>
                        <Button onClick={getLogout} className="btn btn-primary me-2">Logout</Button>
                     </div>
                  : 
                     <div className="text-end">
                           <Link to="/dashboard/login" className="btn btn-primary me-2">Login</Link>
                           <Link to="/dashboard/register" className="btn btn-primary me-2">Register</Link>
                     </div>
                     
                  }
               </div>
         </div>
      </header>

      <Routes>
         <Route path="/dashboard/profile" element={<Profile isLogged={isLogged} />}/>
         <Route path="/dashboard/login" element={<Login SetIsLogged={SetIsLogged} />}/>
         <Route path="/dashboard/register" element={<Register/>}/>
      </Routes>
      <Map/>

   </BrowserRouter>;
}

export default App;
