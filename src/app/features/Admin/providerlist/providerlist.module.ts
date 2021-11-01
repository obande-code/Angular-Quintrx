import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { ProviderlistRoutingModule } from './providerlist-routing.module';
import { ProviderlistComponent } from './providerlist.component';
import { DataTablesModule } from "angular-datatables";
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmationDialogComponent } from '../../../Dialogbox/confirmation-dialog.component';
import { ConfirmationDialogService } from '../../../Dialogbox/confirmation-dialog.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [ProviderlistComponent, ConfirmationDialogComponent],
    imports: [CommonModule, ProviderlistRoutingModule, FormsModule, ReactiveFormsModule,
      MatTableModule,
      MatToolbarModule,
      MatInputModule,
      MatPaginatorModule,
      MatSortModule,
      MatFormFieldModule, NgbModule ],
      providers: [ ConfirmationDialogService ],
      entryComponents: [ ConfirmationDialogComponent ],
  })
  export class ProviderlistModule {}
  