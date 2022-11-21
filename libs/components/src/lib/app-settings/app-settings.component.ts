import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { ColorsToDisplay, ColorToDisplay, Theme } from './models/theming';
import { ColoringService } from './services/coloring.service';
import { ThemeManagerService } from './services/theme-manager.service';

@Component({
  selector: 'bb-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppSettingsComponent implements OnInit, OnDestroy {
  
  showColorGraph = false;

  destroy$ = new Subject<void>();
  
  DefaultTheme = {
    title: 'Backbase',
    theme: 'backbase.css',
  }
  CustomTheme = {
    title: 'Custom:',
    theme: 'custom.css',
  }
    
  isOpen = false;
  
  customThemeForm = this.fb.group({
    primary: this.fb.control('#0062c4'),
    secondary: this.fb.control('#181e41'),
    accent: this.fb.control('#f2780c'),
    success: this.fb.control('#2e7d32'),
    danger: this.fb.control('#d32f2f'),
    warning: this.fb.control('#fbc02d'),
    info: this.fb.control('#1476cc'),
    "neutral-white": this.fb.control('#ffffff'),
    "neutral-lightest": this.fb.control('#f5f5f5'),
    "neutral-lighter": this.fb.control('#f2f2f2'),
    "neutral-light": this.fb.control('#e9eaeb'),
    "neutral-grey": this.fb.control('#dedede'),
    "neutral-greyer": this.fb.control('#c5c5c5'),
    "neutral-greyest": this.fb.control('#a2a2a2'),
    "neutral-dark": this.fb.control('#616161'),
    "neutral-darker": this.fb.control('#333333'),
    "neutral-darkest": this.fb.control('#111112'),
    "neutral-black": this.fb.control('#000000')
  })
  
  customThemeFormValues$ = this.customThemeForm.valueChanges.pipe(takeUntil(this.destroy$));

  selectedTheme$ = this.themeManager.selectedTheme$;
  
  constructor(
    private fb: FormBuilder, 
    private titleCase: TitleCasePipe,
    private coloringService: ColoringService,
    private themeManager: ThemeManagerService
  ) {}

  ngOnInit(): void {
    this.loadThemeOnSelection();
    this.themeManager.setupCustomTemplateBase();
    this.onCustomThemeVariableUpdate();
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  setTheme(theme: Theme) {
    this.themeManager.setTheme(theme);
  }

  private loadThemeOnSelection() {
    this.themeManager.selectedTheme$
    .pipe(
      takeUntil(this.destroy$),
      tap(item => item === this.CustomTheme ? this.onCustomThemeSelect() : this.loadTheme(item.theme))
    )
    .subscribe()
  }

  private loadTheme(themeName: string) {
    this.themeManager.loadPrebuiltTheme(themeName);
  }

  private onCustomThemeSelect() {
    const theme = this.coloringService.replaceColorPlaceholders(this.themeManager.customThemeBase);
    this.themeManager.onCustomThemeSelect(theme);
    this.customThemeForm.updateValueAndValidity();
  }

  private onCustomThemeVariableUpdate() {
    this.coloringService.setDocumentColors(this.customThemeForm.value);
    this.customThemeFormValues$.pipe(
      tap(variables => {
        this.coloringService.setDocumentColors(variables);
      })
    ).subscribe();
  }

  private excludeColorVariants(item: ColorToDisplay) {
    return item.controlName.startsWith('neutral') || !(item.controlName.includes('lighter') || item.controlName.includes('lightest') || item.controlName.includes('darker') || item.controlName.includes('darkest'))
  }

  trackByControlName(item: { controlName: string, label: string }) {
    return item.controlName;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get formControlKeys(): ColorsToDisplay {
    return Object.keys(this.customThemeForm.controls)
            .map(item => ({
              controlName: item,
              label: this.titleCase.transform(item.split('-').join(' '))
            }))
            .filter(this.excludeColorVariants);
  }

  get controls() {
    return Object.keys(this.customThemeForm.controls).map(key => ({ value: this.customThemeForm.controls[key]?.value, name: key }))
  }

  get themes() {
    return this.themeManager.themes;
  }

}