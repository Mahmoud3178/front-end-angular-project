import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('.slick1').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        fade: true
      });
    }, 0);
  }
}
