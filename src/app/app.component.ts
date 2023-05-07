import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon:'home' },
    { title: 'Alunos', url: '/student', icon: 'people' },
    { title: 'Locais', url: '/location', icon: 'location' },
    { title: 'Locações', url: '/tenancy', icon: 'calendar-number' }
  ];
  constructor() {}
}
