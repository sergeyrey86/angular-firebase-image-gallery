import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from '../../services/image-service.service';
import {SnapshotAction} from '@angular/fire/database';
import {ImageInterface} from '../../shared/image.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  imageList: ImageInterface[] = [];
  sub = new Subscription();
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.sub.add(
      this.imageService.imageDetailList.snapshotChanges()
        .subscribe((list: (SnapshotAction<ImageInterface>)[]) => {
          this.imageList = list.map(
            (snapshotAction: SnapshotAction<ImageInterface>) => ({
              key: snapshotAction.payload.key,
              ...snapshotAction.payload.val()
            })
          );
        })
    );
  }

  onRemove(image: ImageInterface): void {
    this.imageService.deleteFileDatabase(image.key).then(
      () => {
        this.imageService.deleteFileStorage(image.name);
      }
    ).catch(
      (error) => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
