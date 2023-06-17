import { useEffect, useState } from 'react'
import * as k from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import RestartIcon from './svgs/restart.svg'
import { GridItemType } from './types/GridItemType'
import {items} from './data/items.ts'
import { GridItem } from './components/GridItem/index.tsx'
const App = () =>{

  const[playing, setPlaying]=useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(()=> handleResetGame(), []);

  const handleResetGame = () =>{
    // Reset
    setTimeElapsed(0);
    setMoves(0);
    setShowCount(0);
    // Create Grid
    setGridItems([]);
    let tmpGrid: GridItemType[]=[];
    for(let i=0; i < (items.length * 2); i++){
      tmpGrid.push({
        item:null,
        shown:false,
        permanentShown:false
      })
    }

      for(let w = 0; w<2; w++){
        for(let i = 0; i<items.length; i++){
          let pos = -1;
          while(pos < 0 || tmpGrid[pos].item !== null){
            pos = Math.floor(Math.random()*(items.length*2));
          } 
          tmpGrid[pos].item = i

          

          }
        }
      

    setGridItems(tmpGrid)
    //Start game
    setPlaying(true)

  }

  const handleItemClick = (index:number)=>{
    return
  }

  return (
    <k.Container>

      {/* Informações */}
      <k.Info>
          <k.LogoLink href=''>
            <img src={logoImage} width='200' alt=''/>
          </k.LogoLink>

          <k.InfoArea>
            <InfoItem label='Time' value='00:00'/>
            <InfoItem label='Moviments' value='0'/>
          </k.InfoArea>

          <Button 
          label='Reiniciar'
          icon ={RestartIcon}
          onClick={handleResetGame}
          />

      </k.Info>

        {/*Game  */}

      <k.GridArea>
        <k.Grid>
          {gridItems.map((item, index)=>{
            <GridItem 
           key={index}
            item={item}
            onClick={()=>{handleItemClick(index)}}>

            </GridItem>
          })}
        </k.Grid>

      </k.GridArea>
    </k.Container>
    )
}

export default App