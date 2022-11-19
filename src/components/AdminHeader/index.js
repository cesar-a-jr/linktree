import './Header.css'

import { auth } from '../../services/firebaseconection'
import {signOut} from 'firebase/auth'
import {BiLogOut} from 'react-icons/bi'
import {Link} from 'react-router-dom'

export function AdminHeader(){
  return(
    <header className='admin-header'>
      <nav className='nav-header'>
        <button onClick={()=>signOut(auth)}>
          <BiLogOut size={28} color="#db2629"/>
        </button>

        <Link to={'/admin'}>
          Links
        </Link>

        <Link to={'/admin/social'}>
          Redes Sociais
        </Link>
      </nav>
    </header>
  )
}