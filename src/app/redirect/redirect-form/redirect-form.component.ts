import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

  constructor() {
  }

  ngOnInit() {
    this.redirect = {
      hostTarget: 'testxxxxxxx',
      hostSources: [ 'www.uol.com.br', 'xwww.uol.com.br' ]
    };
  }

  save(model: Redirect, isValid: boolean) {
    console.log(model, isValid);
  }
}

interface Redirect {
    hostTarget: String;
    hostSources: Array<String>;
}
