import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Store/store.js'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Search from './pages/Search.jsx'
import Top10 from './pages/Top10.jsx'
import MainApp from './Components/MainApp.jsx'
import { LanguageProvider } from './LanguageContext.jsx'
import TopAlbums from './pages/TopAlbums.jsx'
import DetailsPage from './Components/DetailsPage.jsx'
import SongDetails from './pages/SongDetails.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainApp/>,
    children:[
      {
        path : "",
        element : <TopAlbums/>
      },
      {
        path:"/search",
        element : <Search />,
      },
      {
        path:"/top10",
        element : <Top10 />
      },
      {
        path: "/top-charts",
        element : <App/>
      },
      {
        path: '/album/:albumId',
        element: <DetailsPage />
      },
      {
        path: "/song/:songId", 
        element: <SongDetails />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store = {store}>
  <LanguageProvider>
    <RouterProvider router={router} />
    </LanguageProvider>
    </Provider>
  </React.StrictMode>,
)
