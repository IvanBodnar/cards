import {Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ThemeListComponent} from './components/theme-list/theme-list.component';
import {CardComponent} from './components/card-list/card/card.component';
import {ThemeEditComponent} from './components/theme-list/theme-edit/theme-edit.component';
import {CardListComponent} from './components/card-list/card-list.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'themes', component: ThemeListComponent},
  {path: 'cards', component: CardListComponent},
  {path: 'cards/:id', component: CardComponent},
  {path: 'theme/:id/edit', component: ThemeEditComponent},
  {path: '', component: HomeComponent}
];
