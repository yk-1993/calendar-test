import { TMP_USER_LIST } from "@/utils/constants"
import {
    useDisclosure,
    MenuItem,
    Menu,
    MenuButton,
    MenuList,
    useColorModeValue,
    MenuDivider,
    MenuGroup,
    useToast,
} from "@chakra-ui/react"
import { IconContext } from "react-icons"
import { FaUserCircle } from "react-icons/fa"
import { useRecoilState } from 'recoil';
import { loginUserState } from "./atom";

const HoverMenu:React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
   const [,setLoginUser] = useRecoilState(loginUserState);

    const onChangeLoginUser = (employeeId:number) => {
        const changeUser = TMP_USER_LIST.find((user)=> user.employeeId === employeeId);
        if(changeUser){
            setLoginUser(changeUser);
            toast({
                title:`ユーザーを ${changeUser.name} さんに切り替えました`,
                duration:3000,
                position:'top',
                status: 'success',
                isClosable:true
            })
            onClose();
        }else{
            toast({
                title:`ユーザー切り替えに失敗しました`,
                duration:3000,
                position:'top',
                status: 'error',
                isClosable:true
            })
            onClose();
        }
    }
    return (
        <Menu isOpen={isOpen}>
            <MenuButton
                mx={1}
                py={[1, 2, 2]}
                px={2}
                borderRadius={10}
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                aria-label="Courses"
                fontWeight="normal"
                onMouseEnter={onOpen}
                onClick={onClose}
            >
            <IconContext.Provider value={{ size: '24px' }}>
                <FaUserCircle />
            </IconContext.Provider>
            </MenuButton>
            <MenuList zIndex={30} onMouseLeave={onClose}>
                <MenuGroup title="ログインユーザー切替（テスト用）">
                    {TMP_USER_LIST.map((user)=>(
                        <MenuItem _hover={{ backgroundColor:"#EAF6FF"}} key={user.employeeId} onClick={()=> onChangeLoginUser(user.employeeId)}>{user.name}</MenuItem>
                    ))}
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}

export default HoverMenu;