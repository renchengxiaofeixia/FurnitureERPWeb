
import React, { memo } from "react";
import { useRoutes, Route,Routes } from "react-router-dom";
import { useLoadRouter } from "./hooks/useRouter";
import Login from '@/pages/login'
import Layout from '@/pages/layout'

const App = memo(() => {
  const routes = useLoadRouter();
  return (
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Layout/>}>
            {/* {useRoutes(routes)} */}
            {
              routes.map(r=>
                <Route path={r.path} key={r.path} element={r.element}/>
              )
            }
          </Route>
        </Routes>
    )
});
export default App;
