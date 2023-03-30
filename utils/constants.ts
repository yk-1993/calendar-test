import { Event } from "react-big-calendar";
import { v4 as uuidv4 } from 'uuid';

export type User = {
    id:number;
    name:string;
}
export type EventType =  Event & {
    id:string;
    user?: User; // ユーザー
    location?:string; // 場所
    guests?:User[]; // 参加者
    description?:string; // 説明
  };

  export const options = [
    { value: "1", label: "テスト太郎1" },
    { value: "2", label: "テスト太郎2" },
    { value: "3", label: "テスト太郎3" },
  ];
  
export const defaultEvents:EventType[] = [
  {
    id:uuidv4(),
    title: "ミーティング1",
    start: new Date(2023, 2, 21, 10, 0, 0),
    end: new Date(2023, 2, 21, 12, 0, 0),
    user:{ id:1, name:"テスト太郎" }
  },
  {
    id:uuidv4(),
    title: "ミーティング2",
    start: new Date(2023, 2, 22, 12, 0, 0),
    end: new Date(2023, 2, 22, 13, 0, 0),
    user:{ id:2, name:"テスト太郎" }
  },
  {
    id:uuidv4(),
    title: "ミーティング3",
    start: new Date(2023, 2, 22, 16, 0, 0),
    end: new Date(2023, 2, 22, 18, 0, 0),
    user:{ id:3, name:"テスト太郎" }
  },
  {
    id:uuidv4(),
    title: "ミーティング4",
    start: new Date(2023, 2, 29, 16, 0, 0),
    end: new Date(2023, 2, 29, 18, 0, 0),
    user:{ id:4, name:"テスト太郎" }
  },
  {
    id:uuidv4(),
    title: "ミーティング5",
    start: new Date(2023, 2, 30, 16, 0, 0),
    end: new Date(2023, 2, 30, 18, 0, 0),
    user:{ id:5, name:"テスト太郎" }
  },
  {
    id:uuidv4(),
    title: "ミーティング6",
    start: new Date(2023, 2, 30, 16, 0, 0),
    end: new Date(2023, 2, 30, 18, 0, 0),
    user:{ id:6, name:"テスト太郎" }
  },
]
