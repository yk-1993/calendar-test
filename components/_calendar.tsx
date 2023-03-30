import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ja"; // 日本語ロケールをインポート
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Event } from "react-big-calendar";
import styled from "styled-components";
import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { defaultEvents, EventType, User } from "@/utils/constants";
import RegisterMeeting from "./modal/_registerMeeting";
import EditMeeting from "./modal/_editMeeting";

const DnDCalendar = withDragAndDrop(Calendar)
// momentのデフォルトロケールを日本語に設定
moment.locale("ja");
const localizer = momentLocalizer(moment);

// イベントの表示
const eventTemplate = ({ event }: { event: Event }) => (
  <div>
    <div>{event.title}</div>
  </div>
);
const messages = {
  previous: '前へ',
  next: '次へ',
  today: '今日',
  month: '月',
  week: '週',
  day: '日',
  agenda: '予定表',
  date: '日付',
  time: '時間',
  event: 'イベント',
};


const NOW_DATE = new Date();
const NOW_DATE_1HOUR_AGO = new Date(NOW_DATE.getTime() + (60 * 60 * 1000));
const ONE_DAY_TIME = 60 * 60* 24000;

const MyCalendar: React.FC = () => {
  const [clickPositon, setClickPosition] = useState<{ x:number,y:number }>({ x:0,y:0 });
  const adjustX = 550;
  const adjustY = 150;
  const [events, setEvents] = useState<EventType[]>(defaultEvents);
  const [selectSlot, setSelectSlot] = useState<SlotInfo | null>(null);
  const [meetingStartDate, setMeetingStartDate] = useState<Date>(NOW_DATE);
  const [meetingEndDate, setMeetingEndDate] = useState<Date>(NOW_DATE_1HOUR_AGO); 
  // モーダル
  const registerMeetingModal = useDisclosure();
  const editMeetingModal = useDisclosure();
  // 編集画面
  const [editMeetingId, setEditMeetingId] = useState<string>("");
  const [editMeetingUser, setEditMeetingUser] = useState<User>();
  const [editMeetingGuests, setEditMeetingGuests] = useState<User[]>();
  const [editMeetingDescription, setEditMeetingDescription] = useState<string>("");
  const [editMeetingLocation, setEditMeetingLocation] = useState<string>("");

  const handleEventDrop = (event:  EventInteractionArgs<object>) => {
    // console.log(event)
    // const { event: eventObject, start, end } = event;
    // const updatedEvent = eventObject as EventType;
    // // イベントの新しい開始日時と終了日時を設定
    // updatedEvent.start = start as Date;
    // updatedEvent.end = end as Date;
  
  };
  const handleSelectSlot = (slotInfo:SlotInfo) => {
    if(!slotInfo.box)return;
    setSelectSlot(slotInfo);
    setClickPosition({ x: slotInfo.box.x - adjustX, y: slotInfo.box.y - adjustY });
    setMeetingStartDate(new Date(slotInfo.end.getTime() - (ONE_DAY_TIME) + (60 * 60 * 9000)));
    setMeetingEndDate(new Date(slotInfo.end.getTime() - (ONE_DAY_TIME) + (60 * 60 * 10000)));
    registerMeetingModal.onOpen();
    };
    // イベント押下時
const handleSelectEvent = (event:EventType) => {
  setEditMeetingId(event.id)
  setMeetingStartDate(event.start!)
  setMeetingEndDate(event.end!)
  if(event.user)setEditMeetingUser({id:event.user?.id, name:event.user?.name})
  if(event.guests)setEditMeetingGuests(event.guests)
  if(event.description)setEditMeetingDescription(event.description)
  if(event.location)setEditMeetingLocation(event.location)
  editMeetingModal.onOpen();

};
return(
  <>
    <CalendarWrap h={"100vh"} w={"100vw"} p={30}>
      <DnDCalendar
        localizer={localizer}
        draggableAccessor={(event) => true}
        onEventDrop={handleEventDrop}
        style={{ height: "100%" }}
        events={events}
        step={30} 
        timeslots={2}
        defaultView="month"
        views={["month", "week", "day"]}
        toolbar
        formats={{
          dayFormat: "d",
          weekdayFormat: "ddd",
          dayHeaderFormat: "M月 D日 (ddd)",
          monthHeaderFormat: "YYYY年 M月"
        }}
        messages={messages}
        onSelectEvent={(e)=> handleSelectEvent(e)}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        components={{
          event: eventTemplate // カレンダーの表示テンプレートをカスタマイズ
        }}
      />
    </CalendarWrap>
      <RegisterMeeting
        isOpen={registerMeetingModal.isOpen}
        onClose={registerMeetingModal.onClose}
        clickPosition={clickPositon}
        setEvents={setEvents}
        slotInfo={selectSlot}
        events={events}
        meetingStartDate={meetingStartDate}
        setMeetingStartDate={setMeetingStartDate}
        meetingEndDate={meetingEndDate}
        setMeetingEndDate={setMeetingEndDate}
      />
      <EditMeeting
        isOpen={editMeetingModal.isOpen}
        onClose={editMeetingModal.onClose}
        id={editMeetingId}
        user={editMeetingUser}
        guests={editMeetingGuests}
        start={meetingStartDate}
        end={meetingEndDate}
        location={editMeetingLocation}
        description={editMeetingDescription} />
  </>
  )
}
export default MyCalendar;


const CalendarWrap = styled(Box)`
color:rgb(60,64,67);
font-family: Roboto,Arial,sans-serif;

.rbc-date-cell {
  text-align: center;
}
.rbc-header {
  font-weight: normal;
  padding-top:0.5rem;
  border-bottom:none;
  font-size:0.8rem;
}
// イベント
.rbc-event, .rbc-day-slot .rbc-background-event {
    padding: 5px;
    font-size: 0.8rem;
}
.rbc-toolbar-label {
  font-size:1.5rem;
}
`;