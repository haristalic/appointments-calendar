import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventComponent } from '../modal-event/modal-event.component';
import { DataService } from 'src/app/shared/services/data.service';
import { INode } from 'src/app/shared/models/INode';
import { CustomCalendarEvent } from 'src/app/shared/interfaces/customCalendarEvent';
@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss'],
})
export class MainCalendarComponent implements OnInit {
  @Input() public appointments: INode[];

  public viewDate: Date;
  public events: CustomCalendarEvent[] = [];
  public view: CalendarView = CalendarView.Week;
  public refresh = new Subject<void>();

  constructor(public dialog: MatDialog, private data: DataService) {}

  ngOnInit(): void {
    this.filterAppointments();
  }
  public filterAppointments(): void {
    this.data.currentDate.subscribe((date) => (this.viewDate = new Date(date)));

    // filter appointments to check if there is more than one viewing in same time
    this.appointments.forEach((item) => {
      const key = item.date;
      const event = this.events.find(
        (el) => el.start.getTime() === new Date(item.date).getTime()
      );
      if (event) {
        event.viewings.push(item);
        event.title = event.viewings.length + ' VIEWINGS';
      } else {
        this.events.push({
          start: new Date(item.date),
          end: new Date(item.date),
          title: '1 VIEWING',
          index: this.events.length,
          viewings: [item],
        });
      }
    });
  }

  public eventClicked({ event }: any): void {
    this.dialog.open(ModalEventComponent, {
      data: { event: event, events: this.events },
      width: '600px',
    });
  }

  public eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
