import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdashbordComponent } from './userdashbord/userdashbord.component';
import { UserorderComponent } from './userorder/userorder.component';
import { UserproductComponent } from './userproduct/userproduct.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { UserwishlistComponent } from './userwishlist/userwishlist.component';
import { ManageComponent } from './manage/manage.component';
import { AddProductComponent } from './add-product/add-product.component';


const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    children: [
      { path: 'dashboard', component: UserdashbordComponent },
      { path: 'orders', component: UserorderComponent },
      { path: 'products', component: UserproductComponent },
      { path: 'settings', component: UsersettingsComponent },
      { path: 'wishlist', component: UserwishlistComponent },
      {path:'add',component:AddProductComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // redirect للصفحة الإفتراضية داخل manage
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
