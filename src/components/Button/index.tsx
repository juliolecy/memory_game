import * as k from './styles'

type Props = {
    label: string;
    icon: any;
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Button = ({label, icon, onClick}: Props) =>{
    return (
        <k.Container onClick={onClick}>
            {icon && 
            <k.IconArea>
                <k.Icon src={icon}/>
            </k.IconArea>
}
            <k.Label>{label}</k.Label>
        </k.Container>
    )
}