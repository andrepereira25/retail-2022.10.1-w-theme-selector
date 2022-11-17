import { NgModule, Provider } from '@angular/core';
import {
  PlacesJourneyConfiguration,
  PlacesJourneyConfigurationToken,
  PlacesJourneyModule,
  PLACES_JOURNEY_BASE_PATH,
} from '@backbase/places-journey-ang';
import { environment } from '../../../environments/environment';
import { APP_PLACES_BASE_PATH } from '../../service-paths.module';

const PlacesConfigProvider: Array<Provider> = [
  {
    provide: PlacesJourneyConfigurationToken,
    useValue: {
      latitude: 40.72345,
      longitude: -73.9924,
      mapZoom: 12,
      apiKey: environment.googleApiKey,
      placeTypes: {
        branch: {
          iconName: 'account',
          markerUrl: 'assets/bb-places-journey-ang/branch-marker.svg',
        },
        atm: {
          iconName: 'credit-card',
          markerUrl: 'assets/bb-places-journey-ang/atm-marker.svg',
        },
      },
    } as Partial<PlacesJourneyConfiguration>,
  },
  {
    provide: PLACES_JOURNEY_BASE_PATH,
    useExisting: APP_PLACES_BASE_PATH,
  },
];

@NgModule({
  imports: [PlacesJourneyModule.forRoot()],
  providers: [PlacesConfigProvider],
})
export class PlacesJourneyBundleModule {}
