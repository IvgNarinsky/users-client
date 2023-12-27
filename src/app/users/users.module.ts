import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { LayoutModule } from 'src/app/components/layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const routes: Routes = [{ path: '', component: UsersComponent }];
const customNotifierOptions: NotifierOptions = {
  position: { horizontal: { position: 'right' }, vertical: { position: 'bottom' } },
  theme: 'material',
  behaviour: {
    autoHide: 5000
  },

};
@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NotifierModule.withConfig(customNotifierOptions),

  ]
})
export class UsersModule { }
