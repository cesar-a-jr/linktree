import './Header.css'

import {FaLink} from "react-icons/fa"
import { Link } from 'react-router-dom'


export function Header(){
  return(
    <header className="header-public">
      <div className='header-content'>
        <div className='header-logo'>
          <button>
            <FaLink/>
          </button>
          <span>Multi.Link</span>
        </div>
        <div>
          <Link to="/login" className='header-login'>
            Entrar
          </Link>
          <Link to="/register" className='header-register'>
            Registre-se
          </Link>
        </div>
      </div>

    </header>
  )
}