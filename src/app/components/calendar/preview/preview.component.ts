import { Component, Input, OnInit } from '@angular/core';
import { INode } from 'src/app/shared/models';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input() public appointments: INode[];

  public nextViewing: INode;
  private nextAppointments: INode[] = [];
  private today = new Date();

  ngOnInit(): void {
    this.findNextViewing();
  }

  public findNextViewing(): void {
    for (let item in this.appointments) {
      if (
        // check if appointment is expired
        this.today.valueOf() <= new Date(this.appointments[item].date).valueOf()
      ) {
        this.nextAppointments.push(this.appointments[item]);
      }
    }
    // find view closest to current date and time
    this.nextViewing = this.nextAppointments.reduce((a, b) =>
      new Date(a.date).valueOf() - this.today.valueOf() <
      new Date(b.date).valueOf() - this.today.valueOf()
        ? a
        : b
    );
  }
}
