import CharacterUIUpdater from "./create_character_ui.js";
const updateUI = CharacterUIUpdater.updateUI;
import { populateDropdown, handleSelectionChange, fetchData, API_BASE_URL } from "./utility.js";



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
    updateUI(def_race_data);
    updateUI(def_class_data);
}

initializeUI();

// Detect selection change, make API call, and update the UI
handleSelectionChange(raceSelect, updateUI);
handleSelectionChange(classSelect, updateUI);


