import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

Titulo = "Pymes Demo - 2021";
  constructor() { }

  ngOnInit() {
  }

}