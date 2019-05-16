import { constantRouterMap } from '../router';

function isExist(srcMap, route){
	for(var i=0;i<srcMap.length;i++){
  	var r = srcMap[i];
  		console.log(r.name, '===============aaaaaaaaaaaa=================', route.name);
  	if(r.name == route.name){
  		console.log(r.name+'===============11111111=================');
  		srcMap[i] = route;
  		return true;
  	}else if(r.children && r.children.length > 0){
  		console.log(r.name+'===============222222222=================');
  		return isExist(r.children, route);
  	}else {
  		return false;
  	}
  }
}

const mutations = {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      var newRouterMap = [].concat(constantRouterMap);
      for(var i=0;i<routers.length;i++){
      	var r = routers[i];
      	if(!isExist(newRouterMap, r)){
	      	newRouterMap = newRouterMap.concat(routers);
	      }
      }
      state.routers = newRouterMap;
    },
    SET_ROLES: (state, roles) => {
    	state.roles = roles;
    }
};
  
export default mutations;