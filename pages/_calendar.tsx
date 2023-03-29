import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ja"; // 日本語ロケールをインポート
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@chakra-ui/react";
import { Event } from "react-big-calendar";
import styled from "styled-components";

// momentのデフォルトロケールを日本語に設定
moment.locale("ja");
const localizer = momentLocalizer(moment);

type EventType =  Event & {
  user?: string;
};
type MyCalendarProps = {
  events: Array<Event>;
}

// イベント押下時
const handleSelectEvent = (event:EventType) => {
  alert(`ユーザー：${event.user}\nタイトル: ${event.title}\n開始日時: ${event.start}\n終了日時: ${event.end}`);
};
// イベントの表示
const eventTemplate = ({ event }: { event: EventType }) => (
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

const MyCalendar: React.FC<MyCalendarProps> = ({ events }) => (
  <>
    <CalendarWrap h={"100vh"} w={"100vw"} p={30}>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        events={events}
        step={30} 
        timeslots={2}
        defaultView="month"
        views={["month", "week", "day"]}
        toolbar
        formats={{
          dayFormat: "ddd",
          weekdayFormat: "ddd",
          dayHeaderFormat: "M月 D日 (ddd)",
        }}
        messages={messages}
        onSelectEvent={(e)=> handleSelectEvent(e)} // 選択されたイベントの情報をアラートで表示
        components={{
          event: eventTemplate // カレンダーの表示テンプレートをカスタマイズ
        }}
      />
    </CalendarWrap>
  </>
);
export default MyCalendar;


const CalendarWrap = styled(Box)`
color:rgb(60,64,67);
font-family: Roboto,Arial,sans-serif;

.rbc-date-cell {
  text-align: center;
}
.rbc-header {
  border-bottom:none;
}
`;