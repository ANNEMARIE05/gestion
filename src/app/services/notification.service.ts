import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  private notificationIdCounter = 0;

  getNotifications(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }

  show(message: string, type: Notification['type'] = 'info', duration: number = 5000): void {
    const notification: Notification = {
      id: this.notificationIdCounter++,
      message,
      type,
      duration
    };

    const currentNotifications = this.notifications$.value;
    this.notifications$.next([...currentNotifications, notification]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);
      }, duration);
    }
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  remove(id: number): void {
    const currentNotifications = this.notifications$.value;
    this.notifications$.next(currentNotifications.filter(n => n.id !== id));
  }

  clear(): void {
    this.notifications$.next([]);
  }
}

