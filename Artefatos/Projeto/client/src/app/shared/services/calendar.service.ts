import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CommandResult } from 'src/app/shared/models/CommandRestult.model';
import { QueryResult } from 'src/app/shared/models/QueryResult.model';

import { RemoveCalendarCommand } from 'src/app/calendar/models/commands/removeCalendarCommand';
import { ListCalendarQuery } from 'src/app/calendar/models/queries/listCalendarQuery';
import { Content } from '../utils/content';
import { CalendarList } from 'src/app/calendar/models/view-models/calendar.list';
import { CalendarDetails } from 'src/app/calendar/models/view-models/calendar.details';
import { CreateCalendarCommand } from 'src/app/calendar/models/commands/createCalendarCommand';
import { UpdateCalendarCommand } from 'src/app/calendar/models/commands/updateCalendarCommand';
import { GetCalendarQuery } from 'src/app/calendar/models/queries/getCalendarQuery';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  create(command: CreateCalendarCommand): Observable<CommandResult> {
    return this.http.post<CommandResult>(`${this.url}/calendars`, command);
  }

  update(command: UpdateCalendarCommand): Observable<CommandResult> {
    return this.http.put<CommandResult>(`${this.url}/calendars/${command.id}`, command);
  }

  removeCalendar(command: RemoveCalendarCommand): Observable<CommandResult> {
    return this.http.delete<CommandResult>(`${this.url}/calendars/${command.id}`, Content.GetParams(command));
  }

  getCalendar(query: ListCalendarQuery): Observable<QueryResult<CalendarList>> {
    return this.http.get<QueryResult<CalendarList>>(`${this.url}/calendars`, Content.GetParams(query));
  }

  getCalendarById(query: GetCalendarQuery): Observable<QueryResult<CalendarDetails>> {
    return this.http.get<QueryResult<CalendarDetails>>(`${this.url}/calendars/${query.id}`, Content.GetParams(query));
  }
}
