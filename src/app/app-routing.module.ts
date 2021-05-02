import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ImageGalleryComponent} from './components/image-gallery/image-gallery.component';
import {ImageUploadComponent} from './components/image-upload/image-upload.component';

const routes: Routes = [
  { path: 'gallery', component: ImageGalleryComponent },
  { path: 'upload', component: ImageUploadComponent },
  { path: '',   redirectTo: '/gallery', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
