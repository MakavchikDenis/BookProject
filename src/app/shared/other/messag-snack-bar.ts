
type ContentMessage={
    key:MessageKind,
    val:string
}

export const enum MessageKind{
    Success,
    Error,
    Notice,
    None
};

export const ContentMessages:ContentMessage[]=[
    {key:MessageKind.Success, val: "The operation executed successfully."},
    {key:MessageKind.Error, val: "Occured error."}

]


