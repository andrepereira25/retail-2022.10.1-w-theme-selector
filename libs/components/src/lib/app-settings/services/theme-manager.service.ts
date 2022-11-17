import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Theme {
  title: string, 
  theme: string
}

export const THEMES = new InjectionToken<Theme[]>('THEMES');

export type ElementTypes = HTMLLinkElement | HTMLElement;

export interface ElementToAppend<T = ElementTypes> {
  alreadyExists: boolean,
  themeLink: T
}


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
    private http: HttpClient
  ) {
    console.log(themes);
    this.themes = themes || [this.CustomTheme];
    this._selectedTheme$.next(themes && themes[0] || this.CustomTheme);
   }

   loadPrebuiltTheme(themeName: string) {
    this.document.querySelector('body').style.opacity = '0'
    this.http.get(themeName, { responseType: 'arraybuffer'}).subscribe((r) => {
      console.log(r)
      this.document.querySelector('body').style.opacity = '1'
    })
    const head = this.document.querySelector('head');
    const stylingElement = this.getThemeStyleElement('prebuilt-theme', 'custom-theme', 'link') as ElementToAppend<HTMLLinkElement>;
    stylingElement.themeLink.rel = 'stylesheet';
    stylingElement.themeLink.href = themeName;
    if (!stylingElement.alreadyExists) {
      head?.appendChild(stylingElement.themeLink);
    }
   }


  onCustomThemeSelect(theme: string) {
    const head = this.document.querySelector('head');
    const stylingElement = this.getThemeStyleElement('custom-theme', 'prebuilt-theme', 'style');
    console.log(stylingElement);
    stylingElement.themeLink.innerHTML = theme;
    if (!stylingElement.alreadyExists) {
      head?.appendChild(stylingElement.themeLink);
    }
  }


  setupCustomTemplateBase() {
    // this.document.body.addEventListener('transitionend', function(){
    //   console.log('done')
    //  }, false);
    fetch('/custom.css').then((t) => {
      return t.body.getReader().read()
    })
    .then((t) => {
      console.log(t)
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

  private getThemeStyleElement(id: string, toRemove: string, elType: string) {
    let themeLink = this.document.getElementById(id);
    this.document.getElementById(toRemove)?.remove();
    if (themeLink) {
      return ({
        alreadyExists: true,
        themeLink
      });
    }
    const style = this.document.createElement(elType);
    style.id = id;
    return ({
      alreadyExists: false,
      themeLink: style
    })
  }
}
