import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as appointmentsActions from './state/appointments.actions';
import { filter, Subscription } from 'rxjs';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  storeSubscription!: Subscription;
  appointments: INode[];

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.getDataFromStore();
  }

  getDataFromStore() {
    this.store.dispatch(new appointmentsActions.LoadAppointments());
    this.storeSubscription = this.store
      .pipe(filter((appointment) => appointment.data.loaded === true))
      .subscribe((state) => (this.appointments = state.data.appointments));
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
