import {Component, OnInit} from '@angular/core';
import {ImageService} from './services/image-service.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private imageService: ImageService,
    public authService: AuthService
  ) {}

  async logOut(): Promise<void> {
    await this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.logged();
    this.imageService.initImageDetailList();
  }
}
