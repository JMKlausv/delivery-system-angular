import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Mgo+DSMBaFt/QHFqVVhkW1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF9jTH1Sd0FmWnxfc31XQg==;Mgo+DSMBPh8sVXJ0S0d+XE9AcVRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3xTc0ZiWHtbc3dUQmNeVQ==;ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkBgWH5adXdWR2RZVkQ=;NjQ4Njk3QDMyMzAyZTMxMmUzMGNaZ0kzUzJhSThueGJrN3JsZmsrNDdJdm9ab3JwZ0pIOFQwZ0ZjUGMxdHM9;NjQ4Njk4QDMyMzAyZTMxMmUzMFJHQnFCa2RBOHdaa3JCYThLb0VrMGpmOC8yVnRFRkRUcktsUHZjN1hjNDg9;NRAiBiAaIQQuGjN/V0Z+XU9EaFtFVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdEVmWn5fdHFWRWFZVkVw;NjQ4NzAwQDMyMzAyZTMxMmUzMGg3dkk5VG5CMmVlQmlVbjZ5ejlGNzNiK2Y4UDdSdHZSNFpubmlGaUVHZUk9;NjQ4NzAxQDMyMzAyZTMxMmUzMEoxdGdxK0VPcVM1MG1ROS9sMThMcm9ZbkpIbXpGOVJKVlVrb1R2c3BnZ2M9;Mgo+DSMBMAY9C3t2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkBgWH5adXdWR2ddUUc=;NjQ4NzAzQDMyMzAyZTMxMmUzMFc0eXRIVWpZQlA3SXorMy8vVXIxYmtmQWJSS2g5R1dpVVFUZU52cDdjaWM9;NjQ4NzA0QDMyMzAyZTMxMmUzMGVSYjJJeUIzTWJtMUxsYmViZXhnRHQrQzBnZUpRRjVmN2NEMDF0UDAzMUU9');
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
