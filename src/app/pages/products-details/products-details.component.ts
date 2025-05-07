import { AfterViewInit, Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      $('.slick3').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        fade: true
      });
    }, 0);

    setTimeout(() => {
      $('.slick2').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ]
      });
    }, 0);
  }

}
