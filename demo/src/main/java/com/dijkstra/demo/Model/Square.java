package com.dijkstra.demo.Model;

public class Square implements Comparable<Square>{
    private int x;
    private int y;
    private boolean visited;
    private boolean wall;
    private int distance;
    private Square prev;

    public Square getPrev() {
        return prev;
    }

    public void setPrev(Square prev) {
        this.prev = prev;
    }

    public Square(int x, int y, boolean visited, boolean wall, int distance) {
        this.x = x;
        this.y = y;
        this.visited = visited;
        this.wall = wall;
        this.distance = distance;
    }

    public Square(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public Square() {
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public boolean isVisited() {
        return visited;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public boolean isWall() {
        return wall;
    }

    public void setWall(boolean wall) {
        this.wall = wall;
    }

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Square square = (Square) obj;
        return x == square.x && y == square.y;
    }
    @Override
    public int compareTo(Square other) {
        return Integer.compare(this.distance, other.distance);
    }
    @Override
    public String toString() {
        return "Square{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
