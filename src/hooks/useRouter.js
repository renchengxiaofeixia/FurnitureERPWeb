import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import defaultRoutes from "../router";
import { handleMergeRoutes, mapMenusToRouter } from "@/utils/mapMenus";

export function useLoadRouter() {
  const [routes, setRoutes] = useState(defaultRoutes);

  const { menus } = useSelector(
    (state) => ({
      menus: state.login.menus,
    }),
    shallowEqual
  );
    
  // useEffect监听的是redux/login里面的menus数据有没有改变
  useEffect(() => {
    // mapMenusToRouter方法是把菜单转成路由
    const newRoutes = mapMenusToRouter(menus);
    // handleMergeRoutes方法是把默认路由和新路由合并起来
    const router = handleMergeRoutes(routes, newRoutes);
    // 最后设置最新的路由
    setRoutes(router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menus]);

  return routes;
}