import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionService } from 'src/app/services/action.service';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.css']
})
export class VerifyModalComponent {
  userId: string = "";
  message: string = "";
  errorMessage: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VerifyModalComponent>,
    private actionService: ActionService,
    private LoadingService: LoadingService,
  ) {

  }
  ngOnInit() {
    this.userId = this.data.id
    this.message = `Are you sure you want to delete user ${this.userId}`
    this.clearErrors()

  }
  onCancel() {
    this.dialogRef.close();
  }
  async onConfirm() {
    this.LoadingService.showLoading()
    this.clearErrors()
    if (this.userId !== undefined && this.userId !== null && this.userId !== "") {
      var res = await this.actionService.deleteUser(`Users/remove-user/${this.userId}`)
      if (res !== undefined && res !== null && (res["ErrorMessage"] === undefined || res["ErrorMessage"] === null)) {
        this.LoadingService.hideLoading()
        this.dialogRef.close(this.data.id);
      } else {
        this.errorMessage = "Failed Deleting User"
        this.LoadingService.hideLoading()
      }
    } else {
      this.errorMessage = "Used ID wasnt found"
      this.LoadingService.hideLoading()

    }
  }
  clearErrors() {
    this.errorMessage = ""
  }
}
