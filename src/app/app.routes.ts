import { Routes } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [

  {
    path:'',
    component:HeroComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'product',
    component:ProductsComponent
  },
  {
    path:'product-details',
    component:ProductsDetailsComponent
  },
  {
    path:'cart',
    component:CartComponent
  },


  {
    path:'contact',
    component:ContactComponent
  },


  {
    path:'**',
    redirectTo:"",
    pathMatch:'full'
  },

  {
    path:'',
    redirectTo:"/home",
    pathMatch:'full'
  },

];
