import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: './tab-home/tab-home.module#TabHomeModule',
          },
        ],
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: './tab-map/tab-map.module#TabMapModule',
          },
        ],
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: './tab3/tab3.module#Tab3PageModule',
          },
        ],
      },
      {
        path: '',
        redirectTo: '/app/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/app/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
