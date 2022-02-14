import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { SignComponent } from './components/sign/sign.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

const routes: Routes = [
  {path: 'signUp', component:SignComponent},
  {path: 'logIn', component:LoginComponent},
  {path: 'create-post', component:CreatePostComponent},
  {path: 'create-post/:id', component:CreatePostComponent},
  {path: '', component:HomeComponent},
  {path: 'post/:id', component:PostComponent},
  {path: 'userPosts', component:UserPostsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
