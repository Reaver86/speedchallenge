import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableEvent } from '@typebytes/ngx-template-streams';
import { filter, map, scan } from 'rxjs/operators';

type Drinks = 'B' | 'W' | 'G';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ObservableEvent() click$: Observable<any>;

  B$: Observable<number>;
  W$: Observable<number>;
  G$: Observable<number>;

  private height: (drink: Drinks) => Observable<number> = (drink: Drinks) => {
    return this.click$.pipe(
      filter(input => input === drink),
      scan((acc, _) => acc * 2, 1),
      map(factor => factor * 50)
    );
  }

  ngOnInit(): void {
    this.B$ = this.height('B');
    this.W$ = this.height('W');
    this.G$ = this.height('G');
  }
}
