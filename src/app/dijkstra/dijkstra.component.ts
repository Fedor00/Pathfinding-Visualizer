
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DataMatrix, Move, Square } from '../DataMatrix';
import { SearchAlgService } from '../search-alg.service';

@Component({
  selector: 'app-dijkstra',
  templateUrl: './dijkstra.component.html',
  styleUrls: ['./dijkstra.component.css']
})
export class DijkstraComponent implements OnInit{
  height=40;
  width=20;
  showS:boolean=false;
  matrix:boolean[][]=[];// used to mark source and destination
  matrixVisited:boolean[][]=[]; // used to mark visitedNodes
  source:Square;
  destination:Square;
  dataMatrix:DataMatrix;
  click=0;
  move:Move;
  constructor(private searchService:SearchAlgService,private cdr: ChangeDetectorRef){
    for(var i: number = 0; i < this.width; i++) {
      this.matrix[i] = [];
      this.matrixVisited[i] = [];
      for(var j: number = 0; j< this.height; j++) {
          this.matrix[i][j] = false;
          this.matrixVisited[i][j] = false;
      }
    }
  }

  ngOnInit(): void {
    this.getDataDijkstra();
  }
  //request to get initial matrix for bfs
  public getDataDijkstra():void{
      this.searchService.getDataDijkstra().subscribe(
        (response: DataMatrix)=>{
        this.dataMatrix=response;
        
      },(error:HttpErrorResponse)=>{
        console.log(error);
      } );
  }
  onDrag(event: DragEvent,i:number,j:number) {
    this.dataMatrix.matrix[i][j].wall=true;
  }
  // after bfs is done, we print solution
  showSolution(i:number,j:number):boolean{
    if(this.dataMatrix && this.showS)
      if(this.dataMatrix?.solution)
        for(let k=0; k<this.dataMatrix?.solution?.length; k++){
          if(this.dataMatrix.solution[k].x==i && this.dataMatrix.solution[k].y==j ){
            this.matrixVisited[i][j]=false;
            return true;
          }
          
        }
    return false;
  }
  //used to mark source and destination
  public onClick(event: MouseEvent,i:number,j:number){
    if(this.click<3){
      if(event.button==0){
        this.click++;
        if(this.click==1){
          this.source={x:i,y:j,visited:false,wall:false,distance:0};
          this.matrix[i][j]=true;
        }
        if(this.click==2){
          this.destination={x:i,y:j,visited:false,wall:false,distance:0};
          this.matrix[i][j]=true;
        }
      }
    }
  }
  //updates view for every visited node every 1ms
  public showVisited(i=0){
    if (i === this.dataMatrix.visited.length) {
      this.showS=true;
      return;
    }
    this.matrixVisited[this.dataMatrix.visited[i].x][this.dataMatrix.visited[i].y]=true; 
    this.cdr.detectChanges();
    setTimeout(() => {
      this.cdr.detectChanges();
      this.showVisited(i + 1);
    }, 1); 
  }
  // request to back-end to start bfs
  public startDijkstra():void{
    this.move={source:this.source,destination:this.destination,data:this.dataMatrix};
      this.searchService.startDijkstra(this.move).subscribe(
        (response: DataMatrix)=>{
        this.dataMatrix=response;
        if(this.dataMatrix){
          this.showVisited();
         
        }     
      },(error:HttpErrorResponse)=>{
        console.log(error);
      } );
  }
  //resets visited and source-destination squares + request to reset dataBfs in back-end
  public reset():void{
    for(var i: number = 0; i < this.width; i++) {
      this.matrix[i] = [];
      this.matrixVisited[i] = [];
      for(var j: number = 0; j< this.height; j++) {
          this.matrix[i][j] = false;
          this.matrixVisited[i][j] = false;
      }
    }
    this.click=0;
    this.showS=false;
      this.searchService.resetDjikstra().subscribe(
        (response: DataMatrix)=>{
        this.dataMatrix=response;
      },(error:HttpErrorResponse)=>{
        console.log(error);
      } );
  }
}
