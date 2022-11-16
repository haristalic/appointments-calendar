import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as appointmentsActions from './state/appointments.actions';
import { Subscription } from 'rxjs';
import { INode } from 'src/app/shared/models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  public appointments: INode[];
  private storeSubscription: Subscription;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.getDataFromStore();
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  private getDataFromStore(): Subscription {
    this.store.dispatch(new appointmentsActions.LoadAppointments());
    return (this.storeSubscription = this.store.subscribe(
      (state) =>
        state?.data.loaded && this.sortAppointments(state.data.appointments)
    ));
  }

  private sortAppointments(appointments: INode[]): INode[] {
    // return only uniques appointments sort by time
    return (this.appointments = appointments
      .filter(
        (value, index, appointments) =>
          index ===
          appointments.findIndex(
            (appointment) =>
              appointment.date === value.date &&
              appointment.property.id === value.property.id
          )
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  }
}
