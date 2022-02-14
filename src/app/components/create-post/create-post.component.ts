import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: Post = new Post();
  constructor(private _Http:HttpClient,private _isLogged:IsLoggedInService,private _ativatedRoute: ActivatedRoute) {
    if(!_isLogged.isLoggedIn()){
      window.location.replace('/')
     }
  }

  ngOnInit(): void {
    window.scrollTo(0, 500);
    this._ativatedRoute.paramMap.subscribe((params) => {
      this._Http.get(`https://blog-api-0000.herokuapp.com/api/posts/${params.get('id')}`).subscribe(
          (response: any) => {
            // console.log(response);
            this.post = response;
            console.log(this.post._id)
          }
        );
      });
  }

  createPost(Title: string,Description: string,Photo: string,Category: string):void {
    if(Title.length>3&&Description.length>20){
    let post = new Post();
    post.title = Title;
    post.description = Description;
    post.photo = Photo;
    post.category = Category;

    const httpOptions = {
            headers : new HttpHeaders({
              'authorization': this._isLogged.token || ""
            })
          }
    this._Http.post("https://blog-api-0000.herokuapp.com/api/posts/",post,httpOptions).subscribe(
      (response: any) => {
        alert("posted successfully")
        window.location.replace('/')

      },
      (err: any) => {console.log(err)}
    )
    }else{
      alert("invalid data !!")
    }
  }

  updatePost(Title: string,Description: string,Photo: string,Category: string):void {
    // let post = new Post();
    if(Title.length>3&&Description.length>20){
    this.post.title = Title;
    this.post.description = Description;
    this.post.photo = Photo;
    this.post.category = Category;

    const httpOptions = {
            headers : new HttpHeaders({
              'authorization': this._isLogged.token || ""
            })
          }
    this._Http.put(`https://blog-api-0000.herokuapp.com/api/posts/${this.post._id}`,this.post,httpOptions).subscribe(
      (response: any) => {
        alert("Updated successfully")
        window.location.replace('/userPosts')

      },
      (err: any) => {console.log(err)}
    )
  }else{
    alert("invalid data !!")
  }
  }
}
