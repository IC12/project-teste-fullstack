import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout-principal',
  templateUrl: './layout-principal.component.html',
  styleUrls: ['./layout-principal.component.scss'],
})
export class LayoutPrincipalComponent {
  title = 'Projeto FullStack IC';
  isHomePage = true;

  constructor(private titleService: Title, private router: Router) {
    this.titleService.setTitle(this.title);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.isHomePage = event.url === '/';
    });
  }

  goToComponent(component: string): void {
    this.router.navigate([`/${component}`]);
  }
}
