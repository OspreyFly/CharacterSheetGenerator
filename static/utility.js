import CharacterUIUpdater from "./create_character_ui.js";
const API_BASE_URL = "https://www.dnd5eapi.co/api/";

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
        // Using fetch instead of axios
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response body as JSON
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error or handle it as needed
    }
};

const handleSelectionChange =  (selectElement, character_info) => {
    selectElement.addEventListener('change', async () => {
        const selectedValue = selectElement.value.toLowerCase();
        if(selectElement.id === "race"){
            const race_data = await fetchData(`${API_BASE_URL}races/${selectedValue}`);
            character_info.race = selectedValue;
            CharacterUIUpdater.updateUI(race_data, 'race');
        }else{
            const class_data = await fetchData(`${API_BASE_URL}classes/${selectedValue}`);
            character_info.charclass = selectedValue;
            CharacterUIUpdater.updateUI(class_data, 'class');
        }
    });
};

export {
    createElementOption,
    populateDropdown,
    fetchData,
    handleSelectionChange,
    API_BASE_URL
};