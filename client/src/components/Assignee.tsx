import { AvatarGroup, Avatar } from '@mui/material'
import type { UserType } from './utils/types'

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name: string) {
    if (name.split(' ').length < 2) {
        return {
            sx: {
                width: 30, height: 30, fontSize: 14,
            },
        }
    }

    return {
        sx: {
			width: 30, height: 30, fontSize: 14,
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const Assignee = ({ users }: { users: UserType[] }) => {
    return (
        <AvatarGroup max={6} sx={{ justifyContent: "start" }}>
            {users.map((user, userIdx) => (
                <Avatar key={userIdx}  
                {...stringAvatar(user.name)}></Avatar>
            ))}
        </AvatarGroup>
    )
}

export default Assignee