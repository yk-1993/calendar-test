import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo, ToolbarProps } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ja"; // 日本語ロケールをインポート
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Event } from "react-big-calendar";
import styled from "styled-components";
import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { defaultEvents, EventType, User } from "@/utils/constants";
import RegisterMeeting from "./modal/_registerMeeting";
import EditMeeting from "./modal/_editMeeting";
import CustomToolbar from "./_customToolbar";
import Sidebar from "./_sidebar";
import { useRecoilState,useRecoilValue } from 'recoil'
import { eventsState, filteredEventsState } from "./atom";

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
  today:"今日",
  next:"次へ",
  prev:"前へ",
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

const INIT_USER = { name:"",employeeId: 0, permissionLevel: 0} ;
const INIT_EVENT = { id:"",user: INIT_USER };

const MyCalendar: React.FC = () => {
  const [clickPositon, setClickPosition] = useState<{ x:number,y:number }>({ x:0,y:0 });
  const [events, setEvents] = useRecoilState<EventType[]>(eventsState);
  const filteredEvents = useRecoilValue(filteredEventsState);
  const [selectSlot, setSelectSlot] = useState<SlotInfo | null>(null);
  const [meetingStartDate, setMeetingStartDate] = useState<Date>(NOW_DATE);
  const [meetingEndDate, setMeetingEndDate] = useState<Date>(NOW_DATE_1HOUR_AGO); 
  // モーダル
  const registerMeetingModal = useDisclosure();
  const editMeetingModal = useDisclosure();
  // クリックした位置からのモーダル表示位置調整
  const adjustX = 550;
  const adjustY = 150;
  // 編集画面
  const [editEvent, setEditEvent] = useState<EventType>(INIT_EVENT);

  const handleEventDrop = (event: EventInteractionArgs<object>) => {
    const { event: eventObject, start, end } = event;
    const originalEvent = eventObject as EventType;
    // ドロップしたイベントの新しい開始日時と終了日時を設定
    const updatedEvent: EventType = {
      ...originalEvent,
      start: start as Date,
      end: end as Date,
    };
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
  );
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
  const handleSelectEvent = (eventObject:object) => {
    const event = eventObject as EventType;

    const updateEditEvent:EventType = {
      id:event.id,
      start:event.start,
      end:event.end,
      user:{ employeeId:event.user.employeeId, name:event.user.name,permissionLevel:event.user.permissionLevel },
      guests:event.guests,
      description:event.description,
      location:event.location,
    }
    setEditEvent(updateEditEvent);
    // イベント編集モーダルを開く
    editMeetingModal.onOpen();
  };
  const initEditEvent = () => setEditEvent(INIT_EVENT);
return(
  <>
    <Flex flexDirection="column" h="100vh" w="100vw">
        <Flex flex="1">
          <Sidebar />
        <CalendarWrap h={"100vh"} w={"100vw"} p={"1rem 2rem"}>
          <DnDCalendar
            localizer={localizer}
            onEventDrop={handleEventDrop}
            draggableAccessor={() => true}
            style={{ height: "100%" }}
            events={filteredEvents}
            step={30} 
            timeslots={2}
            defaultView="month"
            views={["month", "week", "day"]}
            toolbar
            formats={{
              dateFormat: "D",
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
              event: eventTemplate, // カレンダーの表示テンプレートをカスタマイズ
              toolbar: CustomToolbar
            }}
          />
        </CalendarWrap>
        </Flex>
      </Flex>
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
        editEvent={editEvent}
        initEditEvent={initEditEvent}
         />
  </>
  )
}
export default MyCalendar;


const CalendarWrap = styled(Box)`
color:rgb(60,64,67);
font-family: Roboto,Arial,sans-serif;

.rbc-date-cell {
  text-align: center;
  padding-right: 0;
}
.rbc-header {
  
  font-weight: normal;
  border-bottom: none;
  padding-top: 0.12rem; 
  padding-bottom: 0.12rem;
  font-size: 0.8rem; 
}
// イベント
.rbc-event, .rbc-day-slot .rbc-background-event {
  padding: 5px;
  font-size: 0.8rem;
}
.rbc-toolbar-label {
  font-size: 1.5rem;
}
.rbc-row-content {
  padding-top: 0.25rem; 
}
.rbc-event, .rbc-day-slot .rbc-background-event {
  background-color: #039BE5;
}

`;

