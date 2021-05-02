import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {ImageService} from '../../services/image-service.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnDestroy {
  form: FormGroup;
  imgSrc = '/assets/img/No_image_available.png';
  selectedImage: File = null;
  sub: Subscription = new Subscription();

  constructor(private storage: AngularFireStorage, private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
    });
  }

  showPreview(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(input?.files[0]);
      this.selectedImage = input?.files[0];
    } else {
      this.resetImageSources();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const filePath = `images/${Date.now()}_${this.selectedImage.name}`;
      const fileRef = this.storage.ref(filePath);
      this.sub.add(
        this.storage.upload(filePath, this.selectedImage).snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.form.value.imageUrl = url;
                this.imageService.uploadImageDetails(this.form.value);
                this.resetImageSources();
                this.resetForm();
              });
            })
          )
          .subscribe()
      );

    }
  }

  resetImageSources(): void {
    this.imgSrc = '/assets/img/No_image_available.png';
    this.selectedImage = null;
  }

  resetForm(): void {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setErrors(null);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
