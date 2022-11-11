import { Component, Input, OnInit } from '@angular/core';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input() appointments: INode[];

  nextViewing: INode;
  nextAppointments: INode[] = [];
  today = new Date();

  ngOnInit(): void {
    this.findNextViewing();
  }

  findNextViewing(): void {
    for (let item in this.appointments) {
      if (
        this.today.valueOf() <= new Date(this.appointments[item].date).valueOf()
      ) {
        this.nextAppointments.push(this.appointments[item]);
      }
    }
    this.nextViewing = this.nextAppointments.reduce((a: any, b: any) =>
      new Date(a.date).valueOf() - this.today.valueOf() <
      new Date(b.date).valueOf() - this.today.valueOf()
        ? a
        : b
    );
  }
}
