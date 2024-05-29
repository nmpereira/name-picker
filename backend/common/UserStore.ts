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

export interface IRoomStore {
  [key: string]: {
    [key: string]: boolean;
  };
}

export const UserStore: IRoomStore = {} as IRoomStore;
