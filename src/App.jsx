import React, { memo } from "react";
import { useRoutes, Route, Routes } from "react-router-dom";
import { useLoadRouter } from "./hooks/useRouter";
import { ConfigProvider} from "antd";
import { useDispatch, useSelector } from "react-redux";

import AuthRouter from "@/components/AuthRouter/";
import Login from "@/pages/login";
import Layout from "@/pages/layout";
import locale from "antd/locale/zh_CN";

const App = memo(() => {
  const routes = useLoadRouter();
  const { theme } = useSelector((state) => state.app);
 
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: theme,
        },
      }}
    >
      <AuthRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            {/* {useRoutes(routes)} */}
            {routes.map((r) => (
              <Route path={r.path} key={r.path} element={r.element} />
            ))}
          </Route>
        </Routes>
      </AuthRouter>
    </ConfigProvider>
  );
});
export default App;
