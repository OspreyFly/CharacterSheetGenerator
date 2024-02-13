//Define a character
let character_info = {
    charactername: '',
    race: '',
    charclass: '',
}

// Define the races and classes
var races = ["Dragonborn", "Dwarf", "Human", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Tiefling"];
var classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

// Get the select elements
var raceSelect = document.getElementById('race');
var classSelect = document.getElementById('class');

// Populate the race dropdown
for (var i = 0; i < races.length; i++) {
    console.log("doing race list");
    var option = document.createElement('option');
    option.value = races[i];
    option.text = races[i];
    raceSelect.add(option);
}

// Populate the class dropdown
for (var i = 0; i < classes.length; i++) {
    var option = document.createElement('option');
    option.value = classes[i];
    option.text = classes[i];
    classSelect.add(option);
}

// Listen for selection in dropdown
raceSelect.addEventListener('change', function(){
    let selectedValue = this.value;
    character_info["race"] = this.value;
    showRace(selectedValue);
})
classSelect.addEventListener('change', function(){
    let selectedValue = this.value;
    character_info["charclass"] = this.value;
    showClass(selectedValue);
})


// Need to populate all h3
async function showRace(race){
    race = race.toLowerCase();
    request = await axios.get(`https://www.dnd5eapi.co/api/races/${race}`)
    .then(content => {   
        //Ability Bonuses
        let ability_bonus_ul = document.getElementById("race-bonus");
        let ability_bonuses = content.data.ability_bonuses
        ability_bonus_ul.innerHTML = '';
        for(var i = 0; i < ability_bonuses.length; i++){
            let li = document.createElement('li');
            li.textContent = `${ability_bonuses[i].ability_score.name}: ${ability_bonuses[i].bonus}`;
            ability_bonus_ul.appendChild(li);
        }
        //Age
        let age_par = document.getElementById("age");
        let age = content.data.age;
            age_par.textContent = '';
            age_par.textContent = age;
        //Alignment
        let alignment_par = document.getElementById("alignment");
        let alignment = content.data.alignment;
            alignment_par.textContent = '';
            alignment_par.textContent = alignment;
        //Languages
        let languages_ul = document.getElementById("languages");
        let languages = content.data.languages;
        languages_ul.innerHTML = '';
        for(var i = 0; i < languages.length; i++){
            let li = document.createElement('li');
            li.textContent = `${languages[i].name}`;
            languages_ul.appendChild(li);
        }
        //Size
        let size_par = document.getElementById("size");
        let size = content.data.size;
            size_par.textContent = '';
            size_par.textContent = size;
        //Speed
        let speed_par = document.getElementById("speed");
        let speed = content.data.speed;
            speed_par.textContent = '';
            speed_par.textContent = speed;
        //Prof
        let prof_ul = document.getElementById("race-proficiencies");
        let profs = content.data.starting_proficiencies;
        prof_ul.innerHTML = '';
        if(profs.length < 1){
            let li = document.createElement('li');
            li.textContent = `None`;
            prof_ul.appendChild(li);
        }
        else{
            for(var i = 0; i < profs.length; i++){
                let li = document.createElement('li');
                li.textContent = `${profs[i].name}`;
                prof_ul.appendChild(li);
            }
        }
        //Traits
        let traits_ul = document.getElementById("traits");
        let traits = content.data.traits;
        traits_ul.innerHTML = '';
        if(traits.length < 1){
            let li = document.createElement('li');
            li.textContent = `None`;
            traits_ul.appendChild(li);
        }
        else{
            for(var i = 0; i < traits.length; i++){
                let li = document.createElement('li');
                li.textContent = `${traits[i].name}`;
                traits_ul.appendChild(li);
            }
        }
    })
    .catch(error => {
        console.log('Error: Race Request', error);
    });
}

async function showClass(adventureClass){
    adventureClass = adventureClass.toLowerCase();
    await axios.get(`https://www.dnd5eapi.co/api/classes/${adventureClass}`)
    .then(content => {   
        //Hit Die
        let hitDie_par = document.getElementById("hit-dice");
        let hitDie = content.data.hit_die;
            hitDie_par.textContent = '';
            hitDie_par.textContent = `d${hitDie}`;
        //Class Prof
        let profs_ul = document.getElementById("class-proficiencies");
        let profs = content.data.proficiencies;
        profs_ul.innerHTML = '';
        if(profs.length < 1){
            let li = document.createElement('li');
            li.textContent = `None`;
            profs_ul.appendChild(li);
        }
        else{
            for(var i = 0; i < profs.length; i++){
                let li = document.createElement('li');
                li.textContent = `${profs[i].name}`;
                profs_ul.appendChild(li);
            }
        }
        //Equipement
        let equipement_ul = document.getElementById("equipment");
        let equipement = content.data.starting_equipment;
        equipement_ul.innerHTML = '';
        if(equipement.length < 1){
            let li = document.createElement('li');
            li.textContent = `None`;
            equipement_ul.appendChild(li);
        }
        else{
            for(var i = 0; i < equipement.length; i++){
                let li = document.createElement('li');
                li.textContent = `${equipement[i].equipment.name}: ${equipement[i].quantity}`;
                equipement_ul.appendChild(li);
            }
        }
    })
    .catch(error => {
        console.log('Error: Class Request', error);
    });

    await axios.get(`https://www.dnd5eapi.co/api/classes/${adventureClass}/levels`)
    .then(content => {
        //Feats
        console.log('starting feats');
        let features_ul = document.getElementById('features');
        let features = content.data[0].features;
        features_ul.innerHTML = '';
        if(features.length < 1){
            let li = document.createElement('li');
            li.textContent = `None`;
            features_ul.appendChild(li);
        }
        else{
            for(var i = 0; i < features.length; i++){
                let li = document.createElement('li');
                li.textContent = `${features[i].name}`;
                features_ul.appendChild(li);
            }
        }
        //Spell Pool
        let spellPool_ul = document.getElementById('spell-slots')
        let spellPool = content.data[0].spellcasting
        spellPool_ul.innerHTML = '';
        let spellPool_label = ['Cantrips Known: ', 'Level 1: ', 'Level 2: ', 'Level 3: ',
                             'Level 4: ', 'Level 5: ', 'Level 6: ', 'Level 7: ', 'Level 8: ',
                              'Level 9: '];
        if(!spellPool){
            let li = document.createElement('li');
            li.textContent = 'No spell casting';
            spellPool_ul.appendChild(li);
        }
        else{
            for(let i = 0; i < 10; i++){
                let li = document.createElement('li');
                if(i > 0){
                    li.textContent = `${spellPool_label[i]}${spellPool['spell_slots_level_'+ i]}`;
                }
                else{
                    li.textContent = `${spellPool_label[i]}${spellPool.cantrips_known}`;
                }
                spellPool_ul.appendChild(li);
            }
        }
        
    })
    .catch(error => {
        console.log('Error: Class Level Request', error);
    });
}

const characterName = document.getElementById('character-name');
characterName.addEventListener('input', function(){
    character_info["charactername"] = characterName.value;
});

const acceptBtn = document.getElementById("accept");
acceptBtn.addEventListener('mousedown', function(){
    console.log(JSON.stringify(character_info));
    axios.post('/save-character', JSON.stringify(character_info), {
        headers: {'Content-Type': 'application/json'}
    })
}).then((response) => response.json()).catch((error) => console.error('Error:', error));



