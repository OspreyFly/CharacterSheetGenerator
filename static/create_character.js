import CharacterUIUpdater from "./create_character_ui.js";
const updateUI = CharacterUIUpdater.updateUI;
import { populateDropdown, handleSelectionChange, fetchData, API_BASE_URL } from "./utility.js";

// Define a character
let character_info = {
    charactername: '',
    race: 'dragonborn',
    charclass: 'barbarian',
}

// Define the races and classes
const RACES = ["Dragonborn", "Dwarf", "Human", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Tiefling"];
const CLASSES = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

// Main application logic
const raceSelect = document.getElementById('race');
const classSelect = document.getElementById('class');

// Provide Foundational Choices
populateDropdown(raceSelect, RACES);
populateDropdown(classSelect, CLASSES);

// Fetch API data and apply for default dropdown options
async function initializeUI() {
    const def_race_data = await fetchData(`${API_BASE_URL}races/dragonborn`);
    const def_class_data = await fetchData(`${API_BASE_URL}classes/barbarian`);
    updateUI(def_race_data, 'race');
    updateUI(def_class_data, 'class');
}

initializeUI();

// Detect selection change, make API call, and update the UI
handleSelectionChange(raceSelect, character_info);
handleSelectionChange(classSelect, character_info);



// Update name input as it changes
const characterName = document.getElementById('characterName');
characterName.addEventListener('input', function(){
    character_info["charactername"] = characterName.value;
});

// Handle form submission for saving the character
const acceptBtn = document.getElementById("accept");
acceptBtn.addEventListener('mousedown', function(){
    axios.post('/save-character', JSON.stringify(character_info), {
        headers: {'Content-Type': 'application/json'}
    })
}).then((response) => response.json()).catch((error) => console.error('Error:', error));
