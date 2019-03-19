import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CompetitionService } from '@core/services/competition';
import { CompetitionDetail } from 'competition/models/competition-detail.model';

@Component({
  selector: 'gg-competition-overview',
  templateUrl: './competition-overview.component.html',
})
export class CompetitionOverviewComponent implements OnInit {
  public competition: CompetitionDetail;
  public constructor(private route: ActivatedRoute, private competitionService: CompetitionService) {}

  ngOnInit() {
    const competitionId = this.route.snapshot.paramMap.get('competitionId');
    this.competitionService.getCompetition(competitionId).subscribe(competition => {
      this.competition = competition;
      console.log(this.competition);
    });
  }
}
