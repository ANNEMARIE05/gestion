import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametre.html',
  styleUrls: ['./parametre.scss']
})
export class ParametreComponent implements OnInit {
  settings = {
    security: {
      twoFactor: false
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  saveSettings(): void {
    // Logic to save settings
    console.log('Settings saved:', this.settings);
  }
}

