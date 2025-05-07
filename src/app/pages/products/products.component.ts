import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  private isotope: any;
  private routerSubscription: any;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initIsotope();

    // في حال تم الرجوع لنفس الصفحة عبر RouterLink
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/products') {
        this.initIsotope();
      }
    });
  }

  initIsotope() {
    const $grid = $('.isotope-grid');

    if (!$grid.length) return;

    $grid.imagesLoaded(() => {
      this.isotope = $grid.isotope({
        itemSelector: '.isotope-item',
        layoutMode: 'fitRows',
        percentPosition: true,
        masonry: {
          columnWidth: '.isotope-item'
        }
      });

      $('.filter-tope-group').off('click').on('click', 'button', (event: any) => {
        const button = $(event.currentTarget);
        const filterValue = button.attr('data-filter');
        this.isotope.isotope({ filter: filterValue });
        $('.filter-tope-group button').removeClass('how-active1');
        button.addClass('how-active1');
      });
    });
  }

  ngOnDestroy(): void {
    $('.filter-tope-group').off('click');
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
