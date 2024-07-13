const CharacterUIUpdater = require("./create_character_ui.js");
const API_BASE_URL = "https://www.dnd5eapi.co/api/";
const axios = require("axios");

function createElementOption(value, text) {
    
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
  }
  

const populateDropdown = (selectElement, options) => {
    options.forEach(option => selectElement.add(createElementOption(option, option)));
};

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


const handleSelectionChange = (selectElement) => {
    selectElement.addEventListener('change', () => {
        const selectedValue = selectElement.value.toLowerCase();
        if(selectElement.id === "race"){
            const race_data = fetchData(`${API_BASE_URL}races/${selectedValue}`);
            CharacterUIUpdater.updateUI(race_data);
        }else{
            const class_data = fetchData(`${API_BASE_URL}classes/${selectedValue}`);
            CharacterUIUpdater.updateUI(class_data);
        }
    });
};

module.exports = {
    createElementOption,
    populateDropdown,
    fetchData,
    handleSelectionChange,
    API_BASE_URL
};