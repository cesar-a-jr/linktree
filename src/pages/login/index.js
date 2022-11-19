import { useState } from "react"
import { auth } from "../../services/firebaseconection"
import "./login.css"
import {signInWithEmailAndPassword} from 'firebase/auth'
import {toast} from 'react-toastify'

import {Logo} from '../../components/logo'
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { Sociais } from "../../components/Sociais"


export default function Login(){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate();

  function handleLogin(e){
    e.preventDefault()

    if(email === '' || senha === ''){
      alert("Preencha todos os campos!")
      return;
    }
    signInWithEmailAndPassword(auth, email, senha)
    .then(()=>{
      navigate("/admin")
    })
    .catch(()=>{
      toast.error('Email ou Senha incorretos!',{
        position: toast.POSITION.BOTTOM_RIGHT,}
      )
    })
  }

  return(
    <div className="login-container">
      <div className="login-content">
      <Logo/>
      <h2 className="login-title">Realizar login:</h2>
      <form className="form" action="form" onSubmit={handleLogin}>

        <Input 
          type="email"  
          placeholder='Digite seu email!' 
          value={email} 
          onChange={(e)=> setEmail(e.target.value)}/>
          
        <Input 
          type="password"  
          placeholder='*******' 
          autoComplete='on'
          value={senha} 
          onChange={(e)=> setSenha(e.target.value)}/>
        <button type='submit'>Acessar</button>

      </form>

      <h2 className="logWiht">ou entre com:</h2>
      <Sociais/>
      <p>Não tem uma conta?<span className="link-register"><Link to="/register">Registrar</Link></span></p>
      </div>
      <div className="side">

      </div>
      
    </div>
  )
}