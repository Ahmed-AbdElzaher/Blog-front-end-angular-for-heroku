import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private _Http:HttpClient,private _isLogged:IsLoggedInService) {

  }

  ngOnInit(): void {
    if(!this._isLogged.isLoggedIn()){
      window.location.replace('/')
     }else{
    const httpOptions = {
      headers : new HttpHeaders({
        'authorization': this._isLogged.token || ""
      })
    }
    this._Http.get('http://localhost:5000/api/posts/userPosts',httpOptions).subscribe(
      (response: any) => {
        console.log(response);
        this.posts = response;
        console.log(this.posts)
      },
      (err: any) => {
        alert(err.message);
        console.log(err);
      }
    );
  }
  }


  delete(currentIndex: number): void {
    const deletePost = confirm('Are you sure you want to delete this post?');
    if(deletePost){
      let post = this.posts[currentIndex];
      const httpOptions = {
        headers : new HttpHeaders({
          'authorization': this._isLogged.token || ""
        })
      }
      this._Http.delete(`http://localhost:5000/api/posts/${post._id}`,httpOptions).subscribe(
        (response: any)=>{
          // this.posts.splice(currentIndex)
          window.location.replace('/userPosts')
        },
        (err: any) => {
          alert(err.error);
        }
      )
    }
  }

  logged = this._isLogged.isLoggedIn();

  update(currentIndex: number): void {
    const editPost = confirm('Are you sure you want to Edit this post?');
    if(editPost){
      let post = this.posts[currentIndex];
      const httpOptions = {
        headers : new HttpHeaders({
          'authorization': this._isLogged.token || ""
        })
      }
      this._Http.put(`http://localhost:5000/api/posts/${post._id}`,post,httpOptions).subscribe(
        (response: any)=>{
          this.posts.splice(currentIndex)
        },
        (err: any) => {
          alert(err.error);
        }
      )
    }
  }



}
