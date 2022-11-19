import { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineLink, AiFillTool } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { FiTrash2, FiShare2 } from "react-icons/fi";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseconection";
import { toast } from "react-toastify";
import { Input } from "../../components/input";
import { MdAddLink, MdEdit } from "react-icons/md";
import { IoMdAddCircleOutline, IoIosBuild } from "react-icons/io";

export default function Admin() {
  const [open, setOpen] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editopen, setEditopen] = useState(false);

  const [crateLink, setCrateLink] = useState(false);
  const [links, setLinks] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [bgButton, setBgButton] = useState("#000");
  const [colorLink, setColorLink] = useState("#FFF");
  const [userName, setUserName] = useState("Nome do User");
  const [userBio, setUserBio] = useState("Bio do user");
  const [colorBG, setColorBG] = useState("");

  const [config, setConfig] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    const linksRef = collection(db, uid);
    const queryRef = query(linksRef, orderBy("created", "desc"));

    const UserRef = collection(db, "user" + uid);
    const queryRefUser = query(UserRef, orderBy("created", "desc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bgButton: doc.data().bgButton,
          colorLink: doc.data().colorLink,
        });
      });
      console.log(lista);
      setLinks(lista);
    });

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
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      toast.warn("Preencha todos os campos!");
      return;
    }
    addDoc(collection(db, uid), {
      name: nameInput,
      url: urlInput,
      bgButton: bgButton,
      colorLink: colorLink,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        setCrateLink(!crateLink);
        setEditopen(!editopen);
        toast.success("Link Registrado!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao Registrar!");
      });
  }

  async function handleUser(e) {
    e.preventDefault();

    if (userName === "") {
      toast.warn("Preencha todos os campos!");
      return;
    }
    setDoc(doc(db, "user" + uid, "config"), {
      userName: userName,
      userBio: userBio,
      colorBG: colorBG,
      created: new Date(),
    })
      .then(() => {
        setUserBio("");
        setUserName("");
        setEditBio(!editBio);
        setEditopen(!editopen);
        toast.success("Link Registrado!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao Registrar!");
      });
  }

  async function handleDeletelink(id) {
    const docRef = doc(db, uid, id);
    await deleteDoc(docRef);
    toast.success("Link Apagado!");
  }

  return (
    <div className="flex pageresponsive">
      <div className="h-screen md:flex-row w-full flex flex-col bg-zinc-100">
        <div className="md:w-7/12 p-4 flex items-center flex-col">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <button onClick={()=>signOut(auth)}>
              <BiLogOut size={24} color="red" className="mr-4" />
            </button>
            <button
              className={` ${crateLink && "hidden"} ${
                editopen && "hidden"
              } flex w-fit content-center p-2 bg-green-700 rounded-full duration-500 text-slate-100 font-bold pr-4 hover:bg-green-900 `}
              onClick={() => {
                setCrateLink(!crateLink);
                setEditopen(!editopen);
              }}
            >
              <IoMdAddCircleOutline className="mr-4 h-full" size={20} />
              Adicionar novo link
            </button>
            <button
              className={` ${editBio && "hidden"} ${
                editopen && "hidden"
              }  md:ml-4 md:mt-0 mt-2 flex w-fit content-center p-2 bg-green-700 rounded-full duration-500 text-slate-100 font-bold pr-4 hover:bg-green-900 `}
              onClick={() => {
                setEditBio(!editBio);
                setEditopen(!editopen);
              }}
            >
              <IoIosBuild className="mr-4 h-full" size={20} />
              Alterar informações
            </button>
          </div>
          <form
            action=""
            className={`flex flex-col justify-center items-center ${
              !editBio && "hidden"
            }`}
            onSubmit={handleUser}
          >
            <div className="md:flex mt-4">
              <div className="flex flex-col ">
                <label className="font-bold">Nome do Usuário:</label>
                <Input
                  placeholder="Nome do Usuário..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col  ml-4">
                <label className="font-bold">Bio do Usuário:</label>
                <Input
                  placeholder="Bio do Usuário..."
                  value={userBio}
                  onChange={(e) => setUserBio(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col  items-center ml-4">
              <label className="font-bold">Cor de fundo:</label>
              <input
                className="h-8 w-full "
                type="color"
                value={colorBG}
                onChange={(e) => setColorBG(e.target.value)}
              />
            </div>
            <div className="flex">
              <button
                className={` ${
                  !editBio && "hidden"
                } flex w-fit content-center p-2 bg-green-700 rounded-full duration-500 text-slate-100 font-bold  hover:bg-green-900 hover:text-green-200`}
                type="submit"
              >
                Cadastrar <IoIosBuild  className="ml-2" size={20} color="#FFF" />
              </button>
            </div>
          </form>
          <button
            className={` ${
              !editBio && "hidden"
            } flex w-fit mt-4 content-center ml-2 p-2 bg-red-200 rounded-full duration-500 text-white font-bold pr-4 hover:bg-red-900`}
            onClick={() => {
              setEditBio(!editBio);
              setEditopen(!editopen);
            }}
          >
            Cancelar
          </button>
          <form
            action=""
            className={` flex items-center flex-col ${!crateLink && "hidden"}`}
            onSubmit={handleRegister}
          >
            <div className="md:flex">
              <div className="flex flex-col">
                <label className="font-bold">Nome do link:</label>
                <Input
                  placeholder="Nome do link..."
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
              </div>
              <div className="flex flex-col ml-4">
                <label className="font-bold">URL do link:</label>
                <Input
                  type="url"
                  placeholder="URL do link..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-col mr-4">
                <label htmlFor="">Cor do botão:</label>
                <input
                  className="h-8 w-full "
                  type="color"
                  value={bgButton}
                  onChange={(e) => setBgButton(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Cor do link:</label>
                <input
                  className="h-8 w-full "
                  type="color"
                  value={colorLink}
                  onChange={(e) => setColorLink(e.target.value)}
                />
              </div>
            </div>

            <div className="flex">
              <button
                className={` ${
                  !crateLink && "hidden"
                } flex w-fit content-center p-2 bg-green-700 rounded-full duration-500 text-slate-100 font-bold hover:bg-green-900 hover:text-green-200`}
                type="submit"
              >
                Cadastrar <MdAddLink size={24} color="#FFF" />
              </button>

            </div>
          </form>
          <button
                className={` ${
                  !crateLink && "hidden"
                } flex mt-4 content-center ml-2 p-2 bg-red-200 rounded-full duration-500 text-white font-bold pr-4 hover:bg-red-900`}
                onClick={() => {
                  setCrateLink(!crateLink);
                  setEditopen(!editopen);
                }}
                type="cancel"
              >
                Cancelar
          </button>

          {links.map((item) => (
            <article
              key={item.id}
              className="w-11/12 px-2 py-2  rounded-lg  duration-200 hover:scale-105 my-2 overflow-hidden flex justify-between"
              style={{ backgroundColor: item.bgButton }}
            >
              <p style={{ color: item.colorLink }}>{item.name}</p>
              <div>
                <button onClick={() => handleDeletelink(item.id)}>
                  <FiTrash2 size={18} color="#FFF" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="md:w-5/12 bg-zinc-100 px-4 min-h-fit border-l-2 flex flex-col justify-center items-center">
          
          <a href={`/links/${uid}`}>
            <FiShare2 size={24} className="mb-2"/>
          </a>


          <div
            style={{ backgroundColor: colorBG }}
            className="h-5/6 w-3/6  border-8 rounded-2xl border-black flex items-center flex-col overflow-clip"
          >
            <div className="flex flex-col mt-8 items-center">
              <h1 className="font-bold text-xl">{userName}</h1>
              <p className="mb-4 flex whitespace text-center">{userBio}</p>
            </div>

            {nameInput !== "" && (
              <article
                style={{ backgroundColor: bgButton, marginTop: 8 }}
                className="w-11/12 px-2 rounded-lg  duration-200 flex-wrap hover:scale-105 mb-2"
              >
                <p style={{ color: colorLink }} className="text-center py-2">
                  {nameInput}
                </p>
              </article>
            )}

            {links.map((item) => (
              <article
                key={item.id}
                className="w-11/12 px-2 rounded-lg  duration-200 flex-wrap hover:scale-105 mb-2"
                style={{ backgroundColor: item.bgButton }}
              >
                <p
                  style={{ color: item.colorLink }}
                  className="text-center py-2"
                >
                  {item.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
