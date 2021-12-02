import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss'],
})
export class HerramientasComponent implements OnInit {

 

  constructor(private tabla: MatTableModule,
    ) { }

  ngOnInit() {}
 

}
