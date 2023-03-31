import { Modal, ModalContent, Button, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import { EventType } from '../../utils/constants';
import type { DateTimeFormatOptions } from 'intl';

type EditMeetingType = {
    editEvent: EventType,
    initEditEvent: () => void,
    isOpen: boolean;
    onClose: () => void;
}
const options: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'short',
  };
  
const EditMeeting:React.FC<EditMeetingType> = (props) => {
    const { isOpen, onClose, editEvent,initEditEvent } = props;

    const onCloseEditEventModal = () => {
        initEditEvent();
        onClose();
    }
return(
<>
    <Modal isOpen={isOpen} onClose={onCloseEditEventModal} isCentered size={"lg"}>
    <ModalContent>
    <ModalHeader
        borderRadius={".5rem .5rem 0rem 0 !important"}
        bgColor={"rgb(241,243,244)"}
        p={".5rem 1.5rem"}>
            ミーティング情報
            <ModalCloseButton />
    </ModalHeader>
    <ModalBody>
        <Text>主催者： {editEvent.user.name}</Text>
        <Text>開始時刻: {editEvent.start?.toLocaleDateString("ja-jp", options)}</Text>
        <Text>終了時刻: {editEvent.end?.toLocaleDateString("ja-jp", options)}</Text>
        <Text>参加者: {editEvent.guests?.map((guest) => guest.name).join(", ") || "なし"}</Text>
        <Text>場所: {editEvent.location || "未設定"}</Text>
        <Text>説明: {editEvent.description || "なし"}</Text>
    </ModalBody>
    <ModalFooter>
        <Button colorScheme="gray" mr={3} onClick={onCloseEditEventModal}>
            キャンセル
        </Button>
        <Button colorScheme="blue" mr={3}>
            編集
        </Button>
    </ModalFooter>
    </ModalContent>
    </Modal>
</>);
};
export default EditMeeting;