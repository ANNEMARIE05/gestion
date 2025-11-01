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
    nom: 'Tom Cook',
    email: 'tom.cook@entreprise.com',
    contact: '+33 6 12 34 56 78',
    profile: 'TEAM LEAD',
    created_at: new Date('2024-01-15'),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };

  constructor() { }

  ngOnInit(): void {
  }
}

