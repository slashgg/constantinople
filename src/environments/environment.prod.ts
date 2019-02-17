import { Config, ConfigOptions } from '@utils/models/config';
import { Environment } from '@utils/models/environment';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const configOpts: ConfigOptions = {
  localDomain: 'http://localhost:4200',
  env: Environment.Development,
  authDomain: 'http://localhost:52215',
  auth: {
    authority: 'http://localhost:52215',
    redirectUri: `/oauth/signin-callback`,
    silentRedirectUri: `/oauth/silent-callback`,
    logoutRedirectUri: `/oauth/logout-callback`,
    client_id: 'constantinople',
    response_type: 'id_token token',
    scope: 'openid profile email @slashgg/alexandria.admin',
  },
};

export const config = new Config(configOpts);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
