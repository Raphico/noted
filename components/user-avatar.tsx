import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Icons } from "./icons"

interface UserAvatarProps extends AvatarProps {
   user: Pick<User, "image" | "name">
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
   return (
      <Avatar {...props}>
         {user?.image ? (
            <AvatarImage src={user.image} alt="Profile" />
         ) : (
            <AvatarFallback>
               <p className="sr-only">{user.name}</p>
               <Icons.user className="h-4 w-4" aria-hidden="true" />
            </AvatarFallback>
         )}
      </Avatar>
   )
}

export default UserAvatar
