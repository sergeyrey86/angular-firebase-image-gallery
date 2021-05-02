import {Component, OnInit} from '@angular/core';
import {ImageService} from './services/image-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.imageService.initImageDetailList();
  }
}
