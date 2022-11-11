import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.scss'],
})
export class ModalEventComponent implements OnInit {
  modalData: INode;
  appointments: INode[];
  index: number;

  constructor(
    public dialogRef: MatDialogRef<ModalEventComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { event: number; appointmens: INode[] }
  ) {}

  ngOnInit(): void {
    this.getDataViewings();
  }

  getDataViewings(): void {
    this.index = this.data.event;
    this.modalData = this.data.appointmens[this.index];
    this.appointments = this.data.appointmens;
  }
  onNext(): void {
    this.index = this.index + 1;
    this.modalData = this.appointments[this.index];
  }
  onPreviews(): void {
    this.index = this.index - 1;
    this.modalData = this.appointments[this.index];
  }
}
