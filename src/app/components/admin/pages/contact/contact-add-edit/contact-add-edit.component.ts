import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/pages/contact/contact.service';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.scss']
})
export class ContactAddEditComponent implements OnInit{

  public formContact: FormGroup = this.formBuilder.group({
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
    private contactService: ContactService,
    private activatedRoute : ActivatedRoute,
  ){}
  
  public ngOnInit(): void {
    this.msgError = '';
    this.pageID = this.activatedRoute.snapshot.paramMap.get("id");
    this.pagePath = this.activatedRoute.snapshot.url[0].path;
    
    if(this.isPageEdit()){
      this.showData();
    }

  }

  submitForm(){
    if(this.formContact.valid){
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

  public showData(){
    this.contactService.show({
      id: this.pageID
    }).subscribe(res => {        
      console.log(res)
      this.setDataFields(res)
    })
  }

  submitCreate(){
    this.contactService.create({
      name: this.formContact.value.name,
      email: this.formContact.value.email,
      telefone: this.formContact.value.telefone,
      celular: this.formContact.value.celular,
    }).subscribe({
      next: (res) => res,
      error: (e)=> (this.msgError = e),
    })
  }

  submitEdit(){
    this.contactService.edit({
      id: this.pageID,
      name: this.formContact.value.name,
      email: this.formContact.value.email,
      telefone: this.formContact.value.telefone,
      celular: this.formContact.value.celular,
    }).subscribe({
      next: (res) => res,
      error: (e)=> (this.msgError = e),
    })
  }

  setDataFields(data: any){
    // this.formContact.setValue({
    //   name: data.name, 
    //   email: data.email
    // });
    this.formContact.patchValue({
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
