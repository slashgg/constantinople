import { formatJSDate } from '@utils/utils/date';
import { DateTime } from 'luxon';

export class TournamentDetail {
  public id: string;
  public name: string;
  public startDate?: Date;
  public endDate?: Date;
  public applicationRequired: boolean;
  public canSignup: boolean;
  public signupOpenDate?: Date;
  public signupCloseDate?: Date;
  public tokenImageURL: string;
  public state: string;
  public type: string;
  public parentTournamentId: string;
  public parentTournamentName: string;

  constructor(obj?: Partial<TournamentDetail>) {
    this.id = (obj && obj.id) || undefined;
    this.name = (obj && obj.name) || undefined;
    this.startDate = (obj && obj.startDate && new Date(obj.startDate)) || undefined;
    this.endDate = (obj && obj.endDate && new Date(obj.endDate)) || undefined;
    this.applicationRequired = (obj && obj.applicationRequired) || false;
    this.canSignup = (obj && obj.canSignup) || false;
    this.signupOpenDate = (obj && obj.signupOpenDate && new Date(obj.signupOpenDate)) || undefined;
    this.signupCloseDate = (obj && obj.signupCloseDate && new Date(obj.signupCloseDate)) || undefined;
    this.tokenImageURL = (obj && obj.tokenImageURL) || undefined;
    this.state = (obj && obj.state) || undefined;
    this.type = (obj && obj.type) || undefined;
    this.parentTournamentId = (obj && obj.parentTournamentId) || undefined;
    this.parentTournamentName = (obj && obj.parentTournamentName) || undefined;
  }

  get formattedStartDate() {
    if (!this.startDate) {
      return 'N/A';
    }
    return formatJSDate(this.startDate, DateTime.DATE_MED);
  }
}
