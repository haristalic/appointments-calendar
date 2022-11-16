import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { INode } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private date = new Date();
  private dateSource = new BehaviorSubject(
    moment(this.date).format('YYYY-MM-DD')
  );
  public currentDate = this.dateSource.asObservable();

  constructor(private http: HttpClient) {}

  public changeDate(date: string) {
    this.dateSource.next(date);
  }
  public getData(): Observable<INode[]> {
    return this.http.get<INode[]>('/assets/data/data.json');
  }
}
