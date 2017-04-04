import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../application/application.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-redirect-list',
  templateUrl: './redirect-list.component.html',
  styleUrls: ['./redirect-list.component.css']
})
export class RedirectListComponent implements OnInit {
  listRedirect: Array<Object>;
  event: EventEmitter = new EventEmitter();

  constructor(
    private applicationService: ApplicationService
  ) {
  }

  ngOnInit() {
    this.event.on('ready', () => {
      this.getRedirectList();
    });

    if (this.applicationService.ready === true) {;
      this.event.emit('ready', true);
    } else {
      this.applicationService.event.on('ready', () => {
        this.event.emit('ready', true);
      });
    }
  }

  getRedirectList() {
    this.applicationService.redirect.getRedirects().then((data: Array<Object>) => {
      this.listRedirect = data;
    });
  }
}
