import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public masterData: any;
  constructor(private apiCall: CommonService) { }

  ngOnInit(): void {
    let data = { url: 'get-carrier', data: { page: '1' } };
    this.apiCall.postReqFunction(data).subscribe((response: any) => {
      if (response.status) {
        this.masterData = response.apiRootMaster;
        console.log(response.data);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
