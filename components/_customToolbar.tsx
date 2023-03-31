import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Navigate, ToolbarProps } from 'react-big-calendar';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { loginUserState } from './atom';
import Navbar from './_hoverMenu';
import HoverMenu from './_hoverMenu';

const messages = {
  today: '今日',
  month: '月',
  week: '週',
  day: '日',
  agenda: '予定表',
  date: '日付',
  time: '時間',
  event: 'イベント',
};

const CustomToolbar: React.FC<ToolbarProps> = ({ onNavigate, onView, label }) => {
   const [loginUser,] = useRecoilState(loginUserState);
  return (
    <Flex justifyContent={"space-between"} mb={5} alignItems={"center"}>
    <Flex gap={"0 0.5rem"}>
        <Button onClick={() => onNavigate(Navigate.TODAY)}>
          {messages.today}
        </Button>
        <CustomButton onClick={() => onNavigate(Navigate.PREVIOUS)}>
          <IconContext.Provider value={{ size: '24px' }}>
            <MdChevronLeft />
          </IconContext.Provider>
        </CustomButton>
        <CustomButton onClick={() => onNavigate(Navigate.NEXT)}>
          <IconContext.Provider value={{ size: '24px' }}>
            <MdChevronRight />
          </IconContext.Provider>
        </CustomButton>
        <Text fontSize={"1.5rem"} display={"inline"} alignSelf={"center"}>
            {label}
        </Text>
      </Flex>
      <Flex gap={"0 0.5rem"} alignItems={"center"}>
        <Text>ログイン中のユーザー：{loginUser.name} さん</Text>
        <Box>
            <HoverMenu />
        </Box>
        <Text mr={10}>Permission level:{loginUser.permissionLevel}</Text>
        <Button onClick={() => onView("month")}>
          {messages.month}
        </Button>
        <Button onClick={() => onView("week")}>
          {messages.week}
        </Button>
        <Button onClick={() => onView("day")}>
          {messages.day}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CustomToolbar;

const CustomButton = styled(Button)`
    background-color: #FFF !important;
    padding:0 !important;
    border-radius: 100px !important;
    &:hover {
        background-color: #EDF2F7 !important;
    }
`;
