import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import View from "./components/View"
import { Toaster } from "react-hot-toast";
function App() {
  return (
   <BrowserRouter>
     <Toaster position="top-center" reverseOrder={false} />
   <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/add' element={<Form/>}/>
    <Route path='/view' element={<View/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
