import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RootModule } from '@root';
import { Environment } from '@utils/models/environment';
import { config } from './environments/environment';

if (config.env === Environment.Production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(RootModule)
  .catch(err => console.error(err));
