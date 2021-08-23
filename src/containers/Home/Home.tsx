import "./Home.css";
import { useSelector, useDispatch } from 'react-redux'
import Lanes from "../../components/lanes/Lanes";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import CardHolder from "../../components/cards/CardHolder";
import cardData from "./MockData";
import { DragDropContext } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import StoryDetail from "../../components/story-details/StoryDetail";

const customStyles = {
    content: {
      top: '20%',
      bottom: 'auto',
    },
  };

const Home = (props:any) => {

    const cards = useSelector((state:any) => state.cards)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'PUT' , payload: cardData});
    },[props,dispatch]);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [filterTerm, updateFilter] = useState("");

    const handleOnDragEnd = (result:any) => {
        let newCards = [...cards];
        let indexToUpdate = newCards.findIndex(card => card.storyId === result.draggableId);
        if(result.destination != null){
            newCards[indexToUpdate].status = result.destination.droppableId;
        }
        dispatch({ type: 'PUT' , payload: newCards});
    }

    const handleUpdate = (cardToUpdate:any,action:string) => {
        if(action==="Save"){
            let newCards = [...cards];
            let indexToUpdate = newCards.findIndex(card => card.storyId === cardToUpdate.storyId);
            newCards[indexToUpdate].status = cardToUpdate.status;
            newCards[indexToUpdate].storyName= cardToUpdate.storyName;
            newCards[indexToUpdate].blocked= cardToUpdate.blocked;
            newCards[indexToUpdate].description= cardToUpdate.description;
            newCards[indexToUpdate].storyPoints= cardToUpdate.storyPoints; 
            newCards[indexToUpdate].storyOwner= cardToUpdate.storyOwner;
            newCards[indexToUpdate].storyId= cardToUpdate.storyId;
            newCards[indexToUpdate].rank= cardToUpdate.rank;
            newCards[indexToUpdate].status= cardToUpdate.status;
            dispatch({ type: 'PUT' , payload: newCards});
        }
    }

    const doSearch = (event:any) => {
        let target = event.target as HTMLInputElement;
        updateFilter(target.value);
    }

    const handleNew = (cardToUpdate:any,action:string) => {
        if(action==="Save"){
            cardToUpdate.storyId=""+Math.floor(100000 + Math.random() * 900000);
            let newCards = [...cards,cardToUpdate];
            dispatch({ type: 'PUT' , payload: newCards});
        }
        closeModal();
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return(
        <div className="home">
            <div className="title">
                Kanban Board
            </div>
            <div>
                Drag cards across lanes to update status quickly, or click to edit details.
            </div>
            <div className="action-bar">
                <div className="add-button" onClick={openModal}>
                    <FaPlusCircle className="add-icon" /> Add New Item
                </div>
                <div className="search">
                    <FaSearch className="search-icon"/>
                    <input type="text" onKeyUp={(event)=>doSearch(event)} placeholder="Search" className="search-box"></input>
                </div>
            </div>
            <div className="lanes">
                <DragDropContext onDragEnd={(result)=>handleOnDragEnd(result)}>
                    <Lanes status={"To Do"}>
                        <CardHolder filterTerm={filterTerm} handler={handleUpdate} laneType={"todo"} cards={cards.filter((card:any)=> card.status==="todo")}/>
                    </Lanes>
                    <Lanes status={"Development"}>
                        <CardHolder filterTerm={filterTerm} handler={handleUpdate} laneType={"development"} cards={cards.filter((card:any)=> card.status==="development")}/>
                    </Lanes>
                    <Lanes status={"Testing"}>
                        <CardHolder filterTerm={filterTerm} handler={handleUpdate} laneType={"testing"} cards={cards.filter((card:any)=> card.status==="testing")}/>
                    </Lanes>
                    <Lanes status={"Done"}>
                        <CardHolder filterTerm={filterTerm} handler={handleUpdate} laneType={"done"} cards={cards.filter((card:any)=> card.status==="done")}/>
                    </Lanes>
                </DragDropContext>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <StoryDetail storyDetail={null} handler={handleNew}/>
            </Modal>
        </div>
    );
}

export default Home;