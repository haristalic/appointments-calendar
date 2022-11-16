import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmallMonthCalendarComponent } from './components/calendar/small-month-calendar/small-month-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MainCalendarComponent } from './components/calendar/main-calendar/main-calendar.component';
import { ModalEventComponent } from './components/calendar/modal-event/modal-event.component';
import { FiltersComponent } from './components/calendar/filters/filters.component';
import { PreviewComponent } from './components/calendar/preview/preview.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppointmentEffect } from './components/calendar/state/appointments.effects';
import { appointmentReducer } from './components/calendar/state/appointments.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    SmallMonthCalendarComponent,
    MainCalendarComponent,
    ModalEventComponent,
    FiltersComponent,
    PreviewComponent,
    CalendarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    StoreModule.forFeature('data', appointmentReducer),
    EffectsModule.forFeature([AppointmentEffect]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
