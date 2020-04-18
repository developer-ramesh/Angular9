import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogboxComponent } from '../component/dialogbox/dialogbox.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  public returnUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private api: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')])],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit() {

    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '400px',
      data: { name: 'Ramesh Kr', phone: '54545454544' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      let data = { url: 'login', data: this.loginForm.value };
      this.api.postReqFunction(data).subscribe((response: any) => {
        if (response.status == true) {
          localStorage.setItem('_user_id', btoa(response.data.id));
          localStorage.setItem('_access_token', response.access_token);
          localStorage.setItem('_user_name', response.data.name);
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        }
        else {
          console.log(response.message);
          this.api.snackMessage(response.message, 'snack-error');
          this.loading = false;
        }
      }, (err) => {
        console.log(err);
        this.api.snackMessage(err, 'snack-error');
        this.loading = false;
      });
    }
    console.log(this.loginForm.valid);
  }

}
