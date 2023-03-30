import { Modal, ModalContent, Button, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import { EventType } from '../../utils/constants';

type EditMeetingType = EventType & {
    isOpen: boolean;
    onClose: () => void;
}
const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'short',
  };
const EditMeeting:React.FC<EditMeetingType> = (props) => {
    const { isOpen, onClose, start, end, id, user, location, guests, description } = props;
return(
<>
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
    <ModalContent>
    <ModalHeader
        borderRadius={".5rem .5rem 0rem 0 !important"}
        bgColor={"rgb(241,243,244)"}
        p={".5rem 1.5rem"}>
            ミーティング情報
            <ModalCloseButton />
    </ModalHeader>
    <ModalBody>
        <Text>主催者： {user?.name}</Text>
        <Text>開始時刻: {start?.toLocaleDateString("ja-jp")}</Text>
        <Text>終了時刻: {end?.toLocaleDateString("ja-jp")}</Text>
        <Text>参加者: {guests?.map((guest)=> guest.name) || "なし"}</Text>
        <Text>場所: {location || "未設定"}</Text>
        <Text>説明: {description || "なし"}</Text>
    </ModalBody>
    
    <ModalFooter>
        <Button colorScheme="gray" mr={3} onClick={onClose}>
            キャンセル
        </Button>
    </ModalFooter>
    </ModalContent>
    </Modal>
</>);
};
export default EditMeeting;