import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
   team = [
    { name: 'Mahmoud Ahmed', role: 'Frontend Developer', img: 'images/&oka.jpeg' },
    { name: 'Mohamed Alaa', role: 'Frontend Developer', img: 'images/ALaa.jpeg' },
   { name: 'Mohamed Abdel Fatah', role: 'BackEnd Developer', img: '  images/MAftah.jpeg' },
    { name: 'Mohamed Abdel Wahab', role: 'Database Engineer', img: 'images/abdelwahab.jpeg' },
    { name: 'Mohamed Ahmed Zaki', role: 'ERD Designer', img: 'images/Zaji.jpeg' },
    { name: 'Ahmed Abdel Hamid', role: 'Tester', img: 'images/abdehamed.jpeg' }
  ];

}
