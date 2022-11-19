import './error.css'

import {Link} from 'react-router-dom'
import { Logo } from '../../components/logo'

export default function Error(){
  return(
    <div className='error'>
      <Logo/>
      <h1>pagina não existe</h1>

      <Link className='link' to={'/'}>
      Voltar para a Home
      </Link>
    </div>
  )
}