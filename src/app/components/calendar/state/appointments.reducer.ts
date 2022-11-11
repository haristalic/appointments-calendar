import { INodes } from 'src/app/shared/models/INodes';

import * as appointmentsActions from './appointments.actions';

export interface AppointmentState {
  appointments: INodes[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  loaded: false,
  error: '',
};

export function appointmentReducer(
  state = initialState,
  action: appointmentsActions.appointmentsActions
): AppointmentState {
  switch (action.type) {
    case appointmentsActions.IAppointmentsActionTypes.LOAD_APPOINTMENTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case appointmentsActions.IAppointmentsActionTypes
      .LOAD_APPOINTMENTS_SUCCESS: {
      return {
        ...state,
        appointments: action.payload,
        loading: false,
        loaded: true,
      };
    }
    case appointmentsActions.IAppointmentsActionTypes.LOAD_APPOINTMENTS_FAIL: {
      return {
        ...state,
        appointments: [],
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }
  }
}
