import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-parametre',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './parametre.html',
  styleUrls: ['./parametre.scss']
})
export class ParametreComponent implements OnInit {
  settings = {
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    language: 'fr',
    theme: 'light',
    timezone: 'Europe/Paris'
  };

  languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  themes = [
    { value: 'light', label: 'Clair' },
    { value: 'dark', label: 'Sombre' },
    { value: 'auto', label: 'Automatique' }
  ];

  timezones = [
    { value: 'Europe/Paris', label: 'Europe/Paris (UTC+1)' },
    { value: 'UTC', label: 'UTC (UTC+0)' },
    { value: 'America/New_York', label: 'America/New_York (UTC-5)' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  saveSettings(): void {
    // Logic to save settings
    console.log('Settings saved:', this.settings);
  }
}

