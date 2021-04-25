import React, { useState } from "react";
import * as Backgrounds from "../../data/Backgrounds.json";
import { getBackgroundImage } from "../../images/index";
import { BackgroundEnum, BackgroundModifications, BackgroundOptions } from "../../types/Background";
import { Character } from "../../types/Characters";
import { isCaptain } from "../../Utils";

const backgroundInformation = Backgrounds.backgrounds as BackgroundOptions[];
const getBackgroundInfos = (background: BackgroundEnum) => backgroundInformation.find((bg) => bg.name === background) as BackgroundOptions;

export const SelectBackground = ({ character, selectedBackground, updateAndContinue }: { character: Character; selectedBackground: BackgroundModifications | undefined; updateAndContinue(value: BackgroundModifications): void }) => {
    const [background, setBackground] = useState<BackgroundModifications | undefined>();
    const renderBackgroundTile = (bg: BackgroundEnum) => <div
        key={`add-character-${bg}`}
        className={bg === background?.name ? "add-character-background background-selected" : "add-character-background"}
        onClick={() => setBackground(
            bg === background?.name ?
                undefined :
                {
                    name: bg,
                    statModifications: { mandatory: getBackgroundInfos(bg).statModifications.mandatory, optional: {} },
                    powers: [],
                }
        )}>
        <img className="add-character-background-icons" src={getBackgroundImage(bg)} alt={`add-character-${bg}-icon`} />
        <div className="add-character-background-text">{`${bg}`}</div>
    </div>;

    return <React.Fragment>
        <div className="modal-header">{`Select a background for your ${isCaptain(character.type) ? "Captain" : "First Mate"}`}</div>
        <div className="add-character-background-container">
            {Object.keys(BackgroundEnum).map((backgroundEnumEntry: string) => renderBackgroundTile(backgroundEnumEntry as BackgroundEnum))}
        </div>
        {background ? <div className="modal-header">Background Description</div> : null}
        {background ? <div className="background-description">{getBackgroundInfos(background.name).description}</div> : null}
        <button
            onClick={() => background ? updateAndContinue(background) : undefined}
            className={background && character.name ? "power-btn" : "power-btn disabled"}
        >Confirm Background selection</button>
    </React.Fragment>;
};
