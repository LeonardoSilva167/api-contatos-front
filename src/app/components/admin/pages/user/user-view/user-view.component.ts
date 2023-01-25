import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

  public msgError!: string;
  pageID: any;
  pagePath: any;

  constructor(
    private userService: UserService,
    private activatedRoute : ActivatedRoute,
  ){}


  data: any = {
    name: '',
    email: '',
    telefone: '',
    celular: '',
    contacts: [],
  } 

    
  public ngOnInit(): void {
    this.msgError = '';
    this.pageID = this.activatedRoute.snapshot.paramMap.get("id");
    this.pagePath = this.activatedRoute.snapshot.url[0].path;
    this.userShow();

  }

  public userShow(){
    this.userService.show({
      id: this.pageID
    }).subscribe(res => {        
      this.data.name = res.name;
      this.data.email = res.email;
      this.data.telefone = res.telefone;
      this.data.celular = res.celular;
      this.data.contacts = res.contacts;
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
    for(let i = 0; i < this.data.contacts.length; ++i){
      if (this.data.contacts[i]['id'] === id) {
        this.data.contacts.splice(i,1);
      }
    }
  }

}
