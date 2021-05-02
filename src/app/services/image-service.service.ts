import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import {ImageInterface} from '../shared/image.interface';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList: AngularFireList<ImageInterface>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  initImageDetailList(): void {
    this.imageDetailList = this.angularFireDatabase.list('imageDetails');
  }

  uploadImageDetails(imageDetails: ImageInterface): void {
    this.imageDetailList.push(imageDetails);
  }
}
