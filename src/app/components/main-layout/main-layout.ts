import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar';
import { HeaderComponent } from '../header/header';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isSidebarCollapsed = false;
  private subscriptions = new Subscription();

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.sidebarService.isCollapsed$.subscribe(collapsed => {
        this.isSidebarCollapsed = collapsed;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

