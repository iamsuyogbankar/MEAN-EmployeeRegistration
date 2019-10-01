import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,
  private toastrService: ToastrService, private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit() {
  }
  //Login Authentication
  onLoginSubmit(){
    this.authService.signInUser(this.loginForm.value).subscribe((res) => {
      if(res['status']){
        this.authService.saveAuthDetails(res['token'], res['user'])
        this.toastrService.success(res['message'], 'Successfully', {timeOut: 1000})
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000)
      }else{
        this.toastrService.error(res['message'], 'Oops', {timeOut: 1000})
      }
    })
  }
}
