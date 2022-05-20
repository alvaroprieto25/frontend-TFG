import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/Business';
import { Project } from 'src/app/interfaces/Project';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";
  businessData!: Business;
  projects: Array<Project> = [];

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
          this.loadedData = true;
        }); 
        this.dataService.getBusiness(params.business).subscribe(data => {
          this.businessData = data;
        });
        this.dataService.getBusinessProjects(Number(this.business)).subscribe(data2 => {
          this.projects = data2.projects;
          for(var p of this.projects){
            p.date = p.date.substring(0, p.date.search('T'));
          }
          this.loadedData = true;
        });
      }
    );
  }

  goBack(){
    this.router.navigate(['/business'], {queryParams: {business: this.business}});
  }

  detailBudget(id: number){
    this.dataService.getProjectBudget(id).subscribe(data => {
      this.router.navigate(['/detail-budget'], {queryParams: {business: this.business, budget: data.id}});
    }); 
  }

  detailClient(id: number){
    this.dataService.getProjectClient(id).subscribe(data => {
      this.router.navigate(['/detail-client'], {queryParams: {business: this.business, client: data.id}});
    }); 
  }
  
  goMaps(coordinates: any){
    let c = coordinates.substring(coordinates.indexOf('(')+1, coordinates.indexOf(')'));
    c = c.replace(/\s/g, '');
    window.open('https://www.google.com/maps/search/?api=1&query=' + c, '_blank')
  }

}
