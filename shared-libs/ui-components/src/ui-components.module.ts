import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './lib/button/button.component';
import { CardComponent } from './lib/card/card.component';
import { InputComponent } from './lib/input/input.component';
import { SelectComponent } from './lib/select/select.component';
import { BadgeComponent } from './lib/badge/badge.component';
import { ModalComponent } from './lib/modal/modal.component';

/**
 * This module exports all UI components for use in applications.
 * Since Angular 19, components can be both standalone and included in NgModules.
 */
@NgModule({
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    CardComponent,
    InputComponent,
    SelectComponent,
    BadgeComponent,
    ModalComponent
  ]
})
export class UIComponentsModule { }