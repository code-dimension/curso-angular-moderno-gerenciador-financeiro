import { Component, ChangeDetectionStrategy, inject, computed, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../interfaces/dialog-data";

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{ resolvedDialogData().title }}</h2>
    <mat-dialog-content>
      {{ resolvedDialogData().message }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="false">
        {{ resolvedDialogData().noBtnText || 'Não' }}
      </button>
      <button matButton [mat-dialog-close]="true" cdkFocusInitial>
        {{ resolvedDialogData().yesBtnText || 'Sim' }}
      </button>
    </mat-dialog-actions>
  `,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  readonly dialogData = signal(inject<DialogData>(MAT_DIALOG_DATA));

  private defaultDialogData: Partial<DialogData> = {
    noBtnText: 'Não',
    yesBtnText: 'Sim',
  };

  resolvedDialogData = computed(() => {
    return {
      ...this.defaultDialogData,
      ...this.dialogData(),
    };
  });
}
