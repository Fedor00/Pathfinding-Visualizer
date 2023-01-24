package com.dijkstra.demo.Model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class SearchAlg {

    private final  SimpMessagingTemplate template;
    public Set<Square> visited;
    public List<Square> solution;
    @Autowired
    public SearchAlg(SimpMessagingTemplate template) {
        this.template = template;
    }

    private void backtrack(DataMatrix data, Square destination) {
        List<Square> path = new ArrayList<>();
        Square current = destination;
        while (current != null) {
            path.add(current);
            current = current.getPrev();
        }
        data.setSolution(path.toArray(new Square[path.size()]));
    }
    public void doDFS(DataMatrix data, Move move) {
        // Initialize visited set
        LinkedHashSet<Square> visited = new LinkedHashSet<>();

        // Create a stack and add the source square
        Stack<Square> stack = new Stack<>();
        stack.push(move.getSource());
        visited.add(move.getSource());
        boolean solutionFound = false;

        while (!stack.isEmpty()) {
            Square current = stack.pop();

            // Check if the current square is the destination square
            // Get the valid neighboring squares
            List<Square> neighbors = getValidNeighbors(data, current);
            Collections.shuffle(neighbors);
            for (Square neighbor : neighbors) {
                if (!visited.contains(neighbor)) {
                    stack.push(neighbor);
                    visited.add(neighbor);

                    neighbor.setPrev(current);
                    if (neighbor.equals(move.getDestination())) {
                        backtrack(data, current);
                        visited.removeIf(square -> square.equals(move.getDestination()));
                        visited.removeIf(square -> square.equals(move.getSource()));
                        data.setVisited(visited.toArray(new Square[visited.size()]));
                        return;
                    }
                }
            }
        }
            System.out.println("No solution was found");

    }



    public void doBFS(DataMatrix data, Move move) {
        // Initialize visited set
        LinkedHashSet<Square> visited = new LinkedHashSet<>();

        // Create a queue and add the source square
        Queue<Square> queue = new LinkedList<>();
        queue.add(move.getSource());
        visited.add(move.getSource());

        while (!queue.isEmpty()) {
            Square current = queue.poll();
            // Check if the current square is the destination square
            if (current.equals(move.getDestination())) {
                backtrack(data, current);

                break;
            }

            // Get the valid neighboring squares
            List<Square> neighbors = getValidNeighbors(data, current);
            for (Square neighbor : neighbors) {
                if (!visited.contains(neighbor)) {
                    queue.add(neighbor);
                    visited.add(neighbor);
                    neighbor.setPrev(current);
                }
            }
        }
        visited.removeIf(square -> square.equals(move.getDestination()));
        visited.removeIf(square -> square.equals(move.getSource()));
        data.setVisited(visited.toArray(new Square[visited.size()]));
    }
    // Backtrack from the destination to the source to construct the solution path
    private List<Square> getValidNeighbors(DataMatrix data, Square current) {
        List<Square> neighbors = new ArrayList<>();
        int[] row = {-1, 0, 1, 0};
        int[] col = {0, 1, 0, -1};

        for (int i = 0; i < 4; i++) {
            int x = current.getX() + row[i];
            int y = current.getY() + col[i];

            if (isValid(data, x, y)) {
                neighbors.add(data.getSquare(x, y));
            }
        }
        return neighbors;
    }
    public void doDijkstra(DataMatrix data, Move move) {
        // Initialize visited set
        LinkedHashSet<Square> visited = new LinkedHashSet<>();

        // Create a priority queue and add the source square
        PriorityQueue<Square> queue = new PriorityQueue<>();
        move.getSource().setDistance(calculateDistance(move.getSource(), move.getDestination()));
        helperStarDjk(data, move, visited, queue);
    }
    public boolean doAStar(DataMatrix data, Move move) {
        if(move.getSource().getX()==-1  || move.getDestination().getX()==-1)
            return false;
        LinkedHashSet<Square> visited = new LinkedHashSet<>();
        // Create a priority queue and add the source square
        PriorityQueue<Square> queue = new PriorityQueue<>((square1, square2) -> {
            int square1Score = square1.getDistance() + calculateDistance(square1, move.getDestination());
            int square2Score = square2.getDistance() + calculateDistance(square2, move.getDestination());
            return square1Score - square2Score;
        });
        move.getSource().setDistance(0);
        helperStarDjk(data, move, visited, queue);
        return true;
    }

    private void helperStarDjk(DataMatrix data, Move move, LinkedHashSet<Square> visited, PriorityQueue<Square> queue) {
        queue.add(move.getSource());

        while (!queue.isEmpty()) {
            Square current = queue.poll();
            if(!current.equals(move.getSource()) && !current.equals(move.getDestination()))
                visited.add(current);
            // Check if the current square is the destination square
            if (current.equals(move.getDestination())) {
                backtrack(data, current);
                break;
            }

            // Get the valid neighboring squares
            List<Square> neighbors = getValidNeighbors(data, current);
            for (Square neighbor : neighbors) {
                if (!visited.contains(neighbor)) {
                    int newDistance = current.getDistance() + calculateDistance(current, neighbor);
                    if (neighbor.getDistance() == Integer.MAX_VALUE || newDistance < neighbor.getDistance()){
                        neighbor.setDistance(newDistance);
                        neighbor.setPrev(current);
                        queue.add(neighbor);
                    }
                }
            }

        }
        visited.removeIf(square -> square.equals(move.getDestination()));
        visited.removeIf(square -> square.equals(move.getSource()));
        data.setVisited(visited.toArray(new Square[visited.size()]));
    }

// Initialize visited set

    private int calculateDistance(Square source, Square destination) {
        int xDistance = Math.abs(source.getX() - destination.getX());
        int yDistance = Math.abs(source.getY() - destination.getY());
        return (int) Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
    }


    private boolean isValid(DataMatrix data, int x, int y) {
        if (x < 0 || x >= data.getWidth() || y < 0 || y >= data.getHeight()) {
            return false;
        }
        return !data.getSquare(x, y).isWall();
    }
    public Set<Square> getVisited() {
        return visited;
    }

    public void setVisited(HashSet<Square> visited) {
        this.visited = visited;
    }

    public List<Square> getSolution() {
        return solution;
    }

    public void setSolution(List<Square> solution) {
        this.solution = solution;
    }
}
