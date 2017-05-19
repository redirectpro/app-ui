import { Injectable } from '@angular/core';
import { RedirectModel } from '../shared/redirect.model';
import { ApplicationService } from '../../shared/application/application.service';

@Injectable()
export class RedirectListService {
  list: Array<RedirectModel>;

  constructor(public applicationService: ApplicationService) { }

  populate() {
    return new Promise((resolve) => {
      this.applicationService.redirect.getRedirects().then((data: Array<RedirectModel>) => {
        this.list = data;
        resolve()
      });
    })    
  }

  assign(redirect: RedirectModel) {
    /* Result format */
    const result = {
      added: false,
      updated: false
    };

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
      result.updated = true;
    /* If result is not there, add */
    } else {
      this.list.push(redirect);
      result.added = true;
    }

    return result;
  }

  delete(redirect: RedirectModel) {
    this.applicationService.redirect.deleteRedirect(redirect.id).then(() => {
      this.list = this.list.filter(e => e.id !== redirect.id);
    });
  }
}