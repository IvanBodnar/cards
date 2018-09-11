import {Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ThemeListComponent} from './components/theme-list/theme-list.component';
import {CardComponent} from './components/card-list/card/card.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'themes', component: ThemeListComponent},
  {path: 'cards/:id', component: CardComponent},
  {path: '', component: HomeComponent}
];
