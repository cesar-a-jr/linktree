import './Sociais.css'
import { auth } from "../../services/firebaseconection"
import { useNavigate } from "react-router-dom"
import {FcGoogle} from "react-icons/fc"
import {FaFacebookF} from "react-icons/fa"
import {signInWithPopup, GoogleAuthProvider, FacebookAuthProvider  } from 'firebase/auth'

export function Sociais(){
  const facebook = new FacebookAuthProvider();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  function singInWithFacebook(){
    signInWithPopup(auth, facebook)
    .then(()=>{
      navigate("/admin")
    })
    .catch((error) => {
  
      });
  
  }

  function singInWithGoogle(){
    signInWithPopup(auth, provider)
    .then(()=>{
      navigate("/admin")
    })
    .catch((error) => {
  
      });
  
  }
  return(
    <div className='btn-social'>
      <button onClick={singInWithGoogle}><FcGoogle size={30}/></button>
      <button onClick={singInWithFacebook}><FaFacebookF size={30}/></button>
    </div>
  )
} 