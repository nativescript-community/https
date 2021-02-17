import * as application from '@nativescript/core/application';
import { knownFolders, path } from '@nativescript/core/file-system';
import * as Https from '@nativescript-community/https';
Https.setCache({
    diskLocation: path.join(knownFolders.documents().path, 'httpcache'),
    diskSize: 10 * 1024 * 1024, // 10 MiB
});
application.run({ moduleName: 'main-page' });
