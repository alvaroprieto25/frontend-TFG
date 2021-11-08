import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/simulator/home/home.component';
import {  DataService } from './services/data.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConsumptionComponent } from './components/simulator/consumption/consumption.component';
import { UbicationComponent } from './components/simulator/ubication/ubication.component';
import { SurfaceComponent } from './components/simulator/surface/surface.component';
import { SavingComponent } from './components/simulator/saving/saving.component';
import { ResultComponent } from './components/simulator/result/result.component';
import { AgmCoreModule } from '@agm/core';

const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'consumption', component: ConsumptionComponent},
  {path: 'ubication', component: UbicationComponent},
  {path: 'surface', component: SurfaceComponent},
  {path: 'saving', component: SavingComponent},
  {path: 'result', component: ResultComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ConsumptionComponent,
    UbicationComponent,
    SurfaceComponent,
    SavingComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtCiKjZ78mhJbrd_sqgC5TDJkWBAe_ytU',
      libraries: ['drawing']
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }