import { Routes } from "@angular/router";
import { Home } from "./home";
import { CreateComponent } from "./pages/create/create.component";

export default [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create',
    component: CreateComponent
  }
] as Routes;
