import { genSaltSync, hashSync, compareSync} from "bcrypt";

export interface IHashService {
    hash(plainText:string):string
    compare(plainText:string, cypherText: string):boolean
} 

export class HashService implements IHashService {
    hash = (plainText:string):string => {
    const cost = Number(12)
    const salt = genSaltSync(cost)
    return  hashSync(plainText,salt) 
    }

    compare = (plainText:string, cypherText: string):boolean => {
        return compareSync(plainText,cypherText)
    }
}
