import "./Views.css"
import { useState, useEffect} from "react";

import { Navigate, useParams } from "react-router-dom";

import { db } from "../../services/firebaseconection";
import {collection, orderBy, query, getDocs, doc, getDoc} from "firebase/firestore"
import { Logo } from "../../components/logo";



export default function Views(){
  const {uid} = useParams()
  const [links, setLinks] = useState([])
  const [existeLink, SetExisteLink] = useState(true)

  const [userName, setUserName] = useState("Nome do User");
  const [userBio, setUserBio] = useState("Bio do user");
  const [colorBG, setColorBG] = useState("");
  
  console.log(uid)

  useEffect(()=>{


      const linksRef = collection(db, uid  )
      console.log(linksRef)
      const queryRef = query(linksRef, orderBy("created", "desc"))


      getDocs(queryRef)
      .then((snapshot)=>{
        let lista = [];
        console.log(snapshot)
        snapshot.forEach((doc)=>{
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bgButton,
            color: doc.data().colorLink
          })
        })
        if(lista.length === 0){
          SetExisteLink(false)
        }
        console.log(lista.length)

        setLinks(lista)

        
      })


      function loadUserInfo() {
        const docRef = doc(db, "user" + uid, "config");
        getDoc(docRef).then((snapshot) => {
          if (snapshot.data !== undefined) {
            setUserName(snapshot.data().userName);
            setUserBio(snapshot.data().userBio);
            setColorBG(snapshot.data().colorBG);
          }
        });
      }
      loadUserInfo();
      
      

// eslint-disable-next-line
  },[])
  
  console.log(existeLink)
  if(!existeLink){
    return  <Navigate to="/error"/>
  }


  return(
    <div style={{ backgroundColor: colorBG }} className='w-screen h-screen flex flex-col items-center'>

      <div className="mt-20 mb-4 bg-white py-2 px-4 rounded-2xl flex flex-col items-center">
        <h1  className="font-bold text-2xl ">{userName}</h1>
        <p className=" flex whitespace text-center font-bold">{userBio}</p>
      </div>

      <main className='links-home'>

      {links.map((item)=>(
          <section 
          key={item.id}
          className='links-list animate-enter'
          style={{backgroundColor: item.bg}}
          >
            <a href={item.url} target="blank">
              <p className="link-text" style={{ color: item.color}}>{item.name}</p>
            </a>
            
          </section>
        ))}

      </main>
      <Logo/>
    </div>
  )
}