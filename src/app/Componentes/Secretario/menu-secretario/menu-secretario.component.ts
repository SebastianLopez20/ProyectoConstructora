import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-secretario',
  templateUrl: './menu-secretario.component.html',
  styleUrls: ['./menu-secretario.component.scss'],
})
export class MenuSecretarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const hoy = new Date();
    const idhoy = hoy.getFullYear() + '-' + hoy.getMonth() + '-' + hoy.getDate()


  }

}
