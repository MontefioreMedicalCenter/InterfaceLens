import React from 'react'
//import AppRouter from './AppConfig/AppRouter'
//import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import AppRouter from './/AppConfig/AppRouter'
import Login from './Login/view'



// function App() {
//   return (
//     <div className="App">
//     {/* 
//      */}
//      <AppRouter />
//      <Login/>
//   </div>
//   );
// }



function App() {
  const islog = localStorage.getItem('loginModel')
  return (
    <div className="App">
     
   
      <AppRouter/>
      {!islog && <Login/>}
           
     
    </div>
  );
}

//export default App;

export default App;
