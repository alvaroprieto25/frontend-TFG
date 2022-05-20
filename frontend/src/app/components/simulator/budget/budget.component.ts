import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'src/app/interfaces/Budget';
import { Business } from 'src/app/interfaces/Business';
import { Client } from 'src/app/interfaces/Client';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  providers: [DatePipe]
})
export class BudgetComponent implements OnInit {

  style!: Style;
  budget: Budget = {id:0, price:0, discount:0, subtotal:0, date:"", businessId:0, clientId:0, projectId:0};
  client: Client = {id:0, name:"", surname:"", email:"", phone:""};
  loadedData = false;
  business = "";
  myDate = new Date();

  budgetForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl()
  });

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute, private datePipe: DatePipe) { }

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
      }
    );
  }

  goBack(){
    this.router.navigate(['/result'], {queryParams: {business: this.business}});
  }

  getBudget(){
    localStorage.setItem('clientName', this.budgetForm.value.name);
    localStorage.setItem('clientSurname', this.budgetForm.value.surname);
    localStorage.setItem('clientEmail', this.budgetForm.value.email);
    localStorage.setItem('clientPhone', this.budgetForm.value.phone);
    //añadir el cliente primero
    this.client.name = this.budgetForm.value.name;
    this.client.surname = this.budgetForm.value.surname;
    this.client.email = this.budgetForm.value.email;
    this.client.phone = this.budgetForm.value.phone;
    //post del cliente
    this.dataService.postClient(this.client).subscribe(data => {
      //get del cliente
      debugger;
      this.dataService.getClient(data?.id).subscribe(data => {
        
        //rellenar el presupeusto
        this.budget.price = Number(localStorage.getItem("price")?.replace(',', '.'));
        this.budget.discount = 0;
        this.budget.subtotal = Number(localStorage.getItem("price")?.replace(',', '.'));
        this.budget.date = String(this.datePipe.transform(this.myDate, 'yyyy-MM-dd'));
        this.budget.projectId = Number(localStorage.getItem("projectId"));
        this.budget.businessId = Number(this.business);
        this.budget.clientId = data.id;
        //post presupuesto
        this.dataService.postBudget(this.budget).subscribe(data => {
          this.router.navigate(['/download'], {queryParams: {business: this.business}});
        }); 
        
      }); 
    }); 
  }

}
