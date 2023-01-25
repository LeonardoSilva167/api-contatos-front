import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit{

  public formUser: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required]],
    celular: ['', [Validators.required]],
  })

  public msgError!: string;
  pageID: any;
  pagePath: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute : ActivatedRoute,
  ){}
  
  public ngOnInit(): void {
    this.msgError = '';
    this.pageID = this.activatedRoute.snapshot.paramMap.get("id");
    this.pagePath = this.activatedRoute.snapshot.url[0].path;
    // console.log(this.pageID);
    // console.log(this.activatedRoute.snapshot.url[0].path)

    if(this.isPageEdit()){
      this.userShow();
    }

  }

  submitForm(){
    if(this.formUser.valid){
      console.log(this.pageID && this.pagePath)
      if(this.isPageEdit()){
        console.log(this.isPageEdit())
        this.submitEdit()
      }
      else{
        this.submitCreate()
      }
    }
  }

  public userShow(){
    this.userService.show({
      id: this.pageID
    }).subscribe(res => {        
      console.log(res)
      this.setDataFields(res)
    })
  }

  submitCreate(){
    this.userService.create({
      name: this.formUser.value.name,
      email: this.formUser.value.email,
      telefone: this.formUser.value.telefone,
      celular: this.formUser.value.celular,
    }).subscribe({
      next: (res) => res,
      error: (e)=> (this.msgError = e),
    })
  }

  submitEdit(){
    this.userService.edit({
      id: this.pageID,
      name: this.formUser.value.name,
      email: this.formUser.value.email,
      telefone: this.formUser.value.telefone,
      celular: this.formUser.value.celular,
    }).subscribe({
      next: (res) => res,
      error: (e)=> (this.msgError = e),
    })
  }

  setDataFields(data: any){
    // this.formUser.setValue({
    //   name: data.name, 
    //   email: data.email
    // });
    this.formUser.patchValue({
      name: data.name, 
      email: data.email, 
      telefone: data.telefone, 
      celular: data.celular, 
    });

  }

  isPageEdit(){
    return this.pageID && this.pagePath == 'editar';
  }
  

}
