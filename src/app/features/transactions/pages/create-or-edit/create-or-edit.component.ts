import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkPortal } from '@angular/cdk/portal';
import { tap } from 'rxjs';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { TransactionType } from '@shared/transaction/enums/transaction-type';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { Transaction, TransactionPayload } from '@shared/transaction/interfaces/transaction';
import { FullWidthDirective } from '@shared/material/form-field/directives/full-width.directive';
import { MarginBottomDirective } from '@shared/material/form-field/directives/margin-bottom.directive';
import { CustomFormFieldDirective } from '@shared/material/form-field/directives/custom-form-field.directive';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
    CustomFormFieldDirective
  ],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CreateOrEditComponent {
  private transactionsService = inject(TransactionsService);
  private router = inject(Router);
  private feedbackService = inject(FeedbackService);
  private activatedRoute = inject(ActivatedRoute);

  transaction = input<Transaction>();

  readonly transationType = TransactionType;

  isEdit = computed(() => Boolean(this.transaction()));

  form = computed(
    () =>
      new FormGroup({
        type: new FormControl(this.transaction()?.type ?? '', {
          validators: [Validators.required],
        }),
        title: new FormControl(this.transaction()?.title ?? '', {
          validators: [Validators.required],
        }),
        value: new FormControl(this.transaction()?.value ?? 0, {
          validators: [Validators.required],
        }),
      }),
  );

  submit() {
    if (this.form().invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form().value.title as string,
      type: this.form().value.type as TransactionType,
      value: this.form().value.value as number,
    };

    this.createOrEdit(payload).subscribe({
      next: () => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
      },
    });
  }

  private createOrEdit(payload: TransactionPayload) {
    if (this.isEdit()) {
      return this.transactionsService
        .put(this.transaction()!.id, payload)
        .pipe(
          tap(() =>
            this.feedbackService.success('Transação alterada com sucesso!'),
          ),
        );
    } else {
      return this.transactionsService
        .post(payload)
        .pipe(
          tap(() =>
            this.feedbackService.success('Transação criada com sucesso!'),
          ),
        );
    }
  }
}
