import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/Business';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';
import { EncrDecrServiceService } from 'src/app/services/encr-decr-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";
  businessData!: Business;

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });


  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute, private encrDecrService: EncrDecrServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe(params => {
      if(!params.business){
        this.router.navigate(['/error']);
      }
      this.business = params.business;
      this.dataService.getBusinessStyle(params.business).subscribe(data => {
        this.style = data;
        this.loadedData = true;
      }); 
      this.dataService.getBusiness(params.business).subscribe(data => {
        this.businessData = data;
      });
    });
  }

  login(){
    this.dataService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      if(data.correcto == true){
        //guardar token
        localStorage.setItem('token', data.token);
        this.router.navigate(['/business'], {queryParams: {business: this.business}});
      }
    });
  }

  register(){
    this.router.navigate(['/signup']);
  }
}
