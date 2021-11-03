import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/LoginPage.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/RegisterPage.vue"
          ),
      },
    ],
    redirect: "/login",
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/moduls",
    name: "Moduls",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ModuleOverview.vue"),
    children: [
      {
        path: "/moduls/semester",
        name: "SemesterOverview",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/moduls/SemesterOverview.vue"
          ),
      },
      {
        path: "/moduls/question",
        name: "QuestionOverview",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/moduls/QuestionOverview.vue"
          ),
      },
    ],
  },
  {
    path: "/contact",
    name: "Contact",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ContactView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
