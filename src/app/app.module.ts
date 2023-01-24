import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DFSComponent } from './dfs/dfs.component';
import { BFSComponent } from './bfs/bfs.component';
import { DijkstraComponent } from './dijkstra/dijkstra.component';
import { FormsModule } from '@angular/forms';
import { AStarComponent } from './astar/astar.component';
@NgModule({
  declarations: [
    AppComponent,
    DFSComponent,
    BFSComponent,
    DijkstraComponent,
    AStarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
    

  ],
  providers: [BFSComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
