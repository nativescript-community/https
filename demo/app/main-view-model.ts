import {Observable} from 'data/observable';
import {Https} from 'nativescript-https';

export class HelloWorldModel extends Observable {
  public message: string;
  private https: Https;

  constructor() {
    super();

    this.https = new Https();
    this.message = this.https.message;
  }
}