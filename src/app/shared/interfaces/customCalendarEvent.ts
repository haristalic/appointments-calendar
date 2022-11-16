import { CalendarEvent } from "angular-calendar";
import { INode } from "../models";

export interface CustomCalendarEvent extends CalendarEvent {
  index: number;
  viewings: INode[];
}
