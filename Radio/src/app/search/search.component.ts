import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { this.authService.checkAuth() }

}
