import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'app-redirect-host-source',
    templateUrl: 'redirect-host-source.component.html',
})
export class RedirectHostSourceComponent {
    @Input() group: any;
}
