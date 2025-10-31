import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnInit {
  isProductionMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Ouvrir automatiquement le menu Production si on est sur une route enfant
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        if (url.includes('/production') || url.includes('/projets') || url.includes('/applications') || url.includes('/planification')) {
          this.isProductionMenuOpen = true;
        }
      });

    // Vérifier la route actuelle au chargement
    const currentUrl = this.router.url;
    if (currentUrl.includes('/production') || currentUrl.includes('/projets') || currentUrl.includes('/applications') || currentUrl.includes('/planification')) {
      this.isProductionMenuOpen = true;
    }
  }

  toggleProductionMenu() {
    this.isProductionMenuOpen = !this.isProductionMenuOpen;
  }
}