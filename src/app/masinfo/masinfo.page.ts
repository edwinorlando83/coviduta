import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-masinfo',
  templateUrl: './masinfo.page.html',
  styleUrls: ['./masinfo.page.scss'],
})
export class MasinfoPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  Cerrar() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
