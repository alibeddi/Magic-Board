
export interface loginEndPoint {
    email: string;
    password: string;
}

export interface registerEndPoint {
    email: string;
    password: string;
    username:string;
}
export interface MyToken {
    name: string;
    exp: number;
   
  }