import { createRouter, createWebHistory } from "vue-router";
import dishboard from "../components/dashboard.vue";

import register from "../views/Register.vue";

const routes = [{
        path: "/register/grocery/",
        name: "dishboard",
        component: dishboard,
    },
    {
        path: "/register",
        name: "register",
        component: register,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;