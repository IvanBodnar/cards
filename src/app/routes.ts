import {Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ThemeListComponent} from './components/theme-list/theme-list.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'themes', component: ThemeListComponent},
  {path: '', component: HomeComponent}
];
