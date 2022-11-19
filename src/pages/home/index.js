import './home.css'

import iphone from '../../assets/iPhone.png'
import { Social } from '../../components/Social'
import { Header } from '../../components/Header'


export default function Home(){
  return(
    <div className='home-container'>
      <Header/>
      <div className='home-wall'>
        <div className='title-home'>
        <h1>Tudo o que você precisa em um unico Link.</h1>
        <span>Multi.Link</span>
        </div>
        <div className='img-home'>
          <img src={iphone} alt="" />
        </div>
      </div>

    </div>
  )
}