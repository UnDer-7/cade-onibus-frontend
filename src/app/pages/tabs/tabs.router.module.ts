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
        path: 'map/:linha',
        children: [
          {
            path: '',
            loadChildren: './tab-map/tab-map.module#TabMapModule',
          },
        ],
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: './tab-perfil/tab-perfil.module#TabPerfilModule',
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
