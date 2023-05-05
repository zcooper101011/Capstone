export interface UserType {
    UserTypeId:number,
    TypeName:string,
    TypeDescription:string,
    TypePermissions:any
}

export interface Customer {
    CustomerId:number,
    CustomerFirstName:string,
    CustomerLastName:string,
    CustomerEmail:string
    CustomerPassword:string
}

export interface MenuItems {
    MenuItemId:number,
    MenuTypeId:number,
    MenuItemName:string,
    MenuItemPrice:string,
    MenuItemDescription:string
}

export interface Inventory {
    InventoryId:number,
    InventoryName:string,
    InventoryDescription:string,
    InventoryQuantity:number
}

export interface MenuType {
    MenuTypeId:number,
    MenuTypeName:string,
    MenuTypeDescription:string
}

export interface Reservations {
    UserId:number,
    StartTime:Date,
    RoomId:number
}

export interface Users {
    UserId:number,
    UserFirstName:string,
    UserLastName:string,
    UserName:string,
    UserEmail:string,
    UserPassword:string,
    UserTypeId:number,
}

export interface Rooms {
    RoomId:number,
    RoomNumber:number,
    RoomDescription:string
}

export interface Orders {
    OrderId:number,
    UserId:number,
    CustomerId:number
    OrderDateTime:string
}

