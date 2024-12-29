import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoricalDataComponent} from './components/historical-data/historical-data.component';
import {WorkDataComponent} from './components/work-data/work-data.component';
import {AnalysisComponent} from './components/analysis/analysis.component';
import {DownloadComponent} from './components/download/download.component';
import {UsersComponent} from './components/users/users.component';
import {MainTableComponent} from './components/main-table/main-table.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './services/guards/auth.guard';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {path: 'home', component: MainTableComponent, canActivate: [AuthGuard]},
  {path: 'historical-data', component: HistoricalDataComponent, canActivate: [AuthGuard]},
  {path: 'work-data', component: WorkDataComponent, canActivate: [AuthGuard]},
  {path: 'analysis', component: AnalysisComponent, canActivate: [AuthGuard]},
  {path: 'download', component: DownloadComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
