import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegraCreateComponent } from './components/RegraImposto/regra-create/regra-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegraSearchComponent } from './components/RegraImposto/regra-search/regra-search.component';
import { LoginDoorComponent } from './components/Login/login-door/login-door.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProdutoCreateComponent } from './components/Produto/produto-create/produto-create.component';
import { ProdutoSearchComponent } from './components/Produto/produto-search/produto-search.component';
import { ProdutoRelacaoComponent } from './components/Produto/produto-relacao/produto-relacao.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegraCreateComponent,
    RegraSearchComponent,
    LoginDoorComponent,
    ProdutoCreateComponent,
    ProdutoSearchComponent,
    ProdutoRelacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideAnimationsAsync(),
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
