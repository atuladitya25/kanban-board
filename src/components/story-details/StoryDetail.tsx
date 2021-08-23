import "./StoryDetail.css"
import { useState,useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { IIndexable } from "../../store/types";

interface IProps{
    storyDetail : IIndexable|null
    handler:any
}

const defaultStory:IIndexable = {
    storyName:"",
    blocked:"No",
    description:"",
    storyPoints:"", 
    storyOwner:"", 
    storyId:"",
    rank:"",
    status:""
}

const StoryDetail = (props:IProps) => {

    const [storyDetail,updateStory] = useState(defaultStory);
    
    useEffect(() => {
        if(props.storyDetail!==null && storyDetail===defaultStory){
            updateStory({...props.storyDetail});
        }
    },[props, storyDetail]);

    const updatePriority = (event:any) => {
        updateStory({...storyDetail,rank:event.value});
    }

    const updateStatus = (event:any) => {
        updateStory({...storyDetail,status:event.value});
    }

    const updateStoryDetailFromForm = (event:any) => {
        let target = event.target as HTMLInputElement;
        updateStory({...storyDetail,[target.id]:target.value});
    }

    const updateCurrent = (event:any) => {
        let target = event.target as HTMLInputElement;
        if(target.id==="block"){
            updateStory({...storyDetail,blocked:"Yes"});
        }
        else{
            updateStory({...storyDetail,blocked:"No"});
        }
    }

    const saveCancel = (event:any) => {
        let target = event.target as HTMLInputElement;
        if(target.id==="Save"){
            props.handler(storyDetail,"Save");
        }
        else{
            props.handler(storyDetail,"Cancel");
        }
    }

    const dropOptions = [
        { value: 'todo', label: 'To Do' },
        { value: 'development', label: 'Development' },
        { value: 'testing', label: 'Testing' },
        { value: 'done', label: 'Done' },];

    const dropPrioOptions = [
        { value: 'one', label: 'Urgent' },
        { value: 'two', label: 'High' },
        { value: 'three', label: 'Medium' },
        { value: 'four', label: 'Low' },];

    return(
        <div className="form-area">
            <div className={"story-name-container"}>
                <input type="text" placeholder={"Story Name"} onKeyUp={(event)=>updateStoryDetailFromForm(event)} className={"story-name-form"} id="storyName" defaultValue={storyDetail.storyName}/>
            </div>
            <div className="info-area">
                <div className="story-desc">
                    <textarea onKeyUp={(event)=>updateStoryDetailFromForm(event)} id="description" placeholder={"Story Description"} className="desc-box" defaultValue={storyDetail.description}/>
                </div>
                <div className="story-state-container">
                    <div className="points-container">
                            
                            <Dropdown className="story-status-drop" onChange={(event)=>updateStatus(event)} 
                                options={dropOptions} value={storyDetail.status} placeholder="Select Current Status" />
                            <Dropdown className="story-priority-drop" onChange={(event)=>updatePriority(event)} 
                                options={dropPrioOptions} value={storyDetail.rank} placeholder="Select Priority" />
                            <input type="text" onKeyUp={(event)=>updateStoryDetailFromForm(event)} placeholder={"Story Points"} className={"story-points-form"} id="storyPoints" defaultValue={storyDetail.storyPoints}/>
                    </div>
                    <div>
                        <input type="text" onKeyUp={(event)=>updateStoryDetailFromForm(event)} placeholder={"Story Owner"} className={"story-owner-form"} id="storyOwner" defaultValue={storyDetail.storyOwner}/>
                    </div>
                    <div className="block-stat-form">
                        <div id="ready" onClick={(event)=>updateCurrent(event)} className={"state-button ready"+(storyDetail.blocked==="Yes"?"":"-yes")}>
                            <FaCheckCircle className="icon"/> Ready
                        </div>
                        <div id="block" onClick={(event)=>updateCurrent(event)} className={"state-button blocked-form"+(storyDetail.blocked==="No"?"":"-yes")}>
                            <FaTimesCircle className="icon"/> Blocked
                        </div>
                    </div>
                </div>
            </div>
            <div className="action-stat">
                <div id="Save" onClick={(event)=>saveCancel(event)} className={"action-button ready-yes"}>
                    Save
                </div>
                <div id="Cancel" onClick={(event)=>saveCancel(event)} className={"action-button blocked-form-yes"}>
                    Cancel
                </div>
            </div>
        </div>
    );
}

export default StoryDetail;