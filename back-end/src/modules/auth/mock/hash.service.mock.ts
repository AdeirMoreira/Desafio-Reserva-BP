import { IHashService } from "../services/hash.service";

export class HashServiceMock implements IHashService {
    hashString = "$2b$12$hbplfAb.KnUTcoiVUQYqzuA.dG9KplOTN97mG6LznMF/3hdhWRuqG"
    hash(plainText: string): string {
       return this.hashString
    }
    compare(plainText: string, cypherText: string): boolean {
        return this.hashString === plainText
    }
}