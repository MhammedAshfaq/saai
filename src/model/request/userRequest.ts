// Define the Address interface
interface IAddress {
    city: string;
    state: string;
    country: string;
    street: string;
  }
  
  // CreateUser class with flexible address structure
  export class CreateUser {
    gender: string;
    name: string;
    address: IAddress;
    email: string;
    age: string;
    picture: string;
  
    // Constructor to initialize all properties
    constructor(
      gender: string,
      name: string,
      address: IAddress,
      email: string,
      age: string,
      picture: string,
    ) {
      this.gender = gender;
      this.name = name;
      this.address = address;
      this.email = email;
      this.age = age;
      this.picture = picture;
    }
  }
  