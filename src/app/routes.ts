import {Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ThemeListComponent} from './components/theme-list/theme-list.component';
import {CardComponent} from './components/card/card.component';
import {ThemeEditComponent} from './components/theme-list/theme-edit/theme-edit.component';
import {CardListComponent} from './components/card-list/card-list.component';
import {CardEditComponent} from './components/card-edit/card-edit.component';
import {CardResolverService} from './services/card-resolver.service';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'themes', component: ThemeListComponent},
  {path: 'theme/:id/edit', component: ThemeEditComponent},
  {path: 'cards/:themeId', component: CardListComponent},
  {path: 'card/:id', component: CardComponent},
  {path: 'card/:id/edit', component: CardEditComponent, resolve: {card: CardResolverService}},
  {path: '', component: HomeComponent}
];
