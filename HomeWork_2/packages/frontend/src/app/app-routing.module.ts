import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricalDataComponent } from './components/historical-data/historical-data.component';
import { WorkDataComponent } from './components/work-data/work-data.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { DownloadComponent } from './components/download/download.component';
import { UsersComponent } from './components/users/users.component';
import { MainTableComponent } from './components/main-table/main-table.component';

const routes: Routes = [
  { path: 'home', component: MainTableComponent },
  { path: 'historical-data', component: HistoricalDataComponent },
  { path: 'work-data', component: WorkDataComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'download', component: DownloadComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
