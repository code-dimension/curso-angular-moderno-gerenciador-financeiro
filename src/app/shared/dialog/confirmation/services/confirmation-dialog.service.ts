import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog.component';
import { DialogData } from '../interfaces/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private dialog = inject(MatDialog);

  open(data: DialogData) {
    return this.dialog
      .open(ConfirmationDialogComponent, {
        data,
      })
      .afterClosed()
      .pipe(filter((response: boolean) => response === true));
  }
}
