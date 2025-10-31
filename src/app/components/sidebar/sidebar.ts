import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isProductionMenuOpen = false;
  isCollapsed = false;
  isMobileOpen = false;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    // Synchroniser avec le service pour desktop
    this.subscriptions.add(
      this.sidebarService.isCollapsed$.subscribe(collapsed => {
        this.isCollapsed = collapsed;
      })
    );

    // Synchroniser avec le service pour mobile
    this.subscriptions.add(
      this.sidebarService.isMobileOpen$.subscribe(open => {
        this.isMobileOpen = open;
      })
    );

    // Ouvrir automatiquement le menu Production si on est sur une route enfant
    this.subscriptions.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const url = event.urlAfterRedirects;
          if (url.includes('/production') || url.includes('/projets') || url.includes('/applications') || url.includes('/planification')) {
            this.isProductionMenuOpen = true;
          }
          
          // Fermer la sidebar mobile lors de la navigation
          this.closeMobileSidebar();
        })
    );

    // Vérifier la route actuelle au chargement
    const currentUrl = this.router.url;
    if (currentUrl.includes('/production') || currentUrl.includes('/projets') || currentUrl.includes('/applications') || currentUrl.includes('/planification')) {
      this.isProductionMenuOpen = true;
    }
  }

  toggleProductionMenu() {
    this.isProductionMenuOpen = !this.isProductionMenuOpen;
  }

  toggleSidebar() {
    const willBeCollapsed = !this.sidebarService.getIsCollapsed();
    this.sidebarService.toggle();
    // Fermer le menu Production si on collapse la sidebar
    if (willBeCollapsed) {
      this.isProductionMenuOpen = false;
    }
  }

  closeMobileSidebar() {
    this.sidebarService.setMobileOpen(false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}