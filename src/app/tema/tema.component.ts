import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.route.navigate(['/entrar'])
    }
  }

}
