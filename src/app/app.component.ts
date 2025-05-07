import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {

  title = 'E-Commerce';
  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'js/main.js'; // تأكد إن المسار فعلاً assets/js/main.js
    script.defer = true;
    document.body.appendChild(script);
  }

}
