/*
{
    "room1":{
      users:{
        user1:true,
        user2:false,
      }
      lastRoll: "user1"
    }
    "room2":{
      users:{
        user1:true,
        user2:false,
      }
      lastRoll: "user1"
      isRolling: true
    }
}
*/

export interface IRoom {
  [key: string]: boolean;
}

export interface IRoomStore {
  [key: string]: {
    users: IRoom;
    lastRoll: string | null;
    isRolling: boolean;
  };
}

export const UserStore: IRoomStore = {} as IRoomStore;
