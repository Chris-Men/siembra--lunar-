import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// Interfaz que define la estructura de los datos de una Hortaliza
interface HortalizaData {
  descripcion: string;
  // Agrega aquí cualquier otra propiedad que pueda tener el objeto
}

@Component({
  selector: 'app-hortalizas',
  templateUrl: 'hortalizas.page.html',
  styleUrls: ['hortalizas.page.scss'],
})
export class HortalizasPage {
  imageUrls: string[] = [];// Arreglo para almacenar las URL de las imágenes de las hortalizas
  imageData: { [key: string]: string } = {};

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  ngOnInit() {
    this.getImageFromStorage();// Método para obtener las imágenes de los frutos desde el almacenamiento
  }
// Método para obtener las imágenes de los frutos desde el almacenamiento de Firebase Storage
  getImageFromStorage() {
    const storageRef = this.storage.ref('hortalizas');
    storageRef.listAll().subscribe(result => {
      result.items.forEach(item => {
        item.getDownloadURL().then(url => {
          this.imageUrls.push(url);
          this.firestore.collection('desc.hortalizas').doc(item.name).get().subscribe((doc: any) => {
            if (doc.exists && doc.data()) {
              const hortalizaData = doc.data() as HortalizaData;
              if (hortalizaData.descripcion) {
                this.imageData[url] = hortalizaData.descripcion;
              } else {
                console.log(`No se encontró la descripción para ${item.name}`);
              }
            } else {
              console.log(`No se encontró el documento para ${item.name}`);
            }
          });
        });
      });
    });
  }
}
