package com.dijkstra.demo.Controller;

import com.dijkstra.demo.Model.*;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashSet;


@RestController
@RequestMapping("sr")
@CrossOrigin
public class Controller {
    @Autowired
    private final SimpMessagingTemplate template;
    private  static final int WIDTH=20;
    private  static final int HEIGHT=40;

    private DataMatrix dataBfs=new DataMatrix(WIDTH,HEIGHT);
    private DataMatrix dataDfs=new DataMatrix(WIDTH,HEIGHT);
    private DataMatrix dataDijkstra=new DataMatrix(WIDTH,HEIGHT);
    private DataMatrix dataAStar=new DataMatrix(WIDTH,HEIGHT);

    public Controller(SimpMessagingTemplate template) {
        this.template = template;
    }

    @GetMapping("/dataBfs")
    public ResponseEntity<DataMatrix> setWallBfs () {
        return new ResponseEntity<>(dataBfs, HttpStatus.OK);
    }
    @PostMapping("/resetBfs")
    public ResponseEntity<DataMatrix> resetBfs () {
        this.dataBfs=new DataMatrix(WIDTH,HEIGHT);
        return new ResponseEntity<>(this.dataBfs, HttpStatus.OK);
    }
    @PostMapping("/bfs")
    public ResponseEntity<DataMatrix> startBfs (@RequestBody Move move) {
        SearchAlg searchAlg =new SearchAlg(template);
        this.dataBfs=move.getData();
        searchAlg.doBFS(dataBfs,move);
        return new ResponseEntity<>(this.dataBfs, HttpStatus.OK);
    }

    @GetMapping("/dataDfs")
    public ResponseEntity<DataMatrix> setWallDfs () {
        return new ResponseEntity<>(dataDfs, HttpStatus.OK);
    }
    @PostMapping("/resetDfs")
    public ResponseEntity<DataMatrix> reset (@RequestBody int g) {
        this.dataDfs=new DataMatrix(WIDTH,HEIGHT);
        return new ResponseEntity<>(this.dataDfs, HttpStatus.OK);
    }
    @PostMapping("/dfs")
    public ResponseEntity<DataMatrix> startDfs (@RequestBody Move move) {
        SearchAlg searchAlg =new SearchAlg(template);
        this.dataDfs=move.getData();
        searchAlg.doDFS(dataDfs,move);
        System.out.println("yes");
        return new ResponseEntity<>(this.dataDfs, HttpStatus.OK);
    }

    @GetMapping("/dataDijkstra")
    public ResponseEntity<DataMatrix> setWallDijkstra () {

        if(dataDijkstra==null){
            System.out.println("it is null");
        }
        return new ResponseEntity<>(dataDijkstra, HttpStatus.OK);
    }

    @PostMapping("/resetDijkstra")
    public ResponseEntity<DataMatrix> resetDijkstra (@RequestBody int g) {
        this.dataDijkstra=new DataMatrix(WIDTH,HEIGHT);
        return new ResponseEntity<>(this.dataDijkstra, HttpStatus.OK);
    }
    @PostMapping("/dijkstra")
    public ResponseEntity<DataMatrix> startDijkstra (@RequestBody Move move) {
        SearchAlg searchAlg =new SearchAlg(template);
        this.dataDijkstra=move.getData();
        searchAlg.doDijkstra(dataDijkstra,move);
        return new ResponseEntity<>(dataDijkstra, HttpStatus.OK);
    }
    @GetMapping("/dataAStar")
    public ResponseEntity<DataMatrix> getDataAStar () {

        if(dataAStar==null){
            System.out.println("it is null");
        }
        return new ResponseEntity<>(dataAStar, HttpStatus.OK);
    }

    @PostMapping("/resetAStar")
    public ResponseEntity<DataMatrix> resetAStar (@RequestBody int g) {
        this.dataAStar=new DataMatrix(WIDTH,HEIGHT);
        return new ResponseEntity<>(this.dataAStar, HttpStatus.OK);
    }
    @PostMapping("/AStar")
    public ResponseEntity<DataMatrix> startAStar (@RequestBody Move move) {
        SearchAlg searchAlg =new SearchAlg(template);
        this.dataAStar=move.getData();

        searchAlg.doAStar(dataAStar,move);
        return new ResponseEntity<>(dataAStar, HttpStatus.OK);
    }






}
