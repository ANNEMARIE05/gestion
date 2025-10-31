import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-veille',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './veille.html',
  styleUrls: ['./veille.scss']
})
export class VeilleComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}