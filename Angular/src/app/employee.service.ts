import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit{

readonly baseUrl = 'http://localhost:3000';

  
constructor(private httpClient: HttpClient) { }

ngOnInit(){}

  // show all employee
  getAllEmployee(){
    return this.httpClient.get(this.baseUrl);
  }

  //save employee data(Angular modal)
  saveEmployee(formData){
    return this.httpClient.post(this.baseUrl, formData);
  }

  //get employee details by id 
  getEmployeeById(id){
    return this.httpClient.get(this.baseUrl+`/${id}`);
  }

  //update employee by id
  updateEmployeeDetail(formData, id){
    return this.httpClient.put(this.baseUrl+`/${id}`, formData)
  }

  // delete employee by id
  deleteEmployeeDetails(id){
    return this.httpClient.delete(this.baseUrl+`/${id}`)
  }
}
