import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  employeeForm: FormGroup;
  updateEmployeeForm: FormGroup;
  public employees:any = [];
  public updateEmployee:any = [];
  public getRegisteredUser:any = [];
  public confirm; 
  public confirmUpdate;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService,
    private authService: AuthService, private router: Router){
      this.employeeForm = this.fb.group({
      empid: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      mobileno: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
    // updateEmployee Form
    this.updateEmployeeForm = this.fb.group({
      empid: [this.employees.empid, [Validators.required]],
      firstname: [this.employees.firstname, [Validators.required]],
      lastname: [this.employees.lastname, [Validators.required]],
      dob: [this.employees.dob, [Validators.required]],
      mobileno: [this.employees.mobileno, [Validators.required]],
      city: [this.employees.city, [Validators.required]],
      address: [this.employees.address, [Validators.required]],
    });
  }
  ngOnInit() {
    this.employeeService.getAllEmployee().subscribe((res) =>{
      this.employees = res;
      console.log(this.employees);
    });

    //get all Registered User
    this.authService.getRegisteredUser().subscribe((res) => {
      this.getRegisteredUser = res;
      console.log('getRegisteredUser',this.getRegisteredUser);
    });

    //get logged In user stored in LocalStorage
    console.log(JSON.parse(localStorage.getItem('user')));
  }
  // save employee
  onSaveEmployee(){
    this.employeeService.saveEmployee(this.employeeForm.value).subscribe((res) => {
      this.employeeForm.reset();
      this.ngOnInit();
    });
  }
  //update modal form name
  update(id){
    this.confirmUpdate = confirm("Do your really want to Update this record?");
    if(this.confirmUpdate == true)
    {      
      this.employeeService.getEmployeeById(id).subscribe((res) => {
        this.updateEmployee = res;
      });
    }else{
      return false; 
    }
  }
  // modal function
  onUpdateEmployee(id){
      this.employeeService.updateEmployeeDetail(this.updateEmployeeForm.value, id).subscribe((res) => {      
          this.updateEmployeeForm.reset();
          this.ngOnInit();
      });   
    }
  //delete employee by id
  onDeleteEmployee(id){
    this.confirm = confirm("Do your really want to delete this record?");
    if(this.confirm == true)
    {
      this.employeeService.deleteEmployeeDetails(id).subscribe((res) => {
        this.ngOnInit();
      });
    }
    else{
      return false;
    }
  }

  //Logout by Manager
  onLogoutManager(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
