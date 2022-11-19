import {createBrowserRouter} from 'react-router-dom'

import Home from './pages/home'
import Login from './pages/login'
import Admin from './pages/admin'
import Error from './pages/Error'
import Register from './pages/register'
import Networks from './pages/Networks'
import Views from './pages/views'

import Privite from './routes/privite'
import { Config } from './pages/Config'
import { LinksStyles } from './pages/linkStyles'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/links/:uid',
    element: <Views/>
  },
  {
    path:'/admin',
    element: <Privite><Admin/></Privite>
  },
  {
    path:'/register',
    element: <Register/>
  },
  {
    path:'/admin/social',
    element: <Privite><Networks/></Privite>
  },
  // {
  //   path:'/admin/config',
  //   element: <Privite><Config/></Privite>
  // },
  {
    path:'*',
    element: <Error/>
  }

])

export {router};