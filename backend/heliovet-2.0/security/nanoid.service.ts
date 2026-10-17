import {nanoid} from 'nanoid'

export function CnanoidGEN(){

    const CNID = nanoid(4)

    return "C-"+CNID

}

export function OnanoidGEN(){

    const ONID = nanoid(4)

    return "O-"+ONID

}




const Ogen = OnanoidGEN()
console.log('ownernid',Ogen)

const gen = CnanoidGEN()
console.log('clinicnid',gen)