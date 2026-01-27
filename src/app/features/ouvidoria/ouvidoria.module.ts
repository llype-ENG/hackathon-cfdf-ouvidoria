import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OuvidoriaRoutingModule } from './ouvidoria-routing.module';
import { OuvidoriaComponent } from './ouvidoria.component';

import { ReactiveFormsModule } from '@angular/forms';

/* Angular Material que usamos no form */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule }      from '@angular/material/button';
import { MatIconModule }        from '@angular/material/icon';
import { MatTooltipModule }     from '@angular/material/tooltip';
import { MatSnackBarModule }    from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    OuvidoriaComponent,
  ],
  imports: [
    CommonModule,
    OuvidoriaRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatStepperModule
  
  ]
})
export class OuvidoriaModule { }
