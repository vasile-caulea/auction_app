import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {MatNativeDateModule} from '@angular/material/core';
import {provideHttpClient} from '@angular/common/http';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideAnimations(), importProvidersFrom(MatNativeDateModule), provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(SocketIoModule.forRoot(config)),],
};
