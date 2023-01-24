import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataMatrix, Move} from './DataMatrix';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchAlgService {
  private apiServerUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }

  public getDataBfs(): Observable<DataMatrix> {
    return this.http.get<DataMatrix>(`${this.apiServerUrl}/sr/dataBfs`);
  }
  public getDataDfs(): Observable<DataMatrix> {
    return this.http.get<DataMatrix>(`${this.apiServerUrl}/sr/dataDfs`);
  }
  public getDataDijkstra(): Observable<DataMatrix> {
    return this.http.get<DataMatrix>(`${this.apiServerUrl}/sr/dataDijkstra`);
  }
  public getDataAStar(): Observable<DataMatrix> {
    return this.http.get<DataMatrix>(`${this.apiServerUrl}/sr/dataAStar`);
  }


  public startBFS(move:Move): Observable<DataMatrix> {
    return this.http.post<DataMatrix>(`${this.apiServerUrl}/sr/bfs`,move);
  }
  public startDFS(move:Move): Observable<DataMatrix> {
    return this.http.post<DataMatrix>(`${this.apiServerUrl}/sr/dfs`,move);
  }
  public startDijkstra(move:Move): Observable<DataMatrix> {
    return this.http.post<DataMatrix>(`${this.apiServerUrl}/sr/dijkstra`,move);
  }
  public startAStar(move:Move): Observable<DataMatrix> {
    return this.http.post<DataMatrix>(`${this.apiServerUrl}/sr/AStar`,move);
  }

  public resetBfs(): Observable<DataMatrix> {
    return this.http.post<DataMatrix>(`${this.apiServerUrl}/sr/resetBfs`,0);
  }
  public resetDfs(): Observable<DataMatrix> {
    return this.http.post<DataMatrix>(`${this.apiServerUrl}/sr/resetDfs`,0);
  }
  public resetDjikstra(): Observable<DataMatrix> {
    return this.http.post<DataMatrix>(`${this.apiServerUrl}/sr/resetDijkstra`,0);
  }
  public resetAStar(): Observable<DataMatrix> {
    return this.http.post<DataMatrix>(`${this.apiServerUrl}/sr/resetAStar`,0);
  }
}
