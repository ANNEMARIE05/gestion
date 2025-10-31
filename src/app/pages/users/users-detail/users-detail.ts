import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './users-detail.html',
  styleUrls: ['./users-detail.scss']
})
export class UsersDetailComponent implements OnInit {
  user: User | null = null;

  // Données factices pour l'exemple
  private usersData: User[] = [
    {
      id: '1',
      nom: 'Dupont Jean',
      email: 'jean.dupont@entreprise.com',
      contact: '+33 6 12 34 56 78',
      password: '********',
      profile: 'TPM',
      created_at: new Date('2024-01-15')
    },
    {
      id: '2',
      nom: 'Martin Marie',
      email: 'marie.martin@entreprise.com',
      contact: '+33 6 23 45 67 89',
      password: '********',
      profile: 'DEV',
      created_at: new Date('2024-02-20')
    },
    {
      id: '3',
      nom: 'Bernard Pierre',
      email: 'pierre.bernard@entreprise.com',
      contact: '+33 6 34 56 78 90',
      password: '********',
      profile: 'TEAM LEAD',
      created_at: new Date('2024-03-10')
    },
    {
      id: '4',
      nom: 'Dubois Sophie',
      email: 'sophie.dubois@entreprise.com',
      contact: '+33 6 45 67 89 01',
      password: '********',
      profile: 'DEV',
      created_at: new Date('2024-01-25')
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.user = this.usersData.find(u => u.id === userId) || null;
      
      if (!this.user) {
        this.router.navigate(['/users']);
      }
    });
  }

  getProfileBadgeClass(profile: string): string {
    switch (profile) {
      case 'TPM':
        return 'bg-purple-100 text-purple-800';
      case 'DEV':
        return 'bg-blue-100 text-blue-800';
      case 'TEAM LEAD':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getProfileLabel(profile: string): string {
    return profile;
  }
}

