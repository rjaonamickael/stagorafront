import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StageService } from '../stage.service';

@Component({
  selector: 'app-consulter-stage',
  templateUrl: './consulter-stage.component.html',
  styleUrls: ['./consulter-stage.component.scss'],
})
export class ConsulterStageComponent implements OnInit {
  stage: any;

  constructor(
    private route: ActivatedRoute,
    private stageService: StageService
  ) {}

  ngOnInit(): void {
    const stageId = this.route.snapshot.paramMap.get('id');
    if (stageId) {
      this.stageService.getStageById(+stageId).subscribe({
        next: (data) => (this.stage = data),
        error: (err) => console.error('Erreur lors de la récupération du stage :', err),
      });
    }
  }
}
