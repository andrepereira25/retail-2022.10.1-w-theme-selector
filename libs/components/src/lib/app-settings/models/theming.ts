import { InjectionToken } from "@angular/core";

export interface Theme {
    title: string, 
    theme: string
}

export const THEMES = new InjectionToken<Theme[]>('THEMES');

export type ElementTypes = HTMLLinkElement | HTMLElement;

export type ElementToAppend<T = ElementTypes> = T;

export interface ColorToDisplay { 
    controlName: string, 
    label: string 
}

export type ColorsToDisplay = ColorToDisplay[];

  