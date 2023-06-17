import { GridItemType } from '../../types/GridItemType'
import * as k from './styles'

import b7svg from '../../svgs/b7.svg'
import {items} from '../../data/items'

type Props = {
    item: GridItemType;
    onClick: () => void
}


export const GridItem = ({item, onClick}: Props) =>{
    return (
        <k.Container
        showBackground={item.permanentShown || item.shown}
        onClick={onClick} >
            {item.permanentShown ===false &&
            item.shown == false &&
                <k.Icon opacity={.1} src={b7svg} alt=''/>
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <k.Icon  src={items[item.item].icon} alt=" "  />
            
            }
        </k.Container>
    )
}