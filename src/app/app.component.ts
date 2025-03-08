import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StyleguideComponent } from "./admin/styleguide/styleguide.component";

@Component({
  selector: 'app-root',
  imports: [StyleguideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'beexperience';
}
