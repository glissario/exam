import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "../store";

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
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/profile",
    name: "Profil",
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
  },
  {
    path: "/moduls",
    name: "Moduls",
    meta: {
      requiresAuth: true,
    },
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
        path: "/moduls/questions",
        name: "QuestionOverview",
        props: true,
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/moduls/QuestionOverview.vue"
          ),
        children: [
          {
            path: "/moduls/questions/:question",
            name: "QuestionDetails",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../components/moduls/QuestionDetails.vue"
              ),
          },
        ],
      },
      {
        path: "/moduls/search/:question",
        name: "SearchQuestionDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/moduls/QuestionDetails.vue"
          ),
      },
    ],
  },
  {
    path: "/questions",
    name: "Questions",
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddQuestionView.vue"),
  },
  {
    path: "/literature",
    name: "Literatur",
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LiteratureView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.state.user;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isUserLoggedIn == null) {
      return next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
