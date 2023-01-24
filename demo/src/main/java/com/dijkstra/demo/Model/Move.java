package com.dijkstra.demo.Model;

public class Move {
    private Square source;
    private Square destination;
    private DataMatrix data;

    public Move() {
    }

    public Move(Square source, Square destination) {
        this.source = source;
        this.destination = destination;
    }

    public DataMatrix getData() {
        return data;
    }

    public void setData(DataMatrix data) {
        this.data = data;
    }

    public Square getSource() {
        return source;
    }

    public void setSource(Square source) {
        this.source = source;
    }

    public Square getDestination() {
        return destination;
    }

    public void setDestination(Square destination) {
        this.destination = destination;
    }
}
