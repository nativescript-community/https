
### clean up typings

* regexp: ```/export class .*?JNI {(.|[\r\n])*?}//```
* regexp: ```/export module .*? {([\t\r\n])*?}//``` twice
* regexp: ```/declare module com {([\t\r\n])*?}/```

## ios typings

run in the demo app
```
TNS_TYPESCRIPT_DECLARATIONS_PATH="$(pwd)/typings" tns build ios --bundle
```

### clean up typings

* regexp: ```/description\(\): string;//```
* regexp: ```/hash\(\): number;//```
* regexp: ```/var:/variant:/```