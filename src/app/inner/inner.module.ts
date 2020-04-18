import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthGuard, NotAuthGuard, JwtInterceptor, ErrorInterceptor } from '../_helpers';
import { InnerRoutingModule } from './inner-routing.module';
import { InnerComponent } from './inner.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from '../_helpers/material.module';

@NgModule({
  declarations: [
    InnerComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    InnerRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
})
export class InnerModule { }
