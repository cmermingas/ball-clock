import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  level1Source = Observable.interval(1000);
  level2Source = new Subject<any>();
  level3Source = new Subject<any>();
}
