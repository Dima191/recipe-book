export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokentExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokentExpirationDate || new Date() > this._tokentExpirationDate){
      return null;
    }
    return this._token;
  }

}
