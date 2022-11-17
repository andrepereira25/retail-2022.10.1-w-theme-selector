import { AfterContentInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Injector, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import mix from 'mix-css-color';

@Component({
  selector: 'bb-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {       
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true     
    }   
  ]
})
export class ColorPickerComponent implements AfterContentInit, ControlValueAccessor {

  @Input('label')
  label;
  
  @Input('singleRow')
  singleRow = false;

  value = '';

  @Input()
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};
  
  @Output('change')
  _valueChange = new EventEmitter();

  ngControl

  colorVariants = [
    {
      variant: 'lighter',
      baseColor: '#ffffff',
      percentage: 30
    },
    {
      variant: 'lightest',
      baseColor: '#ffffff',
      percentage: 85
    },
    {
      variant: 'darker',
      baseColor: '#000000',
      percentage: 30
    },
    {
      variant: 'darkest',
      baseColor: '#000000',
      percentage: 45
    },
  ]

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {}

  onValueChange(newVal: string) {
    this.onChange(newVal || '');
    this.onTouched();
    this.value = newVal || '';
    this.updateVariants(this.value)
    this._valueChange.emit(this.value);
  }

  writeValue(newVal: string): void {
    this.value = newVal || '';
    this.updateVariants(this.value)
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterContentInit(): void {
    this.ngControl = this.injector.get(NgControl);
    const parent: FormGroup = this.ngControl.control.parent;
    const nonVariant = !this.colorVariants.map(v => this.ngControl.name.includes(v.variant) || this.ngControl.name.startsWith('neutral')).some(el => el === true);
    if (nonVariant) {
      const variants = this.getColorVariants(this.value);
      for (const variant in variants) {
        parent.addControl(variant, new FormControl(variants[variant]));
      }
    }
  }

  private getColorVariants(mainColor: string) {
    return this.colorVariants.map(v => ({
      [`${this.ngControl.name}-${v.variant}`]: mix(v.baseColor, mainColor, v.percentage).hex
    })).reduce((prev, curr) => ({...prev, ...curr}))
  }

  private updateVariants(mainColor: string) {
    if (this.ngControl?.control) {
      const variants = this.getColorVariants(mainColor);
      this.ngControl.control.parent.patchValue(variants);
    }
  }
}
