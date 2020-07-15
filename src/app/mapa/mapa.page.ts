import { Component, OnInit } from "@angular/core";
import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
import * as L from "leaflet";
import { ConeccionService } from "../coneccion.service";

@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.page.html",
  styleUrls: ["./mapa.page.scss"],
})
export class MapaPage implements OnInit {
  map: Map;

  info: L.Control;
  geojson;
  provincia_selecionado;
  canton_selecionado;
  parroquia_selecionado;
  provincias;
  parroquias;
  cantones;
  buscar;
  indicador;
  legend;
  constructor(private cnx: ConeccionService) {}

  ngOnInit() {
    this.get();

    this.provincia_selecionado = null;
    this.canton_selecionado = null;
    this.parroquia_selecionado = null;

    this.cnx.getProvincia().subscribe(
      (res: any) => {
        this.provincias = res.provincia;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    // In setView add latLng and zoom
    this.map = new Map("mapId").setView([-1.261491, -78.622951], 10);
    tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "openstreetmap",
    }).addTo(this.map);

    /* marker([-1.261491, -78.622951])
      .addTo(this.map)
      .bindPopup("Ionic 4 <br> Leaflet.")
      .openPopup();
*/
    this.cargarMapa();
  }

  cargarMapa() {
    this.cnx.getgeojson().subscribe((data: any) => {
      this.geojson = L.geoJSON(data).addTo(this.map);
      this.initMapa(data);
    });
  }
  initMapa(data) {
    if (this.geojson != null) {
      this.geojson.remove();
    }
    if (this.legend != null) {
      this.legend.remove();
    }

    this.legend = L.control.scale({ position: "bottomright" });
    this.legend.onAdd = function (map) {
      let div = L.DomUtil.create("div", "info legend"),
        labels = [];
      var grades = [0, 1, 2, 3, 4];
      for (var i = 0; i < grades.length; i++) {
        var p = grades[i] + 1;
        var retorno =
          p > grades[7]
            ? "#800026"
            : p > grades[6]
            ? "#BD0026"
            : p > grades[5]
            ? "#E31A1C"
            : p > grades[4]
            ? "#FC4E2A"
            : p > grades[3]
            ? "#FD8D3C"
            : p > grades[2]
            ? "#FEB24C"
            : p > grades[1]
            ? "#FED976"
            : "#FFEDA0";
 
        div.innerHTML +=
          '<div><i style="background-color:'+retorno+'"></i> ' +
          grades[i] +
          (grades[i + 1] ? "–" + grades[i + 1] : "+") +
          "</div>";
      }
      return div;
    };

    this.legend.addTo(this.map);

    this.geojson = L.geoJSON(data, {
      style: this.style,
      onEachFeature: this.onEachFeature,
    }).addTo(this.map);

    this.map.fitBounds(this.geojson.getBounds());
  }
  ionViewWillLeave() {
    this.map.remove();
  }

  get() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
        }
      });
    }
  }
   
  style(feature) {
    return {
      fillColor: feature.properties.sp1 == 0 ? "#E0E0E0" : "#FD2500",
      weight: 2,
      opacity: 0.3,
      color: "black",
      fillOpacity: 0.7,
      label: "dmeo",
    };
  }

  highlightFeature(e) {
    let layer = e.target;
    layer.setStyle({
      weight: 3,
      color: "#FF8",
      opacity: 1,
      dashArray: "",
      fillOpacity: 1,
    });
    layer.bringToFront();
    // this.info.update(layer.feature.properties);
  }

  resetHighlight(e) {
    this.geojson.resetStyle(e.target);
    //info.update();
  }

  zoomToFeature(e) {
    this.map.fitBounds(e.target.getBounds());
  }

  onEachFeature(feature, layer) {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature,
    });
  }

  getcantones() {
    this.canton_selecionado = null;
    this.cnx.getCanton().subscribe((data: any) => {
      this.cantones = data.canton.filter(
        (item) => item.dpa_provin == this.provincia_selecionado
      );
      this.cantones.sort((a, b) => {
        return a.dpa_descan < b.dpa_descan
          ? -1
          : a.dpa_descan > b.dpa_descan
          ? 1
          : 0;
      });
    });
    this.validarBuscar();
  }
  getparroquias() {
    this.parroquia_selecionado = null;
    this.cnx.getParroquia().subscribe((data: any) => {
      this.parroquias = data.parroquia.filter(
        (item) => item.dpa_canton == this.canton_selecionado
      );

      this.parroquias.sort((a, b) => {
        return a.dpa_despar < b.dpa_despar
          ? -1
          : a.dpa_despar > b.dpa_despar
          ? 1
          : 0;
      });
    });
    this.validarBuscar();
  }

  changeParroquias() {
    this.validarBuscar();
  }

  validarBuscar() {
    this.buscar =
      this.provincia_selecionado !== null && this.canton_selecionado !== null;
  }
  buscarDatos() {
    this.cnx
      .getParroquiasGeoJson(this.canton_selecionado, 0)
      .subscribe((data: any) => {
        const datax = JSON.parse(data.preguntas_parroquias);
        this.initMapa(datax);
      });
  }
}
