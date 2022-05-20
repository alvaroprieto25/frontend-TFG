import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/Business';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  first = true;
  second = false;
  thrid = false;

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  continue(){
    if(this.first == true){
      this.first = false;
      this.second = true;
    }
    else{
      this.thrid = true;
      this.second = false;
    }
      
  }

  back(){
    console.log(this.first, this.second, this.thrid);
    if(this.thrid == true){
      this.thrid = false;
      this.second = true;
    }
    else{
      this.second = false;
      this.first = true;
    }
  }

  submit(){

  }

}
