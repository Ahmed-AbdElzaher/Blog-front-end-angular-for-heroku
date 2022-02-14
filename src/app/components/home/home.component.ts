import { Post } from './../../models/Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';
// import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  // getPostsCount: number=0;

  constructor(private _Http: HttpClient,private _isLogged:IsLoggedInService) { }

  ngOnInit(): void {
    const httpOptions = {
      headers : new HttpHeaders({
        'authorization': this._isLogged.token || ""
      })
    }

    this._Http.get('http://localhost:5000/api/posts/',httpOptions).subscribe(

      (response: any) => {
        // alert('response')
        // console.log(response);
        this.posts = response;
        // console.log(this.posts)
        // this.getPostsCount = this.posts.length
      },
      (err: any) => {
        alert(err.message);
      }
    );
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
          this.posts.splice(currentIndex)
        },
        (err: any) => {
          alert(err.error);
        }
      )
    }
  }

  logged = this._isLogged.isLoggedIn();

}
