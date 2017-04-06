import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApplicationService } from '../../application/application.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-redirect-form',
  templateUrl: './redirect-form.component.html',
  styleUrls: ['./redirect-form.component.css'],
  host: {
    class: 'test'
  }
})
export class RedirectFormComponent implements OnInit {
  redirect: Redirect;
  redirectId: String;
  event: EventEmitter = new EventEmitter();

  constructor(
    public applicationService: ApplicationService,
    public router: Router,
    public route: ActivatedRoute
  ) {

    this.event.on('ready', () => {
      if (this.redirectId) { this.getRedirect(); }
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.redirectId = params['redirectId'];
    });

    if (this.applicationService.ready === true) {;
      this.event.emit('ready', true);
    } else {
      this.applicationService.event.on('ready', () => {
        this.event.emit('ready', true);
      });
    }

    this.redirect = {
      hostTarget: '',
      hostSources: [ ]
    };
  }

  getRedirect() {
    this.applicationService.redirect.getRedirect(this.redirectId).then((data) => {
        this.redirect = data as Redirect;
    });
  }

  save(model: Object, isValid: boolean) {
    if (typeof(model['hostSources']) === 'string') {
      model['hostSources'] = model['hostSources'].replace(/\s/g, '').split(',');
    }

    if (isValid === true && this.redirectId === undefined) {
      this.applicationService.redirect.postRedirect(model).then((data) => {
        // console.log(data);
        this.router.navigateByUrl(`/redirect/${data['id']}/edit`);
      });
    } else if (isValid === true && this.redirectId) {
      this.applicationService.redirect.putRedirect(this.redirectId, model).then((data) => {
        console.log(data);
        console.log('updated!');
      });
    }
  }

}

interface Redirect {
    hostTarget: String;
    hostSources: Array<String>;
}
