import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/Business';
import { Client } from 'src/app/interfaces/Client';
import { Project } from 'src/app/interfaces/Project';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";
  businessData!: Business;
  subtotal = "";
  project: Project = {id:0, consumption: 0, coordinates: "", surface: 0, orientation: "", type:"", nPanels:0, date:"", poblation:"", adress:""};
  client: Client = {id:0, name:"", surname:"", email:"", phone:""};

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if(!params.business){
          this.router.navigate(['/error']);
        }
        this.business = params.business;
        this.dataService.getBusinessStyle(params.business).subscribe(data => {
          this.style = data;
          this.subtotal = String(Math.round(Number(localStorage.getItem('price'))));
          this.loadedData = true;
        }); 
        this.dataService.getBusiness(params.business).subscribe(data => {
          this.businessData = data;
        });
        //project
        this.project.consumption = Number(localStorage.getItem("consumption"));
        this.project.surface = Number(localStorage.getItem("surface"));
        this.project.orientation = String(localStorage.getItem("orientation"));
        this.project.type = String(localStorage.getItem("type"));
        this.project.nPanels = Number(localStorage.getItem("nPanels"));

        //client
        this.client.name = String(localStorage.getItem('clientName'));
        this.client.surname = String(localStorage.getItem('clientSurname'));
        this.client.email = String(localStorage.getItem('clientEmail'));
        this.client.phone = String(localStorage.getItem('clientPhone'));
      }
    );
    
  }

  download(){
    let data: any = document.getElementById('budgetDownload');

    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0) 
      let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in landscape mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 20.0, 10.0);  
      pdf.save('Filename.pdf');   
    }); 
  }

}
