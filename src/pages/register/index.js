import { useState } from "react"
import {Logo} from '../../components/logo'
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { auth } from "../../services/firebaseconection"
import "./register.css"
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { Sociais } from "../../components/Sociais"






export default function Register(){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate();

  


  function handleLogin(e){
    e.preventDefault()

    if(email === '' || senha === ''){
      alert("Preencha todos os campos!")
      return;
    }
    createUserWithEmailAndPassword(auth, email, senha)
    .then(()=>{
      navigate("/admin")
    })
    .catch(()=>{
      console.log('Erro')
    })
  }

  return(
    <div className="login-container">
      <div className="login-content">
      <Logo/>
      <h2 className="login-title">Realizar cadastro:</h2>
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
        <button type='submit'>Cadastrar</button>

      </form>

      <h2 className="logWiht">ou entre com:</h2>
      <Sociais/>
      <p>Ja tem uma conta?<span className="link-register"><Link to="/login">Entrar</Link></span></p>
      </div>
      <div className="side">

      </div>
      
    </div>
  )
}