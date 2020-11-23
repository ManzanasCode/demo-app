import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../services/acceso.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales = { usuario: "", pwd: "" }

  constructor(
    private accesoService: AccesoService,
    private router: Router
  ) { }

  ngOnInit() {

    //this.acceso()
  }

  async acceso() {
    console.log("credenciales : ", this.credenciales)

    this.accesoService.getUsuarios().subscribe(
      data => {
        console.log("data: ", data)
        data.forEach((valor, indice, array)=>{
          if(this.credenciales.usuario == valor.USUARIO && this.credenciales.pwd == valor.PWD){
            console.log("FOUNDED: ", data)
            this.router.navigate(['/home'])
          }
          
        })
      })
  }


}
