import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { StartGameComponent } from './start-game/start-game.component';
import { GameTableComponent } from './game-table/game-table.component';
import { EndGameComponent } from './end-game/end-game.component';
import { CardComponent } from './game-table/card/card.component';
import { GameStateService } from './_services/game-state.service';
import { GameScreenGuard } from './_guards/game-screen.guard';
import { EndScreenGuard } from './_guards/end-screen.guard';

const appRoutes: Routes = [
  { path: "game", component: GameTableComponent, canActivate: [GameScreenGuard] },
  { path: "end", component: EndGameComponent, canActivate: [EndScreenGuard] },
  { path: "", component: StartGameComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    StartGameComponent,
    GameTableComponent,
    EndGameComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameStateService,
    GameScreenGuard,
    EndScreenGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
