import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoricoService } from 'src/app/services/storico/storico.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  constructor(public storicoServices:StoricoService, private router: Router){}

  navigateToRun(id: string) {
    this.router.navigate(['/run', id]);
  }

}
