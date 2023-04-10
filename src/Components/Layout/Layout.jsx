import React from 'react'
import styles from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';
import { useNavigate } from 'react-router-dom';

export default function Layout({userData,setUserData}) {
  let navigate = useNavigate();
  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login')
  }
  return <>
  <Navbar userData={userData} logOut={logOut}/>
 
  <Outlet />

  <Footer />
  </>
}
