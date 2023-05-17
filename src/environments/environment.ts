// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v723demo1',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: false,
  apiUrl: 'api',
  // URL_BACKEND: 'http://127.0.0.1:8000/',
  // URL_BACKEND: 'http://192.168.1.105:80/Back-eCommerce_Laravel_Angular/public',
  URL_BACKEND: 'http://192.168.1.105:80/Back-eCommerce_Laravel_Angular',
  URL_SERVICIOS: 'http://192.168.1.105:80/Back-eCommerce_Laravel_Angular/public/api',
  URL_FROTEND: 'http://localhost:4200',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
