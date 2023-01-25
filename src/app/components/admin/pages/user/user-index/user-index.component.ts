import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {



  constructor(
    private userService: UserService,
  ){}

  public ngOnInit(): void {
    this.getUsers();
  }

  public msgError!: string;
  public users!: [];

  public getUsers(){
      this.userService.index().subscribe(res => {        
        this.users = res;
      })

  }

  submitDelete(id: any){
    // if(confirm("Dese "+name)) {
    //   console.log("Implement delete functionality here");
    // }
    // $('[data-toggle=confirmation]').confirmation({
    //   rootSelector: '[data-toggle=confirmation]',
    //   // other options
    // });
  }
  clickMethod(name: string) {
    if(confirm("Are you sure to delete "+name)) {
      console.log("Implement delete functionality here");
    }
  }

}
