import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

// Interfaz que define la estructura de los datos de un fruto
interface FrutoData {
  descripcion: string;
  // Agrega aquí cualquier otra propiedad que pueda tener el objeto
}

@Component({
  selector: 'app-frutos',
  templateUrl: 'frutos.page.html',
  styleUrls: ['frutos.page.scss'],
})
export class FrutosPage {
  imageUrls: string[] = [];// Arreglo para almacenar las URL de las imágenes de los frutos
  imageData: { [key: string]: string } = {};// Objeto para almacenar la descripción de cada fruto, indexado por la URL de la imagen

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getImageFromStorage();// Método para obtener las imágenes de los frutos desde el almacenamiento
  }
// Método para obtener las imágenes de los frutos desde el almacenamiento de Firebase Storage
  getImageFromStorage() {
    const storageRef = this.storage.ref('frutos');
    storageRef.listAll().subscribe(result => {
      result.items.forEach(item => {
        item.getDownloadURL().then(url => {
          this.imageUrls.push(url);
          this.firestore.collection('desc.frutos').doc(item.name).get().subscribe((doc: any) => {
            if (doc.exists && doc.data()) {
              const frutoData = doc.data() as FrutoData;
              if (frutoData.descripcion) {
                this.imageData[url] = frutoData.descripcion;
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

// import { Component } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireStorage } from '@angular/fire/compat/storage';

// @Component({
//   selector: 'app-frutos',
//   templateUrl: 'frutos.page.html',
//   styleUrls: ['frutos.page.scss'],
// })
// export class FrutosPage {

//   imageUrl: string;
//   imageUrls: string[] = [];
//   textData: any[] = [];

//   constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

//   ngOnInit() {
//     this.getImageFromStorage();
//     this.getTextFromDatabase();
//   }

//   getImageFromStorage() {
//     const storageRef = this.storage.ref('frutos');
//     storageRef.listAll().subscribe(result => {
//       result.items.forEach(item => {
//         item.getDownloadURL().then(url => {
//           this.imageUrls.push(url);
//         });
//       });
//     });
//   }

//   getTextFromDatabase() {
//     this.firestore.collection('desc.frutos').valueChanges().subscribe(data => {
//       this.textData = data;
//     });
//   }
// }

