import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConeccionService {

  //public   URL = 'https://datos.ingenio-ti.com/';
 
 // public   URL = 'http://localhost/cerco/';
    public   URL = 'http://covid.uta.edu.ec/';
  constructor(public http: HttpClient) {
  }
 
  public getProvincia( ) { 
    return this.http.get('assets/dpa/provincias.json');
  }
  public getCanton( ) { 
    return this.http.get('assets/dpa/canton.json');
  }
  public getParroquia(   ) { 
    return this.http.get('assets/dpa/parroquia.json');
  }

  public getgeojson( ) { 
    return this.http.get('assets/dpa/puntos.geojson');
  }

  public guardar(sp1,sp2,sp3,vp1,vp2,vp3,vp4,vp5,vp6,vp7,provincia,canton,parroquia,dispositivo,ci,lat,lon,
    ot1,ot2,facultad,carrera,txtcedula,lugartrabajo 
    ){
    const urlServer = this.URL + 'registro.php?op=insert';
    let body = new HttpParams();
    //body = body.set('op', 'login');
    body = body.set('sp1', sp1);
    body = body.set('sp2', sp2);
    body = body.set('sp3', sp3);
    body = body.set('vp1', vp1);
    body = body.set('vp2', vp2);
    body = body.set('vp3', vp3);
    body = body.set('vp4', vp4);
    body = body.set('vp5', vp5);
    body = body.set('vp6', vp6);
    body = body.set('vp7', vp7);
    body = body.set('vp7', vp7);
    body = body.set('ot1', ot1);
    body = body.set('ot2', ot2);
    body = body.set('facultad', facultad);
    body = body.set('carrera', carrera);
    body = body.set('carrera', carrera);
    body = body.set('provincia', provincia);
    body = body.set('canton', canton);
    body = body.set('parroquia', parroquia);
    body = body.set('dispositivo', dispositivo);

    body = body.set('ci', ci);
    body = body.set('lon', lon);
    body = body.set('lat', lat);
    body = body.set('txtcedula', txtcedula);
    body = body.set('lugartrabajo', lugartrabajo);
    
    return this.http.post(urlServer, body, { responseType: 'json' });

  }

  public getParroquiasGeoJson(indicador,siono){
    const urlServer = this.URL + 'registro.php?op=select-parroquias';
    let body = new HttpParams();
    body = body.set('indicador', indicador);
    body = body.set('siono', siono);
    return this.http.post(urlServer, body, { responseType: 'json' });

  }

  public getPuntos( ){
    const urlServer = this.URL + 'registro.php?op=select-puntos';
    let body = new HttpParams();
    //body = body.set('indicador', indicador);
    //body = body.set('siono', siono);
    return this.http.post(urlServer, body, { responseType: 'json' });

  }


}
