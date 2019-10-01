import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  VechicleInfo: FormGroup;
  public VechicleArray:any = [];
  public departureTime = 0;
  
  ngOnInit(){}

  constructor(private fb: FormBuilder){
    this.VechicleInfo = this.fb.group({
      vno : ['', [Validators.required]],
      vvipno : ['', [Validators.required]],
      vtime : ['', [Validators.required]],
      lno : ['', [Validators.required]]
    });
  }

  onFormSubmit(){
    var previousData = JSON.parse(localStorage.getItem('vechicleInfo')) || [];
    var count = previousData.length;

    if(count < 1)
    {
      var id = 1;
    }else{
      var id = ++count;
    }

    var vechicleInfoData = {
      'id': id,
      'VechicleNo' : this.VechicleInfo.value.vno,
      'VVIPVechicleNo' : this.VechicleInfo.value.vvipno,
      'VechicleArrivalTime' : this.VechicleInfo.value.vtime,
      'LaneNo' : this.VechicleInfo.value.lno 
    }

    previousData.push(vechicleInfoData);
    localStorage.setItem('vechicleInfo', JSON.stringify(previousData));
    this.VechicleArray = JSON.parse(localStorage.getItem('vechicleInfo'));
    console.log(this.VechicleArray);
    this.VechicleInfo.reset();
  }

  onDataSubmit(){
    for( var i=0; i<this.VechicleArray.length; i++)
    {
      // this.departureTime = this.VechicleInfo.value.vtime + ;
    }
  }
}
