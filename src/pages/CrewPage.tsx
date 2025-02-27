import React from "react";
import { connect } from "react-redux";
import { CharacterComponent } from "../components/CharacterComponent";
import { Carousel } from "../components/characterDialog/Carousel";
import { SoldierComponent } from "../components/SoldierComponent";
import { StatusbarComponent } from "../components/statusbar/StatusBarComponent";
import { Character, Soldier } from "../types/Characters";
import { CrewState } from "../types/State";

export const CrewOverview = ({ shipName, captain, firstMate, soldiers }: { shipName: string; captain: Character | undefined; firstMate: Character | undefined; soldiers: Soldier[] | undefined }) =>
    <React.Fragment>
        {captain && firstMate && soldiers ?
            <React.Fragment>
                <StatusbarComponent key="statusbarComponent" />
                <div key="crewRoster" id="crewRoster" style={{ paddingTop: "0.5rem" }}>
                    <Carousel
                        splitSize={4}
                        inputDivs={[
                            <CharacterComponent key="captainComponent" isCaptain={true} />,
                            <CharacterComponent key="firstMateComponent" isCaptain={false} />,
                            ...soldiers.map((soldier) => <SoldierComponent key={`crew_member_${soldier.type}`} soldier={soldier} />),
                        ]}
                    />
                    {/* {captain ? <CharacterComponent key="captainComponent" isCaptain={true} /> : <AddCharacterComponent isCaptain={true} />}
                                {firstMate ? <CharacterComponent key="firstMateComponent" isCaptain={false} /> : <AddCharacterComponent isCaptain={false} />}
                                {soldiers && numberOfSoldiers() > 0 ? soldiers.map((soldier) => <SoldierComponent key={`crew_member_${soldier.type}`} soldier={soldier} />) : undefined}
                                {numberOfSoldiers() < 8 ? <AddCrewMemberComponent /> : undefined} */}
                </div>
            </React.Fragment> : null
        }
    </React.Fragment>;

const mapStateToProps = (state: CrewState) => {
    if (state.ShipName && state.Captain?.name && state.Captain?.level) {
        const myStorage = localStorage;
        myStorage.setItem(`${state.ShipName}_${state.Captain?.name}_${state.Captain?.level}_${state.Credits}`, JSON.stringify(state));
    }
    return {
        shipName: state.ShipName,
        captain: state.Captain,
        firstMate: state.FirstMate,
        soldiers: state.Soldiers,
    };
};

export const CrewPage = connect(mapStateToProps)(CrewOverview);
