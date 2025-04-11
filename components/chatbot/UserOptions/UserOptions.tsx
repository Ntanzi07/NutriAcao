import React, { useState } from 'react'
import UserPage from './UserPage'
import { Separator } from 'radix-ui'
import UserConfig from './UserConfig'
import UserCalculator from './UserCalculator'

type Props = {}

const UserOptions = (props: Props) => {
    const items = [
        { name: 'Dashboard', page: <UserPage />, text: <>Seu <strong>Dashboard</strong></> },
        { name: 'Calculadora', page: <UserCalculator />, text: <>Calculadora de <strong>Macro e calorias</strong></> },
        { name: 'Configurações', page: <UserConfig />, text: <>Suas <strong>Configurações</strong></> },
    ];
    const [actived, setActived] = useState(items[0]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setActived(items.find(item => item.name === e.currentTarget.innerText) || items[0]);
    }

    return (
        <div className='flex gap-1'>
            <div className='flex flex-col gap-2 min-h-[400px] min-w-[250px] px-5 py-3'>
                <h3 className='text-[1.3em]'>{actived.text}</h3>
                <Separator.Root
                    className="h-[1px] w-auto bg-secondary-color"
                    decorative
                    orientation="horizontal"
                />
                {items.map((item, index) => (
                    <button id={item.name} onClick={handleClick} key={index} className={`userOptionButton 
                        ${actived.name === item.name
                            ? 'hidden'
                            : 'inline'}`
                    }>
                        {item.name}
                    </button>
                ))}
            </div>
            <Separator.Root
                className="h-auto w-[1px] bg-secondary-color"
                decorative
                orientation="vertical"
            />
            {items.find(item => item.name === actived.name)?.page}
        </div>
    )
}

export default UserOptions