import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { Box } from "@chakra-ui/react";
import styled from "styled-components";
import { ja } from "date-fns/locale";

type DateTimePickerProps = {
    meetingStartDate:Date;
    meetingEndDate:Date;
    setMeetingStartDate:React.Dispatch<React.SetStateAction<Date>>;
    setMeetingEndDate:React.Dispatch<React.SetStateAction<Date>>;
    isStartDateTime: boolean;
}
const DateTimePicker:React.FC<DateTimePickerProps> = (props) => {
  const { isStartDateTime, meetingStartDate, meetingEndDate, setMeetingStartDate, setMeetingEndDate } = props

  const onChangeStartDate = (selectStartDate: Date) => {
    // 開始時刻
    setMeetingStartDate(selectStartDate);
    // 終了時刻は開始時刻の1時間後に設定
    setMeetingEndDate(new Date(selectStartDate.getTime() + (60 * 60 * 1000)));
  }
  return (<>
    <DateTimePickerWrap w={"fit-content"}>
        {isStartDateTime ? 
        <DatePicker
            selected={meetingStartDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="M月 d日(EEEE) H:mm"
            timeCaption="時間"
            locale={ja}
            onChange={(date: Date)=> onChangeStartDate(date)}
        />
        :
        <DatePicker
            selected={meetingEndDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="M月 d日(EEEE) H:mm"
            timeCaption="時間"
            locale={ja}
            onChange={(date: Date)=> setMeetingEndDate(date)}
        />
        }
    </DateTimePickerWrap>
    </>
  );
};

export default DateTimePicker;

const DateTimePickerWrap = styled(Box)`
.react-datepicker {
    border:3px solid #FFF;
    color:#70757a;
    padding:1rem;
    border-radius: 0;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);
}
.react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
    color:rgb(60,64,67);
}
.react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
    margin-bottom:5px;
}
.react-datepicker__input-container input {
    text-align:center;
    outline:none;
}
.react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
  border-radius: 10rem;
}
.react-datepicker__header {
    background-color: #FFF;
    border-bottom: none;
}
.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::after, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after {
    display: none;
}
// 日付コンテナ
.react-datepicker__month-container {
  border-right:1px solid rgba(95,99,104,0.2);
}
// 時間コンテナ
.react-datepicker__time-container {
  border-left:none;
}

.react-datepicker__navigation {
    top:22px;
}
.react-datepicker__navigation--previous {
    left: 40px;
}
.react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 125px;
}
.react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range {
    color: rgb(24,90,188) !important;
    background-color: #D2E3FC;
    border-radius: 10rem;
}
.react-datepicker-ignore-onclickoutside{
  border-bottom:2px solid rgb(26,115,232);
}
// 時間の スクロールバー
.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
/* Webkit */
&::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: #f0f0f0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #858585;
    border: 2.5px solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar-thumb:hover {
    border: 1px solid transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-button {
    height: 2px;
    background-color: transparent;
  }
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #858585;
}
`;