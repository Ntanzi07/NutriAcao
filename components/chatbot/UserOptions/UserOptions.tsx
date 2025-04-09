import React from 'react'
import UserPage from './UserPage'
import { Avatar, Dialog, Separator } from 'radix-ui'
import { Id } from '@/convex/_generated/dataModel'

type Props = {
    user: {
        _id: Id<"users">;
        _creationTime: number;
        email: string;
        username: string;
        imageUrl: string;
        clerkId: string;
    } | null | undefined
}

const UserOptions = (props: Props) => {
    return (
        <div className='flex gap-1'>
            <div className='flex flex-col gap-2 h-[400px] px-5 py-3'>
                <div className='flex items-center gap-2'>
                    <Avatar.Root className="AvatarRoot">
                        <Avatar.Image
                            className="AvatarImage"
                            src={props.user?.imageUrl}
                            alt={props.user?.username}
                        />
                        <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                            {props.user?.username.charAt(0)}
                        </Avatar.Fallback>
                    </Avatar.Root>
                    <Dialog.DialogTitle className='text-[1.2em]'>{props.user?.username}</Dialog.DialogTitle>
                </div>
                <Separator.Root
                    className="h-[1px] w-auto bg-secondary-color"
                    decorative
                    orientation="horizontal"
                />
                <div className='w-full flex'>
                    <button className=''>teste</button>
                </div>
                <div className='w-full flex'>
                    <button className=''>teste</button>
                </div>
                <div className='w-full flex'>
                    <button className=''>teste</button>
                </div>

            </div>
            <Separator.Root
                className="h-auto w-[1px] bg-secondary-color"
                decorative
                orientation="vertical"
            />
            <UserPage />
        </div>
    )
}

export default UserOptions