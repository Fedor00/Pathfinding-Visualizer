package com.dijkstra.demo.Model;

public class DataMatrix {
    private Square[][] matrix;
    private int width;
    private int height;
    private Square[] visited;
    private Square[] solution;

    public DataMatrix(Square[][] matrix) {
        this.matrix = matrix;
    }

    public DataMatrix(int w,int h) {
        this.width=w;
        this.height=h;
        this.matrix=new Square[w][h];
        for(int i=0; i<w; i++){
            for(int j=0; j<h; j++){
                matrix[i][j]=new Square(i,j,false,false,Integer.MAX_VALUE);
            }
        }
    }


    public void setMatrix(Square[][] matrix) {
        this.matrix = matrix;
    }
    public Square getSquare(int x, int y) {
        return matrix[x][y];
    }

    public Square[][] getMatrix() {
        return matrix;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public Square[] getVisited() {
        return visited;
    }

    public void setVisited(Square[] visited) {
        this.visited = visited;
    }

    public Square[] getSolution() {
        return solution;
    }

    public void setSolution(Square[] solution) {
        this.solution = solution;
    }

    public void setHeight(int height) {
        this.height = height;
    }
}
