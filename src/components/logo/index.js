import './logo.css'
import {Link} from 'react-router-dom'

export function Logo(){
  return(
    <Link to={'/'}>
      <h1 className='links'>Multi<span className='tree'>.Link</span></h1>
    </Link>
  )
}