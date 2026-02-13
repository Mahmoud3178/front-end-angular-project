import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRoutingModule } from './manage-routing.module';

// استيراد كل الكمبوننتات standalone هنا
import { ManageComponent } from './manage/manage.component';
import { UserdashbordComponent } from './userdashbord/userdashbord.component';
import { UserproductComponent } from './userproduct/userproduct.component';
import { UserwishlistComponent } from './userwishlist/userwishlist.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { UserorderComponent } from './userorder/userorder.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [],  // لا تعلن اي كمبوننت لانهم standalone
  imports: [
    CommonModule,
    ManageRoutingModule,
    ManageComponent,
    UserdashbordComponent,
    UserproductComponent,
    UserwishlistComponent,
    UsersettingsComponent,
    UserorderComponent,
    AddProductComponent,
  ],
})
export class ManageModule {}
