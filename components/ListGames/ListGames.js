import React from 'react'
import { map } from "lodash";
import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import useWindowSize from "../../hooks/useWindowSize";
import { breakpointUpSm,breakpointUpMd,breakpointUpLg } from "../../utils/breakpoint";

export default function ListGames(props) {
    const {games} = props;
    const { width } = useWindowSize();
   
    const getColumnsRender = () => {
        switch (true) {
            case width > breakpointUpLg:
                return 5;
            case width > breakpointUpMd:
                return 3;
            case width > breakpointUpSm:
                return 2;
            default:
                return 1;
        }
    }

    return (
        <div className="list-games">
           <Grid>
               <Grid.Row columns={getColumnsRender()}>
               {games?.map((game) =>(
                <Game game={game} key={game.id}/>
                ))}
               </Grid.Row>
           </Grid>
           
        </div>
    )
}

function Game(props){
    const { game } = props;
    
    return(
        <Grid.Column className="list-games__game">
            <Link href={`/${game?.url}`}>
                <a>
                    <div className="list-games__game-poster">
                        <Image src={game?.poster.url} alt={game?.title} />
                        <div className="list-games__game-poster-info">
                            {game?.discount ? (
                                <span className="discount">-{game?.discount}%</span>
                            ):(
                                <span></span>
                            )}
                            <span className="price">{(game?.price - Math.floor(game?.price*game?.discount)/100).toFixed(2)}$</span>

                        </div>
                    </div>
                    <h2>{game?.title}</h2>
                </a>
            </Link>
        </Grid.Column>
    )
}