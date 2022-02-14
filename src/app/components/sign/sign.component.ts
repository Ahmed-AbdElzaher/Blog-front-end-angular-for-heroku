import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  constructor(private _Http:HttpClient,private _isLogged:IsLoggedInService) {
    if(_isLogged.isLoggedIn()){
      window.location.replace('/')
     }
  }

  ngOnInit(): void {
  }

  AddUser(name: string, mail:string, pass: string):void { // ادد يوزر جديد
    let user = new User();
    user.username = name;
    user.email = mail;
    user.password = pass;
    // alert(user);
    console.log(user);
    this._Http.post("http://localhost:5000/api/auth/register",user).subscribe(
      (response: any) => {
        alert("user added successfully");
        localStorage.setItem("token", response);
        console.log(response);
        // console.log('response');
        window.location.replace('/');
      },
      (err: any) => {
        alert(err.error)
        console.log(err.error)
      }
    )

  }


}
