import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as appointmentsActions from './state/appointments.actions';
import { Subscription } from 'rxjs';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  storeSubscription: Subscription;
  appointments: INode[];

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.getDataFromStore();
  }

  getDataFromStore():void {
    this.store.dispatch(new appointmentsActions.LoadAppointments());
    this.storeSubscription = this.store.subscribe(
      (state) =>
        state?.data.loaded && this.sortAppointments(state.data.appointments)
    );
  }

  sortAppointments(appointments: INode[]): void {
    this.appointments = appointments.filter((value, index, appointments) =>
    index === appointments.findIndex((appointment) => (
      appointment.date === value.date && appointment.property.id === value.property.id
    ))
  );
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
