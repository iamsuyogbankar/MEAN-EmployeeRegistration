import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-signup',
  templateUrl: './manager-signup.component.html',
  styleUrls: ['./manager-signup.component.css']
})
export class ManagerSignupComponent implements OnInit {
  signupForm: FormGroup;
  public signupDetails:any = [];
  constructor(private fb: FormBuilder, private authService: AuthService, 
  private toastrService: ToastrService) {    
      this.signupForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]],
      password : ['', [Validators.required, Validators.pattern("^(?=.*\d).{4,8}$")]],
      dob : ['', [Validators.required]],
      company : ['', [Validators.required]],
      address : ['', [Validators.required]],
      confirmpassword : ['', [Validators.required]]
    });
   }
  ngOnInit() {   
  }
  // New Manager Registration
  onSignupSubmit(){
    if(this.signupForm.value.password == this.signupForm.value.confirmpassword)
    {
      this.authService.saveUser(this.signupForm.value).subscribe((res) => {
        if(res['status']){
          this.toastrService.success(res['message'], 'Successfully', { timeOut: 1500 });
          this.signupForm.reset();
        }else{
          this.toastrService.error(res['message'], 'Oops', { timeOut: 1500 });
        }
      })
    } else {
      this.toastrService.error('Password is not matching with Confirm Password', 'Oops', {
        timeOut: 1500
      });
    }
  }
}
