import { Action } from '@ngrx/store';
import { INodes } from 'src/app/shared/models/INodes';

export enum IAppointmentsActionTypes {
  LOAD_APPOINTMENTS = '[APPOINTMENTS] Load Appointments',
  LOAD_APPOINTMENTS_SUCCESS = '[APPOINTMENTS] Load Appointments Success',
  LOAD_APPOINTMENTS_FAIL = '[APPOINTMENTS] Load Appointments Fail',
}

export class LoadAppointments implements Action {
  readonly type = IAppointmentsActionTypes.LOAD_APPOINTMENTS;
}

export class LoadAppointmentsSuccess implements Action {
  readonly type = IAppointmentsActionTypes.LOAD_APPOINTMENTS_SUCCESS;
  constructor(public payload: INodes[]) {}
}
export class LoadAppointmentsFail implements Action {
  readonly type = IAppointmentsActionTypes.LOAD_APPOINTMENTS_FAIL;
  constructor(public payload: string) {}
}

export type appointmentsActions =
  | LoadAppointments
  | LoadAppointmentsSuccess
  | LoadAppointmentsFail;
