import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ja"; // 日本語ロケールをインポート
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@chakra-ui/react";
import { Event } from "react-big-calendar";
// momentのデフォルトロケールを日本語に設定
moment.locale("ja");
const localizer = momentLocalizer(moment);

type EventType =  Event & {
  user?: string;
};
type MyCalendarProps = {
  events: Array<Event>;
}
const handleSelectEvent = (event:EventType) => {
  alert(`ユーザー：${event.user}\nタイトル: ${event.title}\n開始日時: ${event.start}\n終了日時: ${event.end}`);
};
const eventTemplate = ({ event }: { event: EventType }) => (
  <div>
    <div>{event.title}</div>
  </div>
);

const MyCalendar: React.FC<MyCalendarProps> = ({ events }) => (
  <>
    <Box h={"100vh"} w={"100vw"} p={30}>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        events={events}
        step={30} 
        timeslots={2}
        defaultView="week"
        views={["month", "week", "day"]}
        toolbar
        formats={{
          dayFormat: "ddd",
          weekdayFormat: "ddd",
          dayHeaderFormat: "M月 D日 (ddd)",
        }}
        onSelectEvent={(e)=> handleSelectEvent(e)} // 選択されたイベントの情報をアラートで表示
        components={{
          event: eventTemplate // カレンダーの表示テンプレートをカスタマイズ
        }}
      />
    </Box>
  </>
);
export default MyCalendar;
