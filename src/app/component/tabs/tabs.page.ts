import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsUtils } from '../../utils/components-utils';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
})
export class TabsPage extends ComponentsUtils {
  constructor(
    private router: Router,
  ) { super(); }

  public navigateTo(whereTo: string): void {
    this.router.navigateByUrl('/app/tabs/' + whereTo);
  }
}
