import { configureStore } from "@reduxjs/toolkit"
import counter from "./modules/counter"
import login from "./modules/login"
import app from "./modules/app"

export default configureStore({
    reducer:{
        counter,
        login,
        app
    }
})