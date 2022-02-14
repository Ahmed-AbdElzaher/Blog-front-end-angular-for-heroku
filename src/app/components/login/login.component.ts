import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _Http:HttpClient,private _isLogged:IsLoggedInService) {
  if(_isLogged.isLoggedIn()){
    window.location.replace('/')
   }

  }

  ngOnInit(): void {
  }
  login(name: string, pass: string):void {

    let user = new User();
    user.username = name;
    user.password = pass;
    // alert(user);
    console.log(user);
    this._Http.post("https://blog-api-0000.herokuapp.com/api/auth/login",user).subscribe(
      (response: any) => {
        alert("user logged successfully")
        localStorage.setItem("token", response)
        console.log(response);
        window.location.replace('/')
      },
      (err: any) => {
        alert(err.error)
        console.log(err)
      }
    )

  }

  logged = this._isLogged.isLoggedIn();

}

