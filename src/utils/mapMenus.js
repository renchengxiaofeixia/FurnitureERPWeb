import React from "react";
import routes from '@/router'
// 菜单转路由
export function mapMenusToRouter(userMenus) {
  const routes = [];
  // 1.默认加载所有路由
  const allRoutes = routes;
//   const routeFiles = require.context(`../router/main`, true, /.jsx/);
//   routeFiles.keys().forEach((key) => {
//     // 根据路径导入路由
//     const route = require(`../router/main${key.split(".")[1]}`);
//     allRoutes.push(route.default);
//   });

  // 2.根据menus来筛选路由
  function filterRoute(menus) {
    for (const menuItem of menus) {
      if (menuItem.type === 1) {
        const route = allRoutes.find((item) => item.path === menuItem.path);
        if (route) {
          routes.push(route);
        }
      } else if (menuItem.type === 2) {
        filterRoute(menuItem.children ?? []);
      }
    }
  }
  filterRoute(userMenus);
  // 返回筛选完的路由
  return routes;
}

// 合并路由
export function handleMergeRoutes(
  defaultRoutes,
  routes
) {
  // 拷贝原路由(坚持React数据不变的力量)
  const newDefaultRoutes = deepCopyRoute(defaultRoutes);
  // 拿到main路由
  const routeItem = newDefaultRoutes.find((item) => item.id === "main") ?? {};
  // 添加新路由
  routeItem.children = routes;
  // 返回新路由
  return newDefaultRoutes;
}

// 拷贝路由对象
function deepCopyRoute(raw) {
  let copyData = Array.isArray(raw) ? [] : {};

  for (const key in raw) {
    const value = raw[key];
    // 如果是普通类型或者react元素则不深拷贝
    const condition = typeof value !== "object" || React.isValidElement(value);
    if (condition) {
      copyData[key] = value;
    } else if (typeof value === "object") {
      copyData[key] = deepCopyRoute(value);
    }
  }
  return copyData;
}