import { useState, useEffect } from "react"
import { AdminHeader } from "../../components/AdminHeader"
import { Input } from "../../components/input"
import {MdAddLink} from "react-icons/md"
import "./networks.css"
// eslint-disable-next-line
import { getAuth } from "firebase/auth";
// eslint-disable-next-line
import { async } from "@firebase/util"
import { db } from "../../services/firebaseconection"
import {setDoc, doc, getDoc} from 'firebase/firestore'
import { toast } from "react-toastify"


export default function Networks(){
  const [github, setGithub]=useState('')
  const [instagram, setInstagram]=useState('')
  const [whatsApp, setWhatsApp]=useState('')

  
  const auth = getAuth();
  const user = auth.currentUser;
  const uid =  user.uid

  useEffect(()=>{

    function loadLinks(){
      const docRef = doc(db, uid + "social", "link")
      getDoc(docRef)
      .then((snapshot)=>{

        if (snapshot.data() !== undefined){
          setGithub(snapshot.data().Github)
          setInstagram(snapshot.data().Instagram)
          setWhatsApp(snapshot.data().WhatsApp)

        }
      })
    }
    loadLinks()
  },[])

  async function handleSave(e){
    e.preventDefault()

    setDoc(doc(db, uid + "social", "link"),{
      Github: github,
      Instagram: instagram,
      WhatsApp: whatsApp
    })
    .then(
      toast.success('Links Atualizados!')
    )
  }

  return(
    <div className="admin-container">
      <AdminHeader/>
      
      <h1 className="title-social">Suas Redes Sociais</h1>

      <form className="form" action="" onSubmit={handleSave}>
        <label className="label">Link do Github</label>
        <Input
          placeholder="Digite a URL do Github"
          value={github}
          onChange={(e)=>setGithub(e.target.value)}
        />
        <label className="label">Link do Instagram</label>
        <Input
          placeholder="Digite a URL do Instagram"
          value={instagram}
          onChange={(e)=>setInstagram(e.target.value)}
        />        
        <label className="label">Link do WhatsApp</label>
        <Input
          placeholder="Digite a URL do WhatsApp"
          value={whatsApp}
          onChange={(e)=>setWhatsApp(e.target.value)}
        />

        <button type="submit" className="btn-register">Salvar Links <MdAddLink size={24} color="#FFF"/></button>
      </form>
      
    </div>
  )
} 