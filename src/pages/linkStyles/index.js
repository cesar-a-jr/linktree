// import { useState, useEffect } from "react";

// import {BsArrowLeft} from 'react-icons/bs'
// import {FaLink} from "react-icons/fa"
// import {AiOutlineLink, AiFillTool} from 'react-icons/ai'
// import { MdEdit} from 'react-icons/md'
// import {BiLogOut} from 'react-icons/bi'

// import { Link } from "react-router-dom";

// import {signOut, getAuth} from 'firebase/auth'
// import {addDoc, collection, onSnapshot, getDocs, query, orderBy, doc, deleteDoc, setDoc} from 'firebase/firestore'
// import { auth } from '../../services/firebaseconection'
// import { db } from '../../services/firebaseconection';

// import {toast} from 'react-toastify'


// export function LinksStyles(){
//   const [open, setOpen] = useState(false);
//   const [bgInput, setBgInput] = useState("");
//   const [bgButton, setBgButton] = useState("");
//   const [colorLink, setColorLink] = useState("");

//   const[links, setLinks] = useState([])

  
//   const user = auth.currentUser;
//   const uid =  user.uid

//     useEffect(()=>{

//     const linksRef = collection(db, uid )
//     const queryRef = query(linksRef, orderBy("created", "desc"))

//     const unsub = onSnapshot(queryRef, (snapshot)=>{
//       let lista = [];
//       snapshot.forEach((doc)=>{
//         lista.push({
//           id: doc.id,
//           name: doc.data().name,
//           url: doc.data().url,
//         })
//       })
//       setLinks(lista)
//     })
//   },[])

//   useEffect(()=>{


//     const linksRef = collection(db, uid  )
//     console.log(linksRef)
//     const queryRef = query(linksRef, orderBy("created", "desc"))


//     getDocs(queryRef)
//     .then((snapshot)=>{
//       let lista = [];
//       console.log(snapshot)
//       snapshot.forEach((doc)=>{
//         lista.push({
//           id: doc.id,
//           name: doc.data().name,
//           url: doc.data().url,
//           bgInput: doc.data().bgInput,
//           bgButton: doc.data().bgButton,
//           colorLink: doc.data().colorLink
//         })
//       })
//       setLinks(lista)
//       console.log(lista)
//     })
    
    

// // eslint-disable-next-line
// },[])


//   async function handleRegister(e){
//     e.preventDefault();
//     toast.success('Link Registrado!')
//     setDoc(doc(db, uid, 'aparencia' ),{
//       bgButton: bgButton,
//       bgInput: bgInput,
//       colorLink: colorLink,
//       created: new Date(),
//     })
//     .then(()=>{
//       toast.success('Link Registrado!')
//     })
//     .catch((error)=>{
//       console.log( error )
//       toast.error('Erro ao Registrar!')
//     }
//     )
    
//   }

//   return(
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`duration-300 ${
//           open ? "w-50" : "w-20 "
//         } bg-gray-50 h-screen p-5  pt-8 relative  border-r-2 border-green-700`}
//       >
//         <div>
//         <BsArrowLeft    
//           className={`absolute cursor-pointer -right-4 top-8 w-7  duration-500 rounded-full scale-0  md:scale-100   ${!open && "rotate-180"}   bg-gray-50 border-2 border-green-700`}
//           onClick={() => setOpen(!open)}
//           size={24}
//         />
//         <div className="grid grid-cols-6 grid-flow-col">
//           <Link to='/'>
//           <FaLink className={`text-green-900 w-7  cursor-pointer duration-700  ${!open && "rotate-[360deg]"}` } size={24}/>
//           </Link>
//           <h1
//               className={`text-green-600 col-span-5 origin-left font-medium text-xl duration-200 ml-2 ${
//                 !open && "scale-0"
//               }`}
//             >
//             Multi.Link
//           </h1>
//         </div>

//         <div className="grid grid-cols-1">
//           <Link  to='/admin' className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-green-700 font-bold text-sm items-center gap-x-4 mt-4`}>
//                 <AiOutlineLink size={16} className={`origin-left duration-700`}/> 
//                 <p className={`${!open && "  hidden"} origin-left duration-200 `}>Links</p>
//           </Link>
//         <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-green-700 font-bold text-sm items-center gap-x-4 `}>
//           <MdEdit/>
//           <Link className={`${!open && "hidden"} origin-left duration-200`}>Aparencia</Link>
//         </li>
//         <Link to='/admin/config' className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-green-700 font-bold bg-green-300 text-sm items-center gap-x-4 `}>
//             <AiFillTool/>
//             <p className={`${!open && "hidden"} origin-left duration-200`}>Configurações</p>
//         </Link>
//         </div>
//           <div 
//           className={`absolute cursor-pointer bottom-0 w-7  duration-500 rounded-full`}
//           > 
//             <button onClick={()=>signOut(auth)}>
//               <BiLogOut size={28} color="#db2629"/>
//             </button>
//           </div>
//         </div>
        
        
//       </div>
      
//       <div className="pt-4 md:w-7/12 pl-8 bg-zinc-100">
//         <h1 className="text-lg font-bold">Estilos</h1>
        

//         <form action="" onSubmit={handleRegister}>
//           <label htmlFor="">Cor de fundo:</label> 
//           <input 
//             type="color" 
//             value={links.bgInput}
//             onChange={(e)=>setBgInput(e.target.value)}
//           />
//           <label htmlFor="">Cor do botão:</label> 
//           <input 
//             type="color" 
//             value={links.bgButton}
//             onChange={(e)=>setBgButton(e.target.value)}
//           />
//           <label htmlFor="">Cor do link:</label> 
//           <input 
//             type="color" 
//             value={links.colorLink}
//             onChange={(e)=>setColorLink(e.target.value)}
//           />
//             <button className={`flex w-fit content-center p-2 bg-green-700 rounded-full duration-500 text-slate-100 font-bold pr-4 hover:bg-green-900 hover:text-green-200` } type='submit'>
//               Cadastrar
//             </button>
//         </form>

//       </div>
      

//       <div className='md:w-5/12 bg-zinc-100 px-4 min-h-fit border-l-2 flex flex-col justify-center items-center'>
          
//           <p>Compartilhar Meu Multi.Link</p>

//           <div style={{backgroundColor: bgInput}} className='h-5/6 w-3/6 min-h-fit min-w-fit max-h- border-8 rounded-2xl border-black flex items-center flex-col overflow-clip'>

//           <div className={`rounded-full bg-green-900 py-8 my-4 px-8` } >
          
//           </div>

//           <h2 className='text-lg font-bold mt-2 mb-4'>
//               Cesar
//           </h2>

//           {links.map((item)=>(
//             <article 
//             key={item.id}
//             className={`${!item.name && 'hidden'}  w-11/12 px-2 rounded-lg  duration-200 hover:scale-105 mb-2 overflow-hidden`}
//             style={{backgroundColor: bgButton, color: item.color}}
//             >
//               <p style={{color: colorLink}} className='text-center py-2'>{item.name}</p>
//             </article>
//           ))}



//           </div>
//         </div>
//     </div>
//   )
// }