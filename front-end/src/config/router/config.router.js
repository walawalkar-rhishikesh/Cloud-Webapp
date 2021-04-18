const app = "/app";
const routerConfig = {
    auth: "/auth",
    dashboard: {
        main : "/app",
        home: app+"/home",
        profile: app+"/profile",
        cart: app + "/cart"
    }
}
export default routerConfig;
