import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MatMenuModule } from '@angular/material';

@Component({
  selector: 'app-shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private isPersonal: boolean;

  constructor(
    private appComponent: AppComponent
  ) {
    this.isPersonal =  this.appComponent.currentUser.is_personal;
  }

  ngOnInit() {
  }

}
