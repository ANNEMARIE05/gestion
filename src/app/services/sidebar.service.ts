import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isCollapsedSubject = new BehaviorSubject<boolean>(false);
  public isCollapsed$ = this.isCollapsedSubject.asObservable();

  private isMobileOpenSubject = new BehaviorSubject<boolean>(false);
  public isMobileOpen$ = this.isMobileOpenSubject.asObservable();

  constructor() { }

  toggle(): void {
    this.isCollapsedSubject.next(!this.isCollapsedSubject.value);
  }

  setCollapsed(collapsed: boolean): void {
    this.isCollapsedSubject.next(collapsed);
  }

  getIsCollapsed(): boolean {
    return this.isCollapsedSubject.value;
  }

  toggleMobile(): void {
    this.isMobileOpenSubject.next(!this.isMobileOpenSubject.value);
  }

  setMobileOpen(open: boolean): void {
    this.isMobileOpenSubject.next(open);
  }

  getIsMobileOpen(): boolean {
    return this.isMobileOpenSubject.value;
  }
}

