import "./Card.css"
import { FaStopCircle, FaCheck } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";
import { useState } from 'react';
import Modal from 'react-modal';
import StoryDetail from "../../components/story-details/StoryDetail";

const customStyles = {
    content: {
      top: '20%',
      bottom: 'auto',
    },
};

const Card = (props:any) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleUpdate = (cardToUpdate:any,action:string) => {
        props.handler(cardToUpdate,action);
        closeModal();
    }

    return(
        <Draggable  key={props.cardInfo.storyId} draggableId={props.cardInfo.storyId} index={props.index}>
        {(provided:any)=>
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={"card "+props.cardInfo.rank}>
                <div className="clickable-div" onClick={openModal}>
                <div className={"story-name"}>
                    {props.cardInfo.storyName}
                </div>
                <div className={"quick-stat"}>
                    <div className="block-stat">
                        {props.cardInfo.blocked==="Yes" && <FaStopCircle className={"blocked"}/>}
                        {props.cardInfo.blocked==="No" && <FaCheck className={"not-blocked"}/>}
                    </div>
                    <div className="story-points">
                        {props.cardInfo.storyPoints}
                    </div>
                    <div className="story-owner">
                        {props.cardInfo.storyOwner}
                    </div>
                </div>
                <div className={"story-id"}>
                    {props.cardInfo.storyId}
                </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                >
                    <StoryDetail storyDetail={props.cardInfo} handler={handleUpdate}/>
            </Modal>
            </div>
        }
        </Draggable>
    );
}

export default Card;