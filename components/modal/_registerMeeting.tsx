import { EventType, options, User } from '@/utils/constants';
import { Box, Button, VStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, HStack, Flex, Text, Textarea, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { SlotInfo } from 'react-big-calendar';
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from '../_dateTimePicker';
import { IconContext } from 'react-icons';
import { MdAccessTime, MdOutlinePeopleAlt,MdOutlineLocationOn,MdNotes } from "react-icons/md";
import { MultiValue, Select } from 'chakra-react-select';
import { v4 as uuidv4 } from 'uuid';

type RegisterMeetingProps = {
    isOpen: boolean;
    onClose: () => void;
    clickPosition?: { x: number; y: number };
    events:EventType[];
    setEvents:React.Dispatch<React.SetStateAction<EventType[]>>
    slotInfo:SlotInfo | null;
    meetingStartDate:Date;
    meetingEndDate:Date;
    setMeetingStartDate:React.Dispatch<React.SetStateAction<Date>>;
    setMeetingEndDate:React.Dispatch<React.SetStateAction<Date>>;
}

const RegisterMeeting:React.FC<RegisterMeetingProps> = (props) => {
    const { isOpen, onClose, clickPosition, events, setEvents, slotInfo,
            meetingStartDate, meetingEndDate, setMeetingStartDate, setMeetingEndDate } = props;
    const positonX = clickPosition && clickPosition?.x < 0 ? 10 : clickPosition?.x;
    const positonY = clickPosition && clickPosition?.y < 0 ? 10 : clickPosition?.y;
    const [isFocused, setIsFocused] = useState(false);
    const [meetingTitle, setMeetingTitle] = useState<string>(''); 
    const [meetingLocation, setMeetingLocation] = useState<string>(''); 
    const [meetingDescription, setMeetingDescription] = useState<string>(''); 
    const [meetingGuest, setMeetingGuest] = useState<Array<User>>([]); 
    const toast = useToast()

    // 参加者セレクトが変更時にステートを更新
    const handleChangeSelect = (selectedOptions:MultiValue<{
        value: string;
        label: string;
    }>) => {
        const updatedOptions = selectedOptions.map((options)=>{
            return { id:0,name: options.label }
        })
        if (selectedOptions) {
          setMeetingGuest(updatedOptions);
        } else {
          setMeetingGuest([]);
        }
      };
      const onSubmit = () => {
        // バリデーション
        const validationResult = validation();
        if(!validationResult.valid){
            toast({
                title:validationResult.errMsg,
                status:"error",
                duration:3000,
                isClosable:true,
                position:'top'
            })
            return;
        }
        const addEvent: EventType = {
            id: uuidv4(),
            user: { name:"テスト太郎1",id:10 },
            title:meetingTitle,
            start: meetingStartDate,
            end: meetingEndDate,
            location: meetingLocation,
            guests: meetingGuest,
            description: meetingDescription
        };
        const updatedEvent = [...events,addEvent];
        setEvents(updatedEvent);
        onClose();
      }

    type ValidationResult = {
        valid: boolean;
        errMsg?: string;
    }
    const validateStringIsEmpty = (string:string): boolean => string.trim() === "";
    const validation = ():ValidationResult =>{
        if(validateStringIsEmpty(meetingTitle)){
            return { valid:false, errMsg: "タイトルを入力してください"}
        }
        // if(validateStringIsEmpty(meetingLocation)){
        //     return { valid:false, errMsg: "場所を入力してください"}
        // }
        return { valid:true }
    }

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
          <ModalContentStyle x={positonX} y={positonY}>
            <ModalHeader
                borderRadius={".5rem .5rem 0rem 0 !important"}
                bgColor={"rgb(241,243,244)"}
                p={"1.5rem"}>
                    <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
                <VStack p={"1rem"}>
                    <Box pl={10} w={"100%"}>
                        <Input
                            size={"lg"}
                            onChange={(e)=> setMeetingTitle(e.target.value)}
                            variant='flushed'
                            placeholder='タイトルと日時を追加' />
                    </Box>
                </VStack>
                <VStack mt={2} spacing={4} alignItems={'normal'}>
                    <Flex>
                        <IconContext.Provider value={{size:"25px",color:"rgb(95,99,104)"}}>
                            <MdAccessTime />
                        </IconContext.Provider>
                        <Flex justifyContent={"center"} w={"100%"}>
                            <DateTimePicker
                                    meetingStartDate={meetingStartDate}
                                    setMeetingStartDate={setMeetingStartDate}
                                    meetingEndDate={meetingEndDate}
                                    setMeetingEndDate={setMeetingEndDate}
                                    isStartDateTime />
                                <Text m={"0 1rem"}>-</Text>
                            <DateTimePicker
                                    meetingStartDate={meetingStartDate}
                                    setMeetingStartDate={setMeetingStartDate}
                                    meetingEndDate={meetingEndDate}
                                    setMeetingEndDate={setMeetingEndDate}
                                    isStartDateTime={false} />
                        </Flex>
                    </Flex>
                    <InputWrapStyle>
                        <IconContext.Provider value={{size:"25px",color:"rgb(95,99,104)"}}>
                            <MdOutlinePeopleAlt />
                        </IconContext.Provider>
                        <Box w={"100%"}>
                            <Select
                                isMulti
                                onChange={(e)=> handleChangeSelect(e)}
                                variant={"filled"}
                                options={options}
                                closeMenuOnSelect={false}
                                placeholder='参加者を追加' />
                        </Box>
                    </InputWrapStyle>
                    <InputWrapStyle>
                        <IconContext.Provider value={{size:"25px",color:"rgb(95,99,104)"}}>
                            <MdOutlineLocationOn />
                        </IconContext.Provider>
                        <Box w={"100%"}>
                            <Input
                                variant={"outline"}
                                onChange={((e)=> setMeetingLocation(e.target.value))}
                                placeholder='場所を追加' />
                        </Box>
                    </InputWrapStyle>
                    <InputWrapStyle>
                        <IconContext.Provider value={{size:"25px",color:"rgb(95,99,104)"}}>
                            <MdNotes />
                        </IconContext.Provider>
                        <Box w={"100%"}>
                        <Textarea
                            variant="filled"
                            placeholder="説明を追加"
                            onChange={((e)=> setMeetingDescription(e.target.value))}
                            onFocus={()=> setIsFocused(true)}
                            onBlur={()=>  setIsFocused(false)}
                            />
                        </Box>
                    </InputWrapStyle>
                </VStack>
            </ModalBody>
            
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                onClick={onSubmit}
                colorScheme='blue' mr={3}>
                保存
              </Button>
            </ModalFooter>
          </ModalContentStyle>
        </Modal>
      </>
    )
  }

export default RegisterMeeting;

const ModalContentStyle = styled(ModalContent)<{ x?: number; y?: number }>`
    border: 1px solid #fefefe;
    position: absolute !important;
    border-radius:0.5rem !important;
    box-shadow: 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12), 0 11px 15px -7px rgba(0,0,0,.2) !important;
    ${({ x, y }) =>
    x !== undefined && y !== undefined
      ? `
        left: ${x}px;
        top: ${y}px;
        transform: translate(-100%, 0);
        `
      : ""}
`;

const InputWrapStyle = styled(Flex)`
    align-items:center;
    gap: 0 1.5rem;
`;