import { HasroleDirective } from './hasrole.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule ({
  imports: [
    CommonModule
  ],
  declarations: [HasroleDirective],
  exports: [HasroleDirective]
})

export class SharedModule { }
