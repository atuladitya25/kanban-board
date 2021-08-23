import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import "./CardHolder.css"

const CardHolder = (props:any) => {

    const getCards = () =>{
        let smallFilterTerm  = props.filterTerm.toLowerCase();
        if(smallFilterTerm!==""){
        return props.cards.filter((card:any)=> card.storyName.toLowerCase().includes(smallFilterTerm) ||
                                        card.storyOwner.toLowerCase().includes(smallFilterTerm) ||
                                        card.storyId.toLowerCase().includes(smallFilterTerm));
        }
        return props.cards;
    }

    return(
        <Droppable droppableId={props.laneType}>
            {(provided:any,snapshot:any) => (
                <div className="card-holder" {...provided.droppableProps} ref={provided.innerRef}
                style={{ backgroundColor: snapshot.isDraggingOver ? 'gray' : 'inherit' }}>
                    {getCards().map((card:any,index:number)=>
                            <Card handler={props.handler} key={card.storyId} cardInfo={card} index={index}/>)}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default CardHolder;