import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './componentes/category/category.component';
import { DeviceComponent } from './componentes/device/device.component';


const routes: Routes = [
  {path: 'categories', component: CategoryComponent},
  {path: 'devices', component: DeviceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
