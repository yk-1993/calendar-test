import { Event } from "react-big-calendar";
import { v4 as uuidv4 } from 'uuid';

export const TMP_USER_LIST:User[] = [
  {
    employeeId:1,
    name:"道地",
    permissionLevel:5,
  },
  {
    employeeId:2,
    name:"柳川",
    permissionLevel:4,
  },
  {
    employeeId:3,
    name:"木村",
    permissionLevel:3,
  },
  {
    employeeId:4,
    name:"テスト太郎1",
    permissionLevel:2,
  },
  {
    employeeId:5,
    name:"テスト太郎2",
    permissionLevel:1,
  },
  {
    employeeId:6,
    name:"テスト太郎3",
    permissionLevel:1,
  },
];

export type User = {
    employeeId:number;
    name:string;
    permissionLevel:number; // 権限レベル
}
export type EventType =  Event & {
    id:string; // uuid
    user: User; // ユーザー
    location?:string; // 場所
    guests?:User[]; // 参加者
    description?:string; // 説明
  };

  export const options = [
    { value: "1", label: "道地" },
    { value: "2", label: "柳川" },
    { value: "3", label: "木村" },
    { value: "4", label: "テスト太郎1" },
    { value: "5", label: "テスト太郎2" },
    { value: "6", label: "テスト太郎3" },
  ];
  
export const defaultEvents:EventType[] = [
  {
    id:uuidv4(),
    title: "ミーティング1",
    start: new Date(2023, 2, 31, 10, 0, 0),
    end: new Date(2023, 2, 31, 12, 0, 0),
    user:{ employeeId:1, name:"道地", permissionLevel:5 },
    guests:[TMP_USER_LIST[1]],
  },
  {
    id:uuidv4(),
    title: "ミーティング2",
    start: new Date(2023, 2, 31, 12, 0, 0),
    end: new Date(2023, 2, 31, 13, 0, 0),
    user:{ employeeId:2, name:"柳川", permissionLevel:4 },
    guests:[TMP_USER_LIST[2]],
  },
  {
    id:uuidv4(),
    title: "ミーティング3",
    start: new Date(2023, 3, 1, 16, 0, 0),
    end: new Date(2023, 3, 1, 18, 0, 0),
    user:{ employeeId:3, name:"木村", permissionLevel:3 },
    guests:[TMP_USER_LIST[2],TMP_USER_LIST[1]],
  },
  {
    id:uuidv4(),
    title: "ミーティング4",
    start: new Date(2023, 2, 29, 16, 0, 0),
    end: new Date(2023, 2, 29, 18, 0, 0),
    user:{ employeeId:4, name:"テスト太郎1", permissionLevel:2 },
    guests:[TMP_USER_LIST[3],TMP_USER_LIST[0]],
  },
  {
    id:uuidv4(),
    title: "ミーティング5",
    start: new Date(2023, 2, 30, 16, 0, 0),
    end: new Date(2023, 2, 30, 18, 0, 0),
    user:{ employeeId:5, name:"テスト太郎2", permissionLevel:1 },
    guests:[TMP_USER_LIST[1],TMP_USER_LIST[0]],
  },
  {
    id:uuidv4(),
    title: "ミーティング6",
    start: new Date(2023, 3, 30, 16, 0, 0),
    end: new Date(2023, 3, 30, 18, 0, 0),
    user:{ employeeId:6, name:"テスト太郎3", permissionLevel:1 },
    guests:[TMP_USER_LIST[1],TMP_USER_LIST[5],TMP_USER_LIST[3],],
  },
]
