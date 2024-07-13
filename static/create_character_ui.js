class CharacterUIUpdater {
    static updateUI = (characterData) => {
        console.log(characterData);

        if(!characterData.hit_die){
            // Update basic details RACE
        
            this.updateBasicDetails(characterData);

            // Update ability bonuses RACE
            this.updateAbilityBonuses(characterData.ability_bonuses);

            // Update starting proficiencies RACE
            this.updateStartingProficiencies(characterData.starting_proficiencies);

            // Update languages RACE
            this.updateLanguages(characterData.languages);

            // Update traits RACE
            this.updateTraits(characterData.traits);

            // Update subraces RACE
            this.updateSubraces(characterData.subraces);
        }else{
            // Update proficiency choices CLASS
            this.updateProficiencyChoices(characterData.proficiency_choices);

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
            this.updateSpellcasting(characterData.spellcasting);
        }
    }

    static updateBasicDetails(characterData) {  
        document.getElementById('characterSpeed').textContent = characterData.speed;
        document.getElementById('characterAlignment').textContent = characterData.alignment;
        document.getElementById('characterSize').textContent = characterData.size;
    }

    static updateProficiencyChoices(proficiencyChoices) {
        const container = document.getElementById('proficiencyChoicesContainer');
        if (!container) return;
        container.innerHTML = '';
        
        proficiencyChoices.forEach(choice => {
            const selectElement = document.createElement('select');
            selectElement.id = `proficiencyChoice-${choice.index}`;
            selectElement.setAttribute('name', choice.index);

            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.text = 'Select a skill';
            selectElement.add(placeholderOption);

            choice.from.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.item.index;
                optionElement.text = `${option.item.name}`;
                selectElement.add(optionElement);
            });

            container.appendChild(selectElement);
        });
    }

    static updateAbilityBonuses(bonuses) {
        if(!bonuses) return;
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

        proficiencies.forEach(proficiency => {
            const listItem = document.createElement('li');
            listItem.textContent = proficiency.name;
            container.appendChild(listItem);
        });
    }

    static updateSavingThrows(savingThrows) {
        const container = document.getElementById('savingThrows');
        container.innerHTML = '';
        
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

        equipment.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.equipment.name} x${item.quantity}`;
            container.appendChild(listItem);
        });
    }

    static updateSpellcasting(spellcasting) {
        const container = document.getElementById('spellcasting');
        container.innerHTML = ''; // Clear existing content
        
        // Iterate over the 'info' array in the spellcasting object
        spellcasting.info.forEach(item => {
            // Create a new <li> element for the list item
            const listItem = document.createElement('li');
            
            // Create a new <label> element for the name
            const labelElement = document.createElement('label');
            labelElement.textContent = item.name; // Set the text content of the labelElement to the name
            
            // Append the labelElement to the listItem
            listItem.appendChild(labelElement);
            
            // Check if the 'desc' property is an array
            if (Array.isArray(item.desc)) {
                // Concatenate all descriptions into a single string, separated by <br> for display
                let descriptionContent = '';
                item.desc.forEach(description => {
                    descriptionContent += '<br>' + description; // Add each description preceded by a <br>
                });
                
                // Create a new <div> or <span> element to hold the descriptions
                // This is necessary because adding raw HTML (like <br>) directly to innerHTML can lead to security issues
                const descriptionContainer = document.createElement('div');
                descriptionContainer.innerHTML = descriptionContent; // Safely insert the descriptions
                
                // Append the descriptionContainer to the listItem
                listItem.appendChild(descriptionContainer);
            }
    
            // Append the listItem to the container
            container.appendChild(listItem);
        });
    }
}

export default CharacterUIUpdater;