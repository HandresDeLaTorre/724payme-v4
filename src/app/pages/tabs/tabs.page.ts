import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private authService: AuthService
  ) {
/*     setTimeout(()=>{
      this.authService.logout()
    },30000000) */
   }

  ngOnInit() {

  }

}
