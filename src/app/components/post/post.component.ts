import { Post } from './../../models/Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: Post = new Post();

  constructor(private _Http: HttpClient,private _ativatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    window.scrollTo(0, 300);
    this._ativatedRoute.paramMap.subscribe((params) => {
    this._Http.get(`http://localhost:5000/api/posts/${params.get('id')}`).subscribe(
        (response: any) => {
          console.log(response);
          this.post = response;
          console.log(this.post._id)
        }
      );
    });
  }
}
