import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-small-month-calendar',
  templateUrl: './small-month-calendar.component.html',
  styleUrls: ['./small-month-calendar.component.scss'],
})
export class SmallMonthCalendarComponent implements OnInit {
  public selectedDate: Date;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.currentDate.subscribe(
      (date) => (this.selectedDate = new Date(date))
    );
  }

  public dateChange(): void {
    this.data.changeDate(moment(this.selectedDate).format('YYYY-MM-DD'));
  }
}
