import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CommandResult } from 'src/app/shared/models/CommandRestult.model';
import { QueryResult } from 'src/app/shared/models/QueryResult.model';

import { Content } from '../utils/content';
import { CreateTrainingCommand } from 'src/app/training/models/commands/createTrainingCommand';
import { UpdateTrainingCommand } from 'src/app/training/models/commands/updateTrainingCommand';
import { RemoveTrainingCommand } from 'src/app/training/models/commands/removeTrainingCommand';
import { ListTrainingQuery } from 'src/app/training/models/queries/ListTrainingQuery';
import { TrainingList } from 'src/app/training/models/view-models/training.list';
import { ListTrainingExerciseQuery } from 'src/app/training/models/queries/ListTrainingExerciseQuery';
import { TrainingExerciseList } from 'src/app/training/models/view-models/trainingExercise.list';
import { GetTrainingQuery } from 'src/app/training/models/queries/GetTrainingQuery';
import { TrainingDetails } from 'src/app/training/models/view-models/training.details';




@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  create(command: CreateTrainingCommand): Observable<CommandResult> {
    return this.http.post<CommandResult>(`${this.url}/trainings`, command);
  }

  update(command: UpdateTrainingCommand): Observable<CommandResult> {
    return this.http.put<CommandResult>(`${this.url}/trainings/${command.id}`, command);
  }

  removeTraining(command: RemoveTrainingCommand): Observable<CommandResult> {
    return this.http.delete<CommandResult>(`${this.url}/trainings/${command.id}`, Content.GetParams(command));
  }

  getTraining(query: ListTrainingQuery): Observable<QueryResult<TrainingList>> {
    return this.http.get<QueryResult<TrainingList>>(`${this.url}/calendars/trainings`, Content.GetParams(query));
  }

  getExercise(query: ListTrainingExerciseQuery): Observable<QueryResult<TrainingExerciseList>> {
    return this.http.get<QueryResult<TrainingExerciseList>>(`${this.url}/trainings/exercise`, Content.GetParams(query));
  }

  getTrainingById(query: GetTrainingQuery): Observable<QueryResult<TrainingDetails>> {
    return this.http.get<QueryResult<TrainingDetails>>(`${this.url}/trainings/${query.id}`, Content.GetParams(query));
  }
}
