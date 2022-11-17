import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { IconModule } from '@backbase/ui-ang/icon';
import { InputRadioGroupModule } from '@backbase/ui-ang/input-radio-group';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerComponent } from './app-settings/color-picker/color-picker.component';
import { THEMES } from './app-settings/services/theme-manager.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, IconModule, InputRadioGroupModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  declarations: [AppSettingsComponent, ColorPickerComponent],
  exports: [AppSettingsComponent],
  providers: [
    TitleCasePipe,
    {
      provide: THEMES,
      useValue: [
        {
          title: 'Backbase',
          theme: 'backbase.css',
        }, 
        {
          title: 'Coutts',
          theme: 'coutts-default.css',
        },
        {
          title: 'Coutts (Fixed)',
          theme: 'coutts-fixed.css'
        }
      ]
    }
  ]
})
export class ComponentsModule {}
