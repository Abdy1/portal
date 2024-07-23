import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberWithCommasPipe } from './../number-with-commas.pipe';

@NgModule({
  declarations: [NumberWithCommasPipe],
  imports: [CommonModule],
  exports: [NumberWithCommasPipe]
})
export class SharedModule {}
