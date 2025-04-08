
interface IDictionery<T>{
    key:string,
    val:T
}

const list:IDictionery<string>[]=[
    {key:"required",val:"You must enter a value - "},
    {key:"format", val:"Not a valid - "}
]

export const MessageValidDictionery = {
    getMessage(key:string, nameField:string):string{
        let part= list.find(x=>x.key==key)?.val ?? "";
        return part==""? part : part+nameField; 
    }
}
