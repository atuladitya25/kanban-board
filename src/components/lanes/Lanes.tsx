import "./Lanes.css"

const Lanes = (props:any) => {

    return(
        <div className="swim-lane">
            <div className={"lane-title "+props.status.toLowerCase().replace(' ','-')}>
                {props.status}
            </div>
            {props.children}
        </div>
    );
}

export default Lanes;