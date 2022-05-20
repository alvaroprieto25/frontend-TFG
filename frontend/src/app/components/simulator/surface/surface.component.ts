import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-surface',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.scss']
})
export class SurfaceComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  surfaceForm = new FormGroup({
    surface: new FormControl(),
    poblation: new FormControl(),
    adress: new FormControl()
  });

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

  submit(){
    localStorage.setItem('orientation', this.surfaceForm.value.surface)
    localStorage.setItem('poblation', this.surfaceForm.value.poblation)
    localStorage.setItem('adress', this.surfaceForm.value.adress)
    this.router.navigate(['/ubication'], {queryParams: {business: this.business}});
  }

}
