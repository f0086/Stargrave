import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Crew from "../data/Samples/Serenity.json";
import { CreateCrewIcon, ImportCrewIcon, UseSampleIcon } from "../images";
import { SET_CREW } from "../redux/actions";
import { CrewState, InitialCrewState } from "../types/State";

export const LandingPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    return <div className="landing-page ">
        <div className="chapter-header">Stargrave Crew Configuration</div>
        <div
            className="landing-page-tile"
            onClick={() => {
                dispatch({ type: SET_CREW, payload: InitialCrewState });
                history.push("/ShipName");
            }}>

            <img alt="CreateWarband" className="landing-page-icon" src={CreateCrewIcon} />
            <div className="landing-page-header">Create new crew</div>
        </div>
        <div
            className="landing-page-tile"
            onClick={() => {
                history.push("/FileSystem");
            }}>

            <img alt="SampleWarband" className="landing-page-icon" src={ImportCrewIcon} />
            <div className="landing-page-header">Load existing crew from file or local storage</div>
        </div>
        <div
            className="landing-page-tile"
            onClick={() => {
                dispatch({ type: SET_CREW, payload: (Crew as any).default as CrewState });
                history.push("/CrewOverview");
            }}>

            <img alt="SampleWarband" className="landing-page-icon" src={UseSampleIcon} />
            <div className="landing-page-header">Load the sample crew of the Serenity</div>
        </div>
    </div >;
};
