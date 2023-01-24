import { sequence } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Square, DataMatrix, Move } from '../DataMatrix';
import { SearchAlgService } from '../search-alg.service';
import { SearchHelperService } from '../search-helper.service';

@Component({
  selector: 'app-astar',
  templateUrl: './astar.component.html',
  styleUrls: ['./astar.component.css']
})
export class AStarComponent {
  showS:boolean=false;
  matrix:boolean[][]=[];// used to mark source and destination
  matrixVisited:boolean[][]=[]; // used to mark visitedNodes
  source:Square={x:-1, y:-1, visited:false, wall:false, distance:0};;
  destination:Square={x:-1, y:-1, visited:false, wall:false, distance:0};
  dataMatrix:DataMatrix;
  click={value:1};
  move:Move;
  constructor(private searchService:SearchAlgService,private searchHelper: SearchHelperService,private cdr:ChangeDetectorRef){
    searchHelper.resetMatrix(this.matrix);
    searchHelper.resetMatrix(this.matrixVisited);
  }

  ngOnInit(): void {
    this.getDataAStar();
  }
  //request to get initial matrix for bfs
  public getDataAStar():void{
      this.searchService.getDataAStar().subscribe(
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
    return this.searchHelper.showSolution(i,j,this.dataMatrix,this.showS,this.matrixVisited);
  }
  //used to mark source and destination
  public onClick(event: MouseEvent,i:number,j:number){
    this.searchHelper.onClick(this.source,this.destination,this.click,this.matrix,i,j);
  }
  //updates view for every visited node every 1ms
  public showVisited(i=0){
    console.log(this.source.x);
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
  public startAStar():void{
    this.move={source:this.source,destination:this.destination,data:this.dataMatrix};
      this.searchService.startAStar(this.move).subscribe(
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
    this.searchHelper.resetMatrix(this.matrix);
    this.searchHelper.resetMatrix(this.matrixVisited);

    this.click={value:0};
    this.showS=false;
      this.searchService.resetAStar().subscribe(
        (response: DataMatrix)=>{
        this.dataMatrix=response;
      },(error:HttpErrorResponse)=>{
        console.log(error);
      } );
  }
}
