import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme, THEMES, ElementToAppend } from '../models/theming';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {

  customThemeBase = '';

  themes: Theme[];

  DefaultTheme = {
    title: 'Backbase',
    theme: 'backbase.css',
  }
  
  CustomTheme = {
    title: 'Custom:',
    theme: 'custom.css',
  }


  private _selectedTheme$ = new BehaviorSubject<Theme>(this.DefaultTheme);

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    @Inject(THEMES) themes: Theme[],
  ) {
    this.themes = themes || [this.CustomTheme];
    this._selectedTheme$.next(themes && themes[0] || this.CustomTheme);
    this.init();
   }

   loadPrebuiltTheme(themeName: string) {
    this.toggleBodyOpacity(false);
    const head = this.document.querySelector('head');
    const stylingElement = this.getThemeStyleElement('prebuilt-theme', 'link') as ElementToAppend<HTMLLinkElement>;
    stylingElement.rel = 'stylesheet';
    stylingElement.href = themeName;
    head?.appendChild(stylingElement);
  }
  
  onCustomThemeSelect(theme: string) {
    this.toggleBodyOpacity(false);
    const head = this.document.querySelector('head');
    const stylingElement = this.getThemeStyleElement('custom-theme', 'style');
    stylingElement.innerHTML = theme;
    head?.appendChild(stylingElement);
  }


  setupCustomTemplateBase() {
    fetch('/custom.css').then((t) => {
      return t.body.getReader().read()
    })
    .then((t) => {
      let theme = new TextDecoder().decode(t.value);
      this.customThemeBase = theme;
    });
  }

  setTheme(theme: Theme) {
    this._selectedTheme$.next(theme);
  }

  get selectedTheme$() {
    return this._selectedTheme$.asObservable();
  }

  private getThemeStyleElement(id: string, elType: string) {
    this.document.getElementById('prebuilt-theme')?.setAttribute('id', 'to-remove');
    this.document.getElementById('custom-theme')?.setAttribute('id', 'to-remove');
    const style = this.document.createElement(elType);
    style.id = id;
    return style;
  }

  private init() {
    window.document.fonts.addEventListener('loadingdone', () => this.toggleBodyOpacity(true));
    window.document.fonts.addEventListener('loadingerror', () => this.toggleBodyOpacity(true));
  }
  
  private toggleBodyOpacity(toggle: boolean) {
    const body = window.document.querySelector('body');
    if (toggle) {
      this.document.querySelectorAll('#to-remove')?.forEach(item => item.remove());
    }
    if (body) {
      body.style.transition = 'ease-out .05s';
      body.style.opacity = toggle ? '1' : '0';
      body.style.filter = toggle ? 'blur(0) brightness(1)' : 'blur(20px) brightness(1.2)';
    }
  }
}
