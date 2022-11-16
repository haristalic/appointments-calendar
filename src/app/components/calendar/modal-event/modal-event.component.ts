import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomCalendarEvent } from 'src/app/shared/interfaces/customCalendarEvent';
import { INode } from 'src/app/shared/models';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.scss'],
})
export class ModalEventComponent implements OnInit {
  public modalData: INode;
  public appointments: CustomCalendarEvent[];
  public index: number;
  public viewings: INode[];

  constructor(
    public dialogRef: MatDialogRef<ModalEventComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { event: CustomCalendarEvent; events: CustomCalendarEvent[] }
  ) {}

  ngOnInit(): void {
    this.getDataViewings();
  }

  public onNext(): void {
    this.index = this.index + 1;
    this.setObjects();
  }
  public onPrevious(): void {
    this.index = this.index - 1;
    this.setObjects();
  }

  public setObjects(): void {
    this.modalData = this.appointments[this.index]?.viewings[0];
    this.viewings = this.data.events[this.index]?.viewings;
  }
  private getDataViewings(): void {
    const event = this.data.event;
    this.index = event.index;
    this.appointments = this.data.events;
    this.setObjects();
  }
}
