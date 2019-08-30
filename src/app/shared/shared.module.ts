import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MaterialModule, CommonModule, FlexLayoutModule],
  exports: [MaterialModule, CommonModule, FlexLayoutModule]
})
export class SharedModule {}
