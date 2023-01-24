import { ChangeDetectorRef, Injectable } from '@angular/core';
import { DataMatrix, Square } from './DataMatrix';

@Injectable({
  providedIn: 'root'
})
export class SearchHelperService {
  height=40;
  width=20;

  onClick(s:Square,d:Square,c:any,matrix:boolean[][],i:number,j:number){
    
    if(c.value<3){
      c.value++;
      if(c.value==1){
        s.x=i; s.y=j;
        matrix[i][j]=true;
      }
      if(c.value==2){
        d.x=i;
        d.y=j;
        matrix[i][j]=true;
      }
    } 
  }
  resetMatrix(matrix:boolean[][]){
    for(var i: number = 0; i < this.width; i++) {
      matrix[i] = [];
      for(var j: number = 0; j< this.height; j++) {
          matrix[i][j] = false;        
      }
    }
  }
  showSolution(i:number,j:number,d:DataMatrix,s:boolean,matrixV:boolean[][]):boolean{
    if(d && s)
      if(d?.solution)
        for(let k=0; k<d?.solution?.length; k++){
          if(d.solution[k].x==i && d.solution[k].y==j ){
            matrixV[i][j]=false;
            return true;
          }
          
        }
    return false;
  }

}
