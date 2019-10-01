import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { ManagerSignupComponent } from './manager-signup/manager-signup.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';


const routes: Routes = [
  { path: '', component: ManagerLoginComponent, pathMatch: 'full'},
  { path: 'signup', component: ManagerSignupComponent},
  { path: 'home', component: HomeScreenComponent},
  { path: '**', component: ManagerLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
