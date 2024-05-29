/*
{
    "room1":{
        user1:true,
        user2:false,
    }
    "room2":{
        user1:true,
        user2:false,
    }
}
*/

export interface IRoom {
  [key: string]: boolean;
}

export interface IRoomStore {
  [key: string]: IRoom;
}

export const UserStore: IRoomStore = {} as IRoomStore;
