import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
})
export class TabsPage {
  public readonly appColor: string = environment.contentColor;
  constructor(
    private router: Router,
  ) { }

  public navigateTo(whereTo: string): void {
    this.router.navigateByUrl('/app/tabs/' + whereTo);
  }
}
