
import { use, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import type { IUser } from "../../types/types";
import { useUserStore } from "../../store/userStore";

type Props = {
  getUsersData: Promise<{ data : IUser[] }>;
};

const UserSelection = ({ getUsersData } : Props) => {
  const { data: users = [] } = use(getUsersData)
  const setUser = useUserStore(state => state.setUser)
  const user = useUserStore(state => state.user)

  const handleSelection = (value : string) => {
    const selectedUser = users.find(item => item.uuid === value)
    if(selectedUser) {
      setUser(selectedUser)
    }
  }

  useEffect(() => {
    if(users?.length > 0){
      setUser(users[0])
    }
  }, [users])

  return (
    <Select value={user?.uuid} onValueChange={handleSelection}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Users</SelectLabel>
          {users.map(user => <SelectItem key={user.id} value={user.uuid}>{user.name}</SelectItem> )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
};

export default UserSelection;