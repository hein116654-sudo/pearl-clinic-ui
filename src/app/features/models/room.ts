export interface RoomRequest {
    id : number;
    roomNo : string;
    roomType : string;
    status : boolean;
}
export interface RoomPayload {
    roomNo : string;
    roomType : string;
}