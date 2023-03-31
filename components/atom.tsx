import { defaultEvents, EventType, User } from '@/utils/constants'
import { atom } from 'recoil'
import { selector } from "recoil";

export const loginUserState = atom<User>({
    key: 'loginUserState',
    default: {
        employeeId: 3,
        name: '木村',
        permissionLevel:3,
    }
})

export const eventsState = atom<EventType[]>({
    key: 'eventsState',
    default: defaultEvents //　すべての社員のイベントスケジュールを取得する
})

//　ログインユーザー（自分）とアドレス帳でチェックした社員のイベントのみに絞る
export const filteredEventsState = selector<EventType[]>({
  key: "filteredEventsState",
  get: ({ get }) => {
    const events = get(eventsState);
    const selectedUsers = get(selectedAddressbookUserState);

    // チェックした社員のIDを配列にまとめる
    const visibleUserIds = [...selectedUsers.map(user => user.employeeId)];

    // イベントがチェックした社員に関連するかどうかを判断
    const isVisibleEvent = (event: EventType) => {
        // 作成者の employeeId が visibleUserIds に含まれているか確認
        const createdByVisibleUser = visibleUserIds.includes(event.user.employeeId);
    
        // イベントの参加者（guests）の中に、visibleUserIds に含まれる employeeId があるか確認
        const hasVisibleGuest = event.guests?.some((guest) => visibleUserIds.includes(guest.employeeId)) ?? false;
    
        // 作成者または参加者が visibleUserIds に含まれていれば、イベントを表示する
        return createdByVisibleUser || hasVisibleGuest;
    };
  
    // 関連するイベントのみをフィルタリングする
    return events.filter(isVisibleEvent);
  },
});

export const selectedAddressbookUserState = atom<User[]>({
    key: 'selectedAddressbookUserState',
    default: selector({
      key: 'selectedAddressbookUserDefault',
      get: ({ get }) => {
        const loginUser = get(loginUserState);
        return [loginUser];
      },
    }),
  });