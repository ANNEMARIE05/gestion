import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  animations: [
    trigger('slideInOut', [
      state('out', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      })),
      state('in', style({
        height: '*',
        opacity: 1
      })),
      transition('out => in', animate('300ms ease-in-out')),
      transition('in => out', animate('300ms ease-in-out'))
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  isProductionMenuOpen = false;
  isCollapsed = false;
  isMobileOpen = false;
  private subscriptions = new Subscription();
  private hoverExpanded = false; // Track if expanded by hover
  private wasCollapsedBeforeHover = false; // Track previous state

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
    
    // Reset hover state when manually toggling
    this.hoverExpanded = false;
    this.wasCollapsedBeforeHover = false;
    
    // Fermer le menu Production si on collapse la sidebar
    if (willBeCollapsed) {
      this.isProductionMenuOpen = false;
    }
  }

  closeMobileSidebar() {
    this.sidebarService.setMobileOpen(false);
  }

  onHoverEnter() {
    // Only expand on hover if the sidebar is collapsed and not already expanded by hover
    if (this.isCollapsed && !this.hoverExpanded) {
      this.wasCollapsedBeforeHover = true;
      this.hoverExpanded = true;
      this.sidebarService.setCollapsed(false);
    }
  }

  onHoverLeave() {
    // Only collapse on leave if it was expanded by hover
    if (this.hoverExpanded && this.wasCollapsedBeforeHover) {
      this.hoverExpanded = false;
      this.wasCollapsedBeforeHover = false;
      this.sidebarService.setCollapsed(true);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}