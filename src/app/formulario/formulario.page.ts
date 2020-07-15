import { Component, OnInit } from "@angular/core";
import { ConeccionService } from "../coneccion.service";
import {
  Platform,
  LoadingController,
  AlertController,
  ModalController
} from "@ionic/angular";
import { Router } from "@angular/router";
import { MasinfoPage } from '../masinfo/masinfo.page';

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.page.html",
  styleUrls: ["./formulario.page.scss"]
})
export class FormularioPage implements OnInit {
  provincias;
  cantones;
  parroquias;
  provincia_selecionado;
  canton_selecionado;
  parroquia_selecionado;
  txtCedula;
  lat;
  lon;

  sp1 = false;
  sp2 = false;
  sp3 = false;
  vp1 = false;
  vp2 = false;
  vp3 = false;
  vp4 = false;
  vp5 = false;
  vp6 = false;
  vp7 = false;
  ot1 = false;
  ot2 = false;
  guardar = false;
  facultad;
  carrera;
  dispositivo;
  txtLugartrabajo;

  constructor(
    public alertController: AlertController,
    private cnx: ConeccionService,
    private platform: Platform,
    private route: Router,
    public loadingController: LoadingController,
    public modalController: ModalController
  ) {
    this.get();
  }

  ngOnInit() {
    this.txtCedula = null;
    this.provincia_selecionado = null;
    this.canton_selecionado = null;
    this.parroquia_selecionado = null;

    this.cnx.getProvincia().subscribe(
      (res: any) => {
        this.provincias = res.provincia;

        this.provincia_selecionado ='18';
        this.getcantones();
      },
      error => {
        console.log(error);
      }
    );

   
  }
  ingresar() {}

  getcantones() {
    this.canton_selecionado = null;
    this.cnx.getCanton().subscribe((data: any) => {
      this.cantones = data.canton.filter(
        item => item.dpa_provin == this.provincia_selecionado
      );
      this.cantones.sort((a, b) => {
        return a.dpa_descan < b.dpa_descan
          ? -1
          : a.dpa_descan > b.dpa_descan
          ? 1
          : 0;
      });
    });
    this.validarGuardar();
  }
  getparroquias() {
    this.parroquia_selecionado = null;
    this.cnx.getParroquia().subscribe((data: any) => {
      this.parroquias = data.parroquia.filter(
        item => item.dpa_canton == this.canton_selecionado
      );

      this.parroquias.sort((a, b) => {
        return a.dpa_despar < b.dpa_despar
          ? -1
          : a.dpa_despar > b.dpa_despar
          ? 1
          : 0;
      });
    });
    this.validarGuardar();
  }

  changeParroquias() {
    this.validarGuardar();
  }

  validarGuardar() {
    this.guardar =
      this.provincia_selecionado !== null &&
      this.canton_selecionado !== null &&
      this.parroquia_selecionado !== null    &&
      this.facultad !== null &&
      this.carrera !== null;
  }
  public async guardarDatos() {
    const loading = await this.loadingController.create({
      message: "Guardando..."
    });
    await loading.present();

    let vsp1;
    let vsp2;
    let vsp3;
    let vvp1;
    let vvp2;
    let vvp3;
    let vvp4;
    let vvp5;
    let vvp6;
    let vvp7;

    let vot1;
    let vot2;
    vsp1 = this.sp1 ? 1 : 0;
    vsp2 = this.sp2 ? 1 : 0;
    vsp3 = this.sp3 ? 1 : 0;

    vvp1 = this.vp1 ? 1 : 0;
    vvp2 = this.vp2 ? 1 : 0;
    vvp3 = this.vp3 ? 1 : 0;
    vvp4 = this.vp4 ? 1 : 0;

    vvp5 = this.vp5 ? 1 : 0;
    vvp6 = this.vp6 ? 1 : 0;
    vvp7 = this.vp7 ? 1 : 0;

    vot1 = this.ot1 ? 1 : 0;
    vot2 = this.ot2 ? 1 : 0;

    if (this.platform.is("android")) {
      this.dispositivo = "PC";
    } else if (this.platform.is("ios")) {
      this.dispositivo = "IOS";
    } else {
      this.dispositivo = "android";
    }

    this.cnx
      .guardar(
        vsp1,
        vsp2,
        vsp3,
        vvp1,
        vvp2,
        vvp3,
        vvp4,
        vvp5,
        vvp6,
        vvp7,
        this.provincia_selecionado,
        this.canton_selecionado,
        this.parroquia_selecionado,
        this.dispositivo,
        this.txtCedula,
        this.lat,
        this.lon,
        vot1,vot2,this.facultad,this.carrera,this.txtCedula,this.txtLugartrabajo
      )
      .subscribe(
        async res => {
          await loading.dismiss();
          this.alerta1(
          );
          this.telemedicina();
          this.route.navigate(["/home"]);
        },
        async err => {
          this.limpiar();
          await loading.dismiss();         
          console.log(err);
        }
      );
  }
  limpiar() {
    // this.guardar = false;
    this.txtCedula = null;
    this.sp1 = false;
    this.sp2 = false;
    this.sp3 = false;
    this.vp1 = false;
    this.vp2 = false;
    this.vp3 = false;
    this.vp4 = false;
    this.vp5 = false;
    this.vp6 = false;
    this.vp7 = false;
  }

  async alerta1( ) {
    const alert = await this.alertController.create({
      header: "Gracias.",
      message: "<strong>    Información enviada correctamente  </strong>",
      buttons: ["Aceptar"]
    });
    await alert.present();
  }

  get() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
        }
      });
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MasinfoPage
    });
     await modal.present();
  }
reporte(){
  window.open('http://covid.uta.edu.ec/export.php');
}

telemedicina(){ 

if ( this.sp1 ||  this.sp1 || this.sp3 || this.vp1 || this.vp2 || this.vp3 || this.vp4   || this.vp6 || this.vp7  )   
  window.open('https://cedia.zoom.us/my/covid19uta');
}
}
