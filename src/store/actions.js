﻿import { asyncRouterMap } from '../router';

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}


export default {
	generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data;
      commit('SET_ROLES', roles);
      const accessedRouters = asyncRouterMap.filter(v => {
        if (roles.indexOf('admin') >= 0) return true;
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(roles, child)) {
                return child
              }
              return false;
            });
            return v
          } else {
            return v
          }
        }
        return false;
      });
      commit('SET_ROUTERS', accessedRouters);
      resolve();
    })
  }
}