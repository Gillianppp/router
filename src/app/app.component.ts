import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="menu">    
      <a routerLink="/all-surveys"  routerLinkActive="active">DASHBOARD</a>
      <a routerLink="/survey-center" routerLinkActive="active">RISC</a>
      <a style="  float:right;" class="btn btn-primary btn-risc" routerLink="/add">ADD RISC</a>
    </nav>
    <div class="main-body">
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>

    
    </div>
  `
})
export class AppComponent {
}
