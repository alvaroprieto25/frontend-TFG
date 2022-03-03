import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CustomConsumptionComponent } from './components/simulator/custom-consumption/custom-consumption.component';
import { BudgetComponent } from './components/simulator/budget/budget.component';
import { HomeBusinessComponent } from './components/business/home-business/home-business.component';
import { ClientsComponent } from './components/business/clients/clients.component';
import { BudgetsComponent } from './components/business/budgets/budgets.component';
import { BusinessInfoComponent } from './components/simulator/business-info/business-info.component';

const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'consumption', component: ConsumptionComponent},
  {path: 'ubication', component: UbicationComponent},
  {path: 'surface', component: SurfaceComponent},
  {path: 'saving', component: SavingComponent},
  {path: 'result', component: ResultComponent},
  {path: 'custom-consumption', component: CustomConsumptionComponent},
  {path: 'business-info', component: BusinessInfoComponent},
  {path: 'budget', component: BudgetComponent},
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
    ResultComponent,
    CustomConsumptionComponent,
    BudgetComponent,
    HomeBusinessComponent,
    ClientsComponent,
    BudgetsComponent,
    BusinessInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
