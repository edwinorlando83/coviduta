import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConeccionService } from '../coneccion.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: Router, cnx: ConeccionService,private alertController:AlertController) {}

  formulario(){
    if(     sessionStorage.getItem("login" ) === null)
      this.administrar();
    else
    this.route.navigate(['/formulario']);
  }

  async administrar(){
    const alerta = await this.alertController.create({
      header: 'Ingrese el Password!',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Ok',
          handler: (txt) => {
             if( txt.password ==='utaj01'){
               sessionStorage.setItem("login","1");
               this.route.navigate(['/formulario']);
             }
          }
        }
      ]
    });

    await alerta.present();

  }

}
//Clave12345!