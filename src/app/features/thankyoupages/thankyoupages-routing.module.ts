import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth-guard';

import { ThankyoupagesComponent } from './thankyoupages.component';

const routes: Routes = [
  {
    path: '',
    component: ThankyoupagesComponent,
    children: [
      {
        path: 'thankcbsv',
        loadChildren: () =>
          import('./thankcbsv/thankcbsv.module').then((m) => m.ThankcbsvModule),
        // import('./order-report/order-report.module').then((m) => m.OrderReportModule),
        //import('./package/package.module').then((m) => m.PackageModule),
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThankyoupagesRoutingModule { }
