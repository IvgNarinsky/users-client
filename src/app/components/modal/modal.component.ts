import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionService } from 'src/app/services/action.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalComponent>,
    private actionService: ActionService,
    private LoadingService: LoadingService,
  ) {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      birthDate: [''],
      gender: [''],
      tel: [''],
    });
  }
  today = new Date();
  errorMessage: string = ""
  ngOnInit() {
    this.clearErrors()
    if (this.data.action === 'edit') {
      const birthDate = this.convertStringToDate(this.data.user.birthDate);

      this.userForm.setValue({
        id: this.data.user.id,
        name: this.data.user.name,
        email: this.data.user.email,
        birthDate: birthDate,
        gender: this.data.user.gender,
        tel: this.data.user.tel,
      });
    }
  }


  async onSubmit() {
    this.LoadingService.showLoading()
    this.clearErrors()
    var user = this.userForm.value
    if (this.validateUser(this.userForm)) {

      //making sure the date format will be send to server correctly
      const birthDateControl = this.userForm.get('birthDate');
      const birthDate = birthDateControl ? birthDateControl.value : null;
      if (birthDate !== undefined && birthDate !== null && birthDate.toString().trim() !== "") {
        const birthDateCoverted = this.convertStringToDate(birthDate.toString().trim())
        if (birthDateCoverted !== undefined && birthDateCoverted !== null)
          this.userForm.get("birthDate")?.patchValue(birthDateCoverted)
      }
      if (this.data.action === 'edit') {
        var res = await this.actionService.updateUser("Users/update-user", user)
        if (res !== undefined && res !== null && (res["ErrorMessage"] === undefined || res["ErrorMessage"] === null)) {
          this.LoadingService.hideLoading()
          user["birthDate"] = this.convertStringToDate(user["birthDate"])
          this.dialogRef.close(user);
        } else {
          this.LoadingService.hideLoading()
          this.errorMessage = "Failed Updating User"
        }
      } else {
        var res = await this.actionService.addUser("Users/add-user", user)
        if (res !== undefined && res !== null && (res["ErrorMessage"] === undefined || res["ErrorMessage"] === null)) {
          user["birthDate"] = this.convertStringToDate(user["birthDate"])
          this.dialogRef.close(user);
          this.LoadingService.hideLoading()
        } else {
          this.LoadingService.hideLoading()
          this.errorMessage = "Failed Adding User"
        }
      }
    } else {
      if (this.errorMessage === "")
        this.errorMessage = "Invalid Data entered"
      this.LoadingService.hideLoading()
    }

  }
  convertStringToDate(dateString: any): Date | null | string {
    if (typeof dateString === 'string') {
      const dateParts = dateString.split('/');
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);
        return new Date(year, month, day);
      } else {
        return null;
      }
    } else if (dateString instanceof Date) {
      const formattedDate = dateString.getDate() + '/' + (dateString.getMonth() + 1) + '/' + dateString.getFullYear();
      return formattedDate;
    } else {
      return null;
    }
  }
  clearErrors() {
    this.errorMessage = ""
  }

  onCancel() {
    this.dialogRef.close();
  }
  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  containsOnlyNumbers(str: string) {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(str);
  }
  validateUser(user: FormGroup) {
    const idControl = user.get('id');
    const id = idControl ? idControl.value : null;
    const nameControl = user.get('name');
    const name = nameControl ? nameControl.value : null;
    const birthDateControl = user.get('birthDate');
    const birthDate = birthDateControl ? birthDateControl.value : null;
    const emailControl = user.get('email');
    const email = emailControl ? emailControl.value : null;
    const telControl = user.get('tel');
    const tel = telControl ? telControl.value : null;
    var isValidUser = true

    if (id === undefined || id === null || id.trim() === "" || !this.containsOnlyNumbers(id)) {
      isValidUser = false
      this.errorMessage = "Invalid ID , must contain just numbers"
    } else if (name === undefined || name === null || name.trim() === "") {
      isValidUser = false
      this.errorMessage = "Invalid Name"
    } else if (birthDate === undefined || birthDate === null || birthDate.toString().trim() === "") {
      isValidUser = false
      this.errorMessage = "Invalid BirthDate"
    } else if (email !== undefined && email !== null && email.trim() !== "" && !this.isValidEmail(email)) {
      isValidUser = false
      this.errorMessage = "Invalid Email"
    } else if (tel !== undefined && tel !== null && tel.trim() !== "" && !this.containsOnlyNumbers(tel)) {
      isValidUser = false
      this.errorMessage = "Invalid Telephone"
    }
    return isValidUser
  }
}
