let selection = "races/dragonborn/traits";


async function gatherContent(selection){
    request = await axios.get(`https://www.dnd5eapi.co/api/${selection}`)
    .then((res) =>{
        console.log(res);
    });
    console.log(request);
}

gatherContent(selection);
// Define the races and classes
var races = ["Dragonborn", "Dwarf", "Human", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Tiefling"];
var classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

// Get the select elements
var raceSelect = document.getElementById('race');
var classSelect = document.getElementById('class');

// Populate the race dropdown
for (var i = 0; i < races.length; i++) {
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


// Need to populate all h3
function showRace(){

}

function showClass(){

}