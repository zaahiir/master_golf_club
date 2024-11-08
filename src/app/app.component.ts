import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingBarModule} from "@ngx-loading-bar/core"; 
import { HeaderComponent } from "./layout/header/header.component";
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingBarModule, HeaderComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'master-golf';
}
