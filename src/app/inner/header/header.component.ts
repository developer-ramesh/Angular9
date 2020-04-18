import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private api:CommonService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.api.logout();
  }

}
