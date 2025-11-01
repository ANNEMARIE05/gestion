import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  user = {
    nom: 'I Anne Marie',
    email: 'tom.cook@entreprise.com',
    contact: '+33 6 12 34 56 78',
    profile: 'TEAM LEAD',
    created_at: new Date('2024-01-15'),
    avatar: 'https://ui-avatars.com/api/?name=User&background=9ca3af&color=fff&size=128'
  };

  constructor() { }

  ngOnInit(): void {
  }
}

