import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as appointmentsActions from './appointments.actions';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable()
export class AppointmentEffect {

  constructor(private actions$: Actions, private dataService: DataService) {}

  loadNodes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<appointmentsActions.LoadAppointments>(
        appointmentsActions.IAppointmentsActionTypes.LOAD_APPOINTMENTS
      ),
      mergeMap(() =>
        this.dataService.getData().pipe(
          map((data: any) => {
            return new appointmentsActions.LoadAppointmentsSuccess(
              data.data.appointments.nodes
            );
          }),
          catchError((err: string) =>
            of(new appointmentsActions.LoadAppointmentsFail(err))
          )
        )
      )
    )
  );
}
