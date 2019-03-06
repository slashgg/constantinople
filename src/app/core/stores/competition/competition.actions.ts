// tslint:disable:max-classes-per-file

import { Competition } from '@core/models/competition';
import { Action } from '@ngrx/store';

export enum CompetitionActions {
  COMPETITIONS_INIT = '[Competition] Init',
  COMPETITIONS_INIT_FINISHED = '[Competition] Init Finished',
  COMPETITIONS_GET = '[Competition] Get',
  COMPETITIONS_LOADED = '[Competition] Loaded',
  COMPETITION_SET = '[Competiton] Set',
}

export class InitCompetitions implements Action {
  readonly type = CompetitionActions.COMPETITIONS_INIT;
}

export class GetCompetitions implements Action {
  readonly type = CompetitionActions.COMPETITIONS_GET;
}

export class CompetitionsLoaded implements Action {
  readonly type = CompetitionActions.COMPETITIONS_LOADED;

  constructor(public competitions: Competition[]) {}
}

export class CompetitionsInitiFinished implements Action {
  readonly type = CompetitionActions.COMPETITIONS_INIT_FINISHED;
}

export class CompetitionSelected implements Action {
  readonly type = CompetitionActions.COMPETITION_SET;

  constructor(public competition: Competition) {}
}

export type Actions =
  | InitCompetitions
  | CompetitionsInitiFinished
  | CompetitionsLoaded
  | CompetitionSelected
  | GetCompetitions;
