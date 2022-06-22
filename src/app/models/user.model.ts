import { Guid } from "guid-typescript";

export class User {
    constructor(public id: Guid, public firstName: string, public lastName: number){  
    }
}
