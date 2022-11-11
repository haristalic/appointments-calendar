import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { INode } from '../models/INode';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  date = new Date();
  private dateSource = new BehaviorSubject(
    moment(this.date).format('YYYY-MM-DD')
  );
  currentDate = this.dateSource.asObservable();

  constructor(private http: HttpClient) {}

  changeMessage(date: string) {
    this.dateSource.next(date);
  }
  getData(): Observable<INode[]> {
    return this.http.get<INode[]>('/assets/data/data.json');
  }
}
