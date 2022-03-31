import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private route : Router
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.route.navigate(['/entrar'])
    }
  }

}
