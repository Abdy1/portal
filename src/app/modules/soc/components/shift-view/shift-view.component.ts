import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../services/shift/shiftService';
import { Shift } from '../../models/shift';

@Component({
  selector: 'analyst-view',
  templateUrl: 'shift-view.component.html',
})
export class ShiftViewComponent implements OnInit {

 

  constructor(private shiftService: ShiftService) { }
  shifts: Shift[] = [];

  ngOnInit() {
    this.shiftService.getAllShifts().subscribe({
      next: (data) => {
        this.shifts = data;
      },
      error: (err) => {
        console.error('Error fetching shifts:', err);
      }
    });
  
  }

 


}
