import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import {ImageInterface} from '../shared/image.interface';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList: AngularFireList<ImageInterface>;
  basePath = 'images';

  constructor(private angularFireDatabase: AngularFireDatabase, private storage: AngularFireStorage) {
  }

  initImageDetailList(): void {
    this.imageDetailList = this.angularFireDatabase.list(this.basePath);
  }

  deleteFileDatabase(key: string): Promise<void> {
    return this.angularFireDatabase.list(this.basePath).remove(key);
  }

  deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  uploadImageDetails(imageDetails: ImageInterface): void {
    this.imageDetailList.push(imageDetails);
  }
}
