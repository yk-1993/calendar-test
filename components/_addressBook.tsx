import { TMP_USER_LIST, User } from "@/utils/constants";
import { Checkbox, Stack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { loginUserState, selectedAddressbookUserState } from "./atom";



const AddressBook:React.FC = () => {
    const [loginUser,] = useRecoilState(loginUserState);
    const [selectedAddressUserList, setSelectedAddressUserList] = useRecoilState(selectedAddressbookUserState);

    const [checkedItems, setCheckedItems] = useState<boolean[]>(
        TMP_USER_LIST.map((user) => selectedAddressUserList.some((selectedUser) => selectedUser.employeeId === user.employeeId))
      );
    //　ログインユーザーが変更された際にチェックボックスを更新する
    useEffect(()=>{
        setSelectedAddressUserList([loginUser]);
    },[loginUser])
    useEffect(()=>{
        setCheckedItems(TMP_USER_LIST.map((user) => selectedAddressUserList.some((selectedUser) => selectedUser.employeeId === user.employeeId)))
    },[selectedAddressUserList])
      
  const toggleCheckbox = (user:User,event:React.ChangeEvent<HTMLInputElement>,index:number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    const isChecked = event.target.checked;
    if(isChecked) {
        // チェックを入れた場合、該当ユーザのイベントを表示する
        setSelectedAddressUserList([...selectedAddressUserList,user]);
    }else{
        // チェックを外した場合、該当ユーザイベントを除外する
        const updatedAddressUserList = selectedAddressUserList.filter(
        (selectedUser) => selectedUser.employeeId !== user.employeeId
        );
    setSelectedAddressUserList(updatedAddressUserList);
    }
  };

    return (
      <>
            <Stack p={"0 0.5rem"} mt={1} spacing={1}>
                {TMP_USER_LIST.map((user, index) => (
                <Checkbox
                    p={"0.25rem 1rem"}
                    key={user.employeeId}
                    isChecked={checkedItems[index]}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => toggleCheckbox(user,e,index)}
                    _hover={{ backgroundColor:"#EAF6FF"}}
                    _checked={{ backgroundColor:"#EAF6FF"}}
                    disabled={loginUser.permissionLevel < user.permissionLevel}
                >
                    {user.name}
                </Checkbox>
                ))}
            </Stack>
      </>
    )
}

export default AddressBook;

