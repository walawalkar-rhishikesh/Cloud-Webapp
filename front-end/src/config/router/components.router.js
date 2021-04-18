
import routerConfig from "./config.router"

import Profile from "../../view/Profile"
import Home from "../../view/Home"
import Cart from "../../view/Cart"

const componentConfig = [
  {
    path: routerConfig.dashboard.profile,
    name: "Profile",
    component: Profile,
    layout: routerConfig.dashboard.main
  },
  {
    path: routerConfig.dashboard.home,
    name: "Home",
    component: Home,
    layout: routerConfig.dashboard.main
  },
  {
    path: routerConfig.dashboard.cart,
    name: "Cart",
    component: Cart,
    layout: routerConfig.dashboard.main
  }
];

export default componentConfig;