class CharacterUIUpdater {
    static updateUI = (characterData, type) => {
        try{
            if(type === 'race'){
                console.log('race hit');
                // Update basic details RACE
            
                this.updateBasicDetails(characterData);

                // Update ability bonuses RACE
                this.updateAbilityBonuses(characterData.ability_bonuses);
                console.log('past abilities');
                // Update starting proficiencies RACE
                this.updateStartingProficiencies(characterData.starting_proficiencies);

                // Update languages RACE
                this.updateLanguages(characterData.languages);

                // Update traits RACE
                this.updateTraits(characterData.traits);

                // Update subraces RACE
                this.updateSubraces(characterData.subraces);
            }

            if(type === 'class'){
                console.log('class hit');
                // Update proficiency choices CLASS
               // this.updateProficiencyChoices(characterData.proficiency_choices[0]);

                // Update proficiencies CLASS
                this.updateProficiencies(characterData.proficiencies);

                // Update saving throws CLASS
                this.updateSavingThrows(characterData.saving_throws);

                // Update starting equipment CLASS
                this.updateStartingEquipment(characterData.starting_equipment);

                if(!characterData.spellcasting){
                    characterData.spellcasting = characterData.spellcasting || {};
                    characterData.spellcasting.info = [{ name: "Spell Casting Ability", desc: ["None"] }];
                }
                // Update spellcasting details CLASS
                this.updateSpellCasting(characterData.spellcasting);
            }
        }catch(err){
            return err.message;
        }  
    }

    static updateBasicDetails(characterData) {
        try {
            const speedElement = document.getElementById('characterSpeed');
            const alignmentElement = document.getElementById('characterAlignment');
            const sizeElement = document.getElementById('characterSize');
    
            if (!speedElement || !alignmentElement || !sizeElement) {
                throw new Error("One or more elements not found");
            }
    
            if (!(characterData.hasOwnProperty('speed') && characterData.hasOwnProperty('alignment') && characterData.hasOwnProperty('size'))) {
                throw new Error("Missing required characterData properties: speed, alignment, size");
            }
    
            speedElement.textContent = characterData.speed;
            alignmentElement.textContent = characterData.alignment;
            sizeElement.textContent = characterData.size;
        } catch (err) {
            throw err;
        }
    }
    
    

    static updateProficiencyChoices(proficiencyChoice) {
        const container = document.getElementById('proficiencyChoicesContainer');
        if (!container) return;
    
        container.innerHTML = '';
    
        if (!proficiencyChoice || !proficiencyChoice.from || !Array.isArray(proficiencyChoice.from.options)) {
            throw new Error("Missing proficiency choices!");
        }
        for(let i = 0; i < proficiencyChoice.choose; i++){
            const selectElement = document.createElement('select');
            selectElement.id = 'proficiencyChoice'; // Simplified ID
            selectElement.setAttribute('name', 'proficiency-choice');
    
            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.text = 'Select a skill';
            selectElement.add(placeholderOption);
    
            proficiencyChoice.from.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.item.index;
                optionElement.text = `${option.item.name}`;
                selectElement.add(optionElement);
            });
    
            container.appendChild(selectElement);
        }
    }
    
    
    
    

    static updateAbilityBonuses(bonuses) {
        if(!bonuses)    throw new Error("Missing bonuses data!"); 
        
        const abilityBonusContainer = document.getElementById('abilityBonuses');
        
        if (!abilityBonusContainer) return;
        abilityBonusContainer.innerHTML = '';

        bonuses.forEach(bonus => {
            const abilityScore = document.getElementById(`ability-score-${bonus.ability_score.index}`);
            if (abilityScore) {
                abilityScore.textContent = `${bonus.ability_score.name}: ${bonus.bonus}`;
            } else {
                const newElement = document.createElement('li');
                newElement.textContent = `${bonus.ability_score.name}: ${bonus.bonus}`;
                abilityBonusContainer.appendChild(newElement);
            }
        });
    }

    static updateStartingProficiencies(proficiencies) {
        const container = document.getElementById('startingProficiencies');
        if (!container) return;
        container.innerHTML = '';

        if(!proficiencies){
            proficiencies = [{ name: "None"}];
        }
        proficiencies.forEach(proficiency => {
            const listItem = document.createElement('li');
            listItem.textContent = proficiency.name;
            container.appendChild(listItem);
        });
    }

    static updateLanguages(languages) {
        const container = document.getElementById('languages');
        if (!container) return;
        container.innerHTML = '';

        if(!languages){
            languages = [{ name: "None"}];
        }

        languages.forEach(language => {
            const listItem = document.createElement('li');
            listItem.textContent = language.name;
            container.appendChild(listItem);
        });
    }

    static updateTraits(traits) {
        const container = document.getElementById('traits');
        if (!container) return;
        container.innerHTML = '';

        if(!traits){
            traits = [{ name: "None"}];
        }

        traits.forEach(trait => {
            const listItem = document.createElement('li');
            listItem.textContent = trait.name;
            container.appendChild(listItem);
        });
    }

    static updateSubraces(subraces) {
        const container = document.getElementById('subraces');
        if (!container) return;
        container.innerHTML = '';

        if(!subraces){
            subraces = [{ name: "None"}];
        }

        subraces.forEach(subrace => {
            const listItem = document.createElement('li');
            listItem.textContent = subrace.name;
            container.appendChild(listItem);
        });
    }

    static updateProficiencies(proficiencies) {
        const container = document.getElementById('proficiencies');
        if (!container) return;
        container.innerHTML = '';
    
        if(!proficiencies){
            proficiencies = [{ name: "None"}];
        }

        proficiencies.forEach(proficiency => {
            const listItem = document.createElement('li');
            listItem.textContent = proficiency.name;
            container.appendChild(listItem);
        });
    }

    static updateSavingThrows(savingThrows) {
        const container = document.getElementById('savingThrows');
        container.innerHTML = '';

        if(!savingThrows){
            savingThrows = [{ name: "None"}];
        }
        
        savingThrows.forEach(saveThrow => {
            const listItem = document.createElement('li');
            listItem.textContent = saveThrow.name;
            container.appendChild(listItem);
        });
    }

    static updateStartingEquipment(equipment) {
        const container = document.getElementById('startingEquipment');
        if (!container) return;
        container.innerHTML = '';

        if(!equipment){
            equipment = [{ equipment: { name: "None" }, quantity: 0}];
        }

        equipment.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.equipment.name} x${item.quantity}`;
            container.appendChild(listItem);
        });
    }

    static updateSpellCasting(spellcasting) {
        const container = document.getElementById('spellcasting');
        container.innerHTML = ''; // Clear existing content

        if (!spellcasting || Object.keys(spellcasting).length === 0) {
            spellcasting = { info: [{ name: "No Spell Casting Provided" }] };
    
            const listItem = document.createElement('li');
            const labelElement = document.createElement('label');
            labelElement.textContent = spellcasting.info[0].name;
    
            listItem.appendChild(labelElement);
            container.appendChild(listItem);
        }
        else{
            spellcasting.info.forEach(item => {
                const listItem = document.createElement('li');
                const labelElement = document.createElement('label');
                labelElement.textContent = item.name; 
                
                listItem.appendChild(labelElement);
                
                if (Array.isArray(item.desc)) {
                    let descriptionContent = '';
                    item.desc.forEach(description => {
                        descriptionContent += '<br>' + description; 
                    });
                    
                    const descriptionContainer = document.createElement('div');
                    descriptionContainer.innerHTML = descriptionContent; 
                    listItem.appendChild(descriptionContainer);
                }
                container.appendChild(listItem);
            });
        }
        
        
    }
}

export default CharacterUIUpdater;