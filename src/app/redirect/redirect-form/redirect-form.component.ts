import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApplicationService } from '../../application/application.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-redirect-form',
  templateUrl: './redirect-form.component.html',
  styleUrls: ['./redirect-form.component.css']
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
      targetHost: '',
      targetProtocol: 'http',
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

  fileChange(event) {
    const fileList: FileList = event.target.files;
    console.log(1)
    if (fileList.length > 0) {
      console.log(2)
      const file: File = fileList[0];
      this.applicationService.redirect.postUpload(this.redirectId, file).then((data) => {
        console.log(3)
        console.log(data);
        console.log('uploaded');
      });

  //     const formData: FormData = new FormData();
  //     formData.append('uploadFile', file, file.name);
  //     const headers = new Headers();
  //     headers.append('Content-Type', 'multipart/form-data');
  //     headers.append('Accept', 'application/json');
  //     console.log('foi!!!');
  //     console.log(file);
  //     console.log(file.name)
  //     // const options = new RequestOptions({ headers: headers });
  //     // this.http.post(`${this.apiEndPoint}`, formData, options)
  //     //   .map(res => res.json())
  //     //   .catch(error => Observable.throw(error))
  //     //   .subscribe(
  //     //     data => console.log('success'),
  //     //     error => console.log(error)
  //     //   )
    }
  }
}

interface Redirect {
    targetHost: String;
    targetProtocol: String;
    hostSources: Array<String>;
}
