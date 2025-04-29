export function validMail(str:string){
    if(!str.includes("@")) return false
    if(!str.includes(".")) return false
    if(str.charAt(str.length-1)===".") return false
    if(str.charAt(str.length-1)==="@") return false
    return true
}

export function validName(str:string){
    if(/\d/.test(str)) return false
    return true
}

export function isEmpty(str:string){
    if(str==="") return true
    return false
}

export function validPassword(str:string){
    if(str.length<8) return false
    if(!/\d/.test(str)) return false
    if(!/[a-z]/.test(str)) return false
    if(!/[A-Z]/.test(str)) return false
    return true
}