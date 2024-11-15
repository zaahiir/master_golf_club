import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingBarModule} from "@ngx-loading-bar/core"; 
import { HeaderComponent } from "./layout/header/header.component";
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingBarModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'master-golf';
  constructor(private scrollService: ScrollService) {}  // Inject the ScrollService

  ngOnInit(): void {
    // Now, the ScrollService is responsible for scrolling to the top on route changes
  }
}
