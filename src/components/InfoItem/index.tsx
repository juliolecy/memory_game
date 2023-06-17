import * as k from './styles'

type Props = {
    label: string;
    value: string;
}
export const InfoItem = ({label, value}: Props) =>{
    return (

        <k.Container>
            <k.Label>{label}</k.Label>
            <k.Value>{value}</k.Value>


        </k.Container>

    )
}