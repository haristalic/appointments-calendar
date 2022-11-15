import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventComponent } from '../modal-event/modal-event.component';
import { DataService } from 'src/app/shared/services/data.service';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss'],
})

export class MainCalendarComponent implements OnInit {
  @Input() appointments: INode[];

  viewDate: Date;
  events: CalendarEvent[] = [];
  view: CalendarView = CalendarView.Week;
  refresh = new Subject<void>();

  constructor(public dialog: MatDialog, private data: DataService) {}

  ngOnInit(): void {
    this.data.currentDate.subscribe((date) => (this.viewDate = new Date(date)));
    this.events = this.appointments.map(
      (appointment: INode, index: number) => ({
        start: new Date(appointment.date),
        end: new Date(appointment.date),
        title: 'VIEWINGS',
        data: index,
      })
    );
  }

  eventClicked({ event }:any): void {
    this.dialog.open(ModalEventComponent, {
      data: { event: event.data, appointmens: this.appointments },
      width: '600px',
    });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
