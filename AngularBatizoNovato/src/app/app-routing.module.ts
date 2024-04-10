import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDoorComponent } from './components/Login/login-door/login-door.component';
import { RegraCreateComponent } from './components/RegraImposto/regra-create/regra-create.component';
import { RegraSearchComponent } from './components/RegraImposto/regra-search/regra-search.component';
import { ProdutoCreateComponent } from './components/Produto/produto-create/produto-create.component';
import { ProdutoSearchComponent } from './components/Produto/produto-search/produto-search.component';
import { ProdutoRelacaoComponent } from './components/Produto/produto-relacao/produto-relacao.component';
import { HomeComponent } from './components/home/home.component';
import { loginGuard } from './services/Guard/login.guard';

const routes: Routes = [
  { 
    path: '', redirectTo:'login', pathMatch:'full'
  },
  { 
    path: 'login', component: LoginDoorComponent,
  },
  {
    path: '', component: HomeComponent,
    children:[
      { path: 'regraimposto', component: RegraCreateComponent, canActivate: [loginGuard] },
      { path: 'regrasearch', component: RegraSearchComponent, canActivate: [loginGuard] },
      { path: 'produto', component: ProdutoCreateComponent, canActivate: [loginGuard] },
      { path: 'produtosearch', component: ProdutoSearchComponent, canActivate: [loginGuard] },
      { path: 'produtorelacao', component: ProdutoRelacaoComponent, canActivate: [loginGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
