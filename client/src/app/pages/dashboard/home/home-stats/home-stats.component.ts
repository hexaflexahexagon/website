import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {UserStats} from '../../../../@core/models/user-stats.model';

@Component({
  selector: 'home-stats',
  templateUrl: './home-stats.component.html',
  styleUrls: ['./home-stats.component.scss'],
})
export class HomeStatsComponent implements OnInit, OnChanges {

  @Input('userStats') userStats: UserStats;
  loading: boolean;

  constructor() {
    this.loading = true;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.userStats) {
      this.loading = false;
    }
  }

}
