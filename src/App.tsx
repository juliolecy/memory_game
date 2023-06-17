import { useEffect, useState } from 'react'
import * as k from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import RestartIcon from './svgs/restart.svg'
import {GridItemType}  from './types/GridItemType'
import {items} from './data/items.ts'
import { GridItem } from './components/GridItem/index.tsx'
import { formatTimeElapsed } from './utils/formatTimeElapsed.ts'
const App = () =>{

  const[playing, setPlaying]=useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(()=> handleResetGame(), []);

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(playing){
        setTimeElapsed(timeElapsed +1)
      }
    }, 1000)
    return () => clearInterval(timer)
  },[playing, timeElapsed])


// Verify if opened items are equal
  useEffect(()=>{
    if(showCount ===2){
      let opened = gridItems.filter(item => item.shown === true)
      
      if(opened.length === 2 ){
        //if both are equal, set each permanentShown === true
        if(opened[0].item === opened[1].item){
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid){
            if(tmpGrid[i].shown){
              tmpGrid[i].permanentShown=true;
              tmpGrid[i].shown=false;
            }
          }
          setGridItems(tmpGrid);
          setShowCount(0)
          setMoves(moves => moves + 1)
        } else { //if they are different, clean all shown
         setTimeout(()=>{
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid){
            
            tmpGrid[i].shown = false
          }
          setGridItems(tmpGrid);
          setShowCount(0)
          setMoves(moves => moves + 1)
         },1000)
        }
        
      }
    }
  },[showCount, gridItems])

  useEffect(()=>{
    //verify if game is over
    if(moves>0 && gridItems.every(item => item.permanentShown === true)){
      setPlaying(false);
    }
  },[moves, gridItems])

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
    if(playing && index !== null && showCount < 2 ){
      let tmpGrid = [...gridItems];
      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false){
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1)
      }
      setGridItems(tmpGrid)
    }

  }

  return (
    <k.Container>

      {/* Informações */}
      <k.Info>
          <k.LogoLink href=''>
            <img src={logoImage} width='200' alt=''/>
          </k.LogoLink>

          <k.InfoArea>
            
            <InfoItem label='Time' value={formatTimeElapsed(timeElapsed)}/>
            <InfoItem label='Moviments' value={moves.toString()}/>
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
          {gridItems.map((item, index)=>(
            <GridItem 
            key={index}
            item={item}
            onClick={()=>handleItemClick(index)}
            />
          ))}
        </k.Grid>

      </k.GridArea>
    </k.Container>
    )
}

export default App