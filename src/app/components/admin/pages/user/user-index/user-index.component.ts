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
    this.getItems();
  }

  public msgError!: string;
  public users!: [];

  public getItems(){
      this.userService.index().subscribe(res => {        
        this.users = res;
      })

  }

  submitDelete(name: string, id: any){
    if(confirm("Confirma exclusão de: "+name)) {
      this.userService.delete({
        id: id,
      }).subscribe( res => {
        this.deleteRow(id)
      })
    }
  }

  deleteRow(id: any){
    for(let i = 0; i < this.users.length; ++i){
      if (this.users[i]['id'] === id) {
        this.users.splice(i,1);
      }
    }
  }
}
