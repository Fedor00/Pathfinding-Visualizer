import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { DataMatrix ,Move,Square} from './DataMatrix';
import { SearchAlgService } from './search-alg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(){
    
  }
 
  ngOnInit(): void {

    
  }

}
