import { useState, useEffect } from "react"

import { auth } from "../services/firebaseconection"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate } from "react-router-dom"
// eslint-disable-next-line
import { async } from "@firebase/util"

export default function Privite({children}){
  const [loading, setLoading] = useState(true)
  const [singed, setSinged] =useState(false)

  useEffect(()=>{
    async function checkLogin(){
      // eslint-disable-next-line
      const unsub =onAuthStateChanged(auth,(user)=>{

        if(user){
          const userData = {
            uid: user.uid,
            email: user.email,
          }
          localStorage.setItem("@detailUser", JSON.stringify(userData))
          setLoading(false);
          setSinged(true);
        }else{
          setLoading(false);
          setSinged(false)
        }
      })
    }
    checkLogin()
  },[])

  if(loading){
    return(
      <div></div>
    )
  }

  if(!singed){
    return  <Navigate to="/login"/>
  }

  return( children )
}