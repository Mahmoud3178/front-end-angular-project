import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HeroComponent } from './pages/hero/hero.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ManageuserComponent } from './pages/manageuser/manageuser.component';
import { ProductDetailsComponent } from './pages/products-details/products-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent,  // الصفحة الرئيسية
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'product',
    component: ProductsComponent,
  },
  {
     path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
      canActivate: [AuthGuard]

  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path:'checkout',
    component:CheckoutComponent,
      canActivate: [AuthGuard]

  },
  {path:'account',
    component:ManageuserComponent
  },

  {
    path: 'manage',  // هنا الراوت اللي بيشغل الموديول كامل (lazy load)
    loadChildren: () => import('./pages/manage/manage.module').then(m => m.ManageModule),
  },

  // راوت لجميع المسارات الغير معرفة => يرجع للصفحة الرئيسية
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
