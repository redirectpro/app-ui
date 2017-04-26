import { Injectable } from '@angular/core';
import { RedirectModel } from '../shared/redirect.model';
import { ApplicationService } from '../../shared/application/application.service';

@Injectable()
export class RedirectListService {
  list: Array<RedirectModel>;

  constructor(public applicationService: ApplicationService) { }

  populate() {
    this.applicationService.redirect.getRedirects().then((data: Array<RedirectModel>) => {
      this.list = data;
    });
  }

  assign(redirect: RedirectModel) {
    /* Identify redirect in list */
    const update = this.list.find((e: RedirectModel) => {
      return (e.id === redirect.id);
    });

    /* If result is there, update */
    if (update) {
      this.list.map((e: RedirectModel) => {
        if (e.id === redirect.id) { Object.assign(e, redirect); }
        return e;
      });

    /* If result is not there, add */
    } else {
      this.list.push(redirect);
    }
  }

  delete(redirect: RedirectModel) {
    this.applicationService.redirect.deleteRedirect(redirect.id).then(() => {
      this.list = this.list.filter(e => e.id !== redirect.id);
    });
  }
}