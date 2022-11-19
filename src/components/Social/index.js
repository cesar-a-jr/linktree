import './social.css'
import {FaGithub , FaInstagram} from 'react-icons/fa'
export function Social(){
  return(
    <div>
      <a className='icon' href="https://github.com/cesar-a-jr">
        <FaGithub size={35} color="#FFF"/>
      </a>
      <a className='icon' href="https://www.instagram.com/dicas_do_front/">
        <FaInstagram size={35} color="#FFF"/>
      </a>
    </div>
  )
}