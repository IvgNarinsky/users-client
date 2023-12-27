import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActionService } from '../services/action.service';
import { ModalComponent } from '../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { VerifyModalComponent } from '../components/verify-modal/verify-modal.component';
import { LoadingService } from '../services/loading.service';
import { NotifierService } from 'angular-notifier';

export interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  tel: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})

export class UsersComponent implements OnInit, AfterViewInit {
  dataSource: User[] = [];
  errorMessage: string = "";
  isDisplayTable: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'email', 'birthDate', 'gender', 'tel', 'actions'];
  @ViewChild(MatTable, { static: true }) table!: MatTable<User>;
  private readonly notifier: NotifierService;
  constructor(private actionService: ActionService, private dialog: MatDialog, private LoadingService: LoadingService, notifierService: NotifierService, private cdr: ChangeDetectorRef
  ) {
    this.notifier = notifierService;
  }

  async ngOnInit() {
    this.LoadingService.showLoading()
    this.clearErrors()
    var users = await this.actionService.getUsers('Users/get-users')
    if (users !== undefined && users !== null && Array.isArray(users) && users.length >= 0) {
      this.dataSource = [...users]
    } else {
      this.errorMessage = "Failed Getting Data"
    }

    this.LoadingService.hideLoading()
    this.isDisplayTable = true

  }
  ngAfterViewInit() {
    this.renderTable()

  }

  renderTable() {
    this.cdr.detectChanges();
    this.table?.renderRows();
  }

  addUser() {
    this.openModal("add", null)
  }
  editUser(user: User) {
    this.openModal("edit", user)

  }
  async deleteUser(userId: string) {
    this.openVerifyModal(userId)
  }

  addUserToTable(user: User) {
    this.dataSource.push(user)
    this.renderTable()
  }
  removeUserFromTable(userId: string) {
    this.dataSource = this.dataSource.filter(user => user.id !== userId)
    this.renderTable()

  }
  updateUserInTable(updateUser: User) {
    this.dataSource.forEach((user, index) => {
      if (user.id === updateUser.id) {
        this.dataSource[index] = { ...updateUser };
      }
    });
    this.renderTable()

  }
  openModal(action: string, user: User | null) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        action: action,
        user: user
      },
      disableClose: true,


    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        if (action === "add") {
          this.addUserToTable(result)
          this.showSuccessNotification(`User ${result.id} added Successfully`)
        } else if (action === "edit") {
          this.updateUserInTable(result)
          this.showSuccessNotification(`User ${result.id} updated Successfully`)
        }
      }

    });
  }
  openVerifyModal(userId: string) {
    const dialogRef = this.dialog.open(VerifyModalComponent, {
      data: { id: userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== null) {
        this.removeUserFromTable(userId)
        this.showSuccessNotification(`User ${userId} removed Successfully`)
      }
    });
  }
  showSuccessNotification(message: string) {
    this.notifier.notify('success', message);

  }
  clearErrors() {
    this.errorMessage = ""
  }



}
