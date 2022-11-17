import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColoringService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  setDocumentColors(variables: { [key:string]: string}) {
    for (const variable in variables) {
      this.document.documentElement.style.setProperty(`--color-${variable}`, variables[variable])
    }
  }

  replaceColorPlaceholders(theme: string) {
    return theme.replace(/#1e1e1e1e/gm, 'var(--color-primary)')
                  .replace(/#1e1e1e12/gm, 'var(--color-primary-lighter)')
                  .replace(/#1e1e1e13/gm, 'var(--color-primary-lightest)')
                  .replace(/#1e1e1e14/gm, 'var(--color-primary-darker)')
                  .replace(/#1e1e1e15/gm, 'var(--color-primary-darkest)')
                  .replace(/#11111111/gm, 'var(--color-secondary)')
                  .replace(/#11111112/gm, 'var(--color-secondary-lighter)')
                  .replace(/#11111113/gm, 'var(--color-secondary-lightest)')
                  .replace(/#11111114/gm, 'var(--color-secondary-darker)')
                  .replace(/#11111115/gm, 'var(--color-secondary-darkest)')
                  .replace(/#22222222/gm, 'var(--color-accent)')
                  .replace(/#22222212/gm, 'var(--color-accent-lighter)')
                  .replace(/#22222213/gm, 'var(--color-accent-lightest)')
                  .replace(/#22222214/gm, 'var(--color-accent-darker)')
                  .replace(/#22222215/gm, 'var(--color-accent-darkest)')
                  .replace(/#33333333/gm, 'var(--color-success)')
                  .replace(/#33333312/gm, 'var(--color-success-lighter)')
                  .replace(/#33333313/gm, 'var(--color-success-lightest)')
                  .replace(/#33333314/gm, 'var(--color-success-darker)')
                  .replace(/#33333315/gm, 'var(--color-success-darkest)')
                  .replace(/#44444444/gm, 'var(--color-danger)')
                  .replace(/#44444412/gm, 'var(--color-danger-lighter)')
                  .replace(/#44444413/gm, 'var(--color-danger-lightest)')
                  .replace(/#44444414/gm, 'var(--color-danger-darker)')
                  .replace(/#44444415/gm, 'var(--color-danger-darkest)')
                  .replace(/#55555555/gm, 'var(--color-warning)')
                  .replace(/#55555512/gm, 'var(--color-warning-lighter)')
                  .replace(/#55555513/gm, 'var(--color-warning-lightest)')
                  .replace(/#55555514/gm, 'var(--color-warning-darker)')
                  .replace(/#55555515/gm, 'var(--color-warning-darkest)')
                  .replace(/#66666666/gm, 'var(--color-info)')
                  .replace(/#66666612/gm, 'var(--color-info-lighter)')
                  .replace(/#66666613/gm, 'var(--color-info-lightest)')
                  .replace(/#66666614/gm, 'var(--color-info-darker)')
                  .replace(/#66666615/gm, 'var(--color-info-darkest)')
                  .replace(/#77777777/gm, 'var(--color-neutral-white)')
                  .replace(/#aaaaaaaa/gm, 'var(--color-neutral-lightest)')
                  .replace(/#bbbbbbbb/gm, 'var(--color-neutral-lighter)')
                  .replace(/#cccccccc/gm, 'var(--color-neutral-light)')
                  .replace(/#dddddddd/gm, 'var(--color-neutral-grey)')
                  .replace(/#eeeeeeee/gm, 'var(--color-neutral-greyer)')
                  .replace(/#1f1f1f1f/gm, 'var(--color-neutral-greyest)')
                  .replace(/#1a1a1a1a/gm, 'var(--color-neutral-dark)')
                  .replace(/#1b1b1b1b/gm, 'var(--color-neutral-darker)')
                  .replace(/#1c1c1c1c/gm, 'var(--color-neutral-darkest)')
                  .replace(/#1d1d1d1d/gm, 'var(--color-neutral-black)');
  }
}
