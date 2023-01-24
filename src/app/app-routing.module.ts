import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AStarComponent } from './astar/astar.component';
import { BFSComponent } from './bfs/bfs.component';
import { DFSComponent } from './dfs/dfs.component';
import { DijkstraComponent } from './dijkstra/dijkstra.component';

const routes: Routes = [ 
  { path: 'bfs', component: BFSComponent },
{ path: 'dfs', component: DFSComponent },
{ path: 'dijkstra', component: DijkstraComponent },
{path: 'A*', component: AStarComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
