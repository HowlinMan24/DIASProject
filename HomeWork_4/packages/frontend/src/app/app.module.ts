import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { BodyMainComponent } from './components/body-main/body-main.component';
import { MainTableComponent } from './components/main-table/main-table.component';
import { HistoricalDataComponent } from './components/historical-data/historical-data.component';
import { WorkDataComponent } from './components/work-data/work-data.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { DownloadComponent } from './components/download/download.component';
import { UsersComponent } from './components/users/users.component';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {PaginatorModule} from 'primeng/paginator';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    BodyMainComponent,
    MainTableComponent,
    HistoricalDataComponent,
    WorkDataComponent,
    AnalysisComponent,
    DownloadComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
