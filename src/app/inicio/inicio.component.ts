import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string

  usuario: Usuario = new Usuario()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private route : Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService,
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.route.navigate(['/entrar'])
    }

    this.authService.refreshToken();
    this.getAllTemas();
    this.getAllpostagens();

    this.getAllTemas()
    this.getAllpostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=> {
      this.tema = resp
    })
  }

  getAllpostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=> {
    this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario)=> {
      this.usuario = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUser
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=> {
      this.postagem = resp
      this.alertas.showAlerSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllpostagens()
    })

  }

  findByTituloPostagem(){

    if(this.tituloPost == ''){
      this.getAllpostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=> {
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema(){
      if(this.nomeTema == ''){
        this.getAllTemas()
      } else {
        this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=> {
          this.listaTemas = resp
        })
      }
  }
}
