export  interface DataMatrix{
    matrix:Square[][];
    visited: Square[];
    solution:  Square[];
}
export interface Square{
   x:number;
   y:number;
   visited:boolean;
   wall:boolean;
   distance:number;

}
export interface Move{
    source:Square;
    destination:Square;
    data:DataMatrix;
}