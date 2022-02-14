import { Component, OnInit } from '@angular/core';
import { IsLoggedInService } from 'src/app/services/is-logged-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _isLogged:IsLoggedInService) { }

  ngOnInit(): void {
  }
  logged = this._isLogged.isLoggedIn();

  logOut(): void {
    localStorage.removeItem('token')
    window.location.replace('/')
  }
}
