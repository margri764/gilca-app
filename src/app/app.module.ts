import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/pages/header/header/header.component';
import { FooterComponent } from './shared/pages/footer/footer/footer.component';
import { LoginComponent } from './shared/pages/login/login/login.component';
import { WrongActionMessageComponent } from './shared/messages/wrong-action-message/wrong-action-message/wrong-action-message.component';
import { GenericSuccessComponent } from './shared/messages/generic-success/generic-success/generic-success.component';
import { DashboardComponent } from './shared/pages/dashboard/dashboard/dashboard.component';
import { InterceptorService } from './shared/services/interceptor/interceptor.service';

// pipes
import { CapitalizeFirstLetterPipe } from './shared/pages/pipes/CapitalizeFirstLetter';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    WrongActionMessageComponent,
    GenericSuccessComponent,
    DashboardComponent,
    CapitalizeFirstLetterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
  
      },
    { provide: LOCALE_ID, useValue: 'es-AR' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
