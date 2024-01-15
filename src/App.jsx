import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import './App.css'
import Home from './views/Home'
import NoMatch from './views/NoMatch'
import Layout from './layout/Layout'
import LayoutAdmin from './Layout/ADMIN/LayoutAdmin'
import HomeAdmin from './views/ADMIN/HomeAdmin'
import ViborgHaveservice1 from './views/haveservice/ViborgHaveservice1';
import ViborgHaveservice2 from './views/haveservice/ViborgHaveservice2';
import Vejret from './views/vejret/Vejret';
import Nyheder from './views/nyheder/Nyheder';
import EnergiData from './views/energidata/EnergiData';
import Weathercard from './views/vejret/Weathercard';
import Vejret2 from './views/vejret/Vejret2';
import Vejret3 from './views/vejret/Vejret3';

function App () {

  // ROUTER PROVIDER
  const router = createBrowserRouter(

    createRoutesFromElements(
      <>
        {/* ---------------- PUBLIC ---------------- */ }
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path="viborghaveservice1" element={ <ViborgHaveservice1 /> } />
          <Route path="viborghaveservice2" element={ <ViborgHaveservice2 /> } />
          <Route path="viborghaveservice2" element={ <ViborgHaveservice2 /> } />
          <Route path="vejret" element={ <Vejret /> } />
          <Route path="vejret2" element={ <Vejret2 /> } />
          <Route path="vejret3" element={ <Vejret3 /> } />
          <Route path="weathercard" element={ <Weathercard /> } />
          <Route path="nyheder" element={ <Nyheder /> } />
          <Route path="energidata" element={ <EnergiData /> } />
          <Route path="*" element={ <NoMatch /> } />
        </Route>

        {/* ---------------- ADMIN ---------------- */ }
        <Route path="/admin" element={ <LayoutAdmin /> }>
          <Route index element={ <HomeAdmin /> } />
          <Route path="*" element={ <NoMatch /> } />
        </Route>
      </>
    )
  )

  return (
    <section>
      <RouterProvider router={ router } />
      {/* <h1>Forsiden</h1> */ }
    </section>


  )
}

export default App
