import CharacterUIUpdater from "./create_character_ui.js";
const updateUI = CharacterUIUpdater.updateUI;
const API_BASE_URL = "https://www.dnd5eapi.co/api/";

const createElementOption = (value, text) => {
    const option = new Option(text, value);
    return option;
};

const populateDropdown = (selectElement, options) => {
    options.forEach(option => selectElement.add(createElementOption(option, option)));
};

const fetchAndDisplayData = async (url, displayFunction) => {
    try {
        const response = await axios.get(url);
        displayFunction(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const handleSelectionChange = (selectElement) => {
    selectElement.addEventListener('change', () => {
        const selectedValue = selectElement.value.toLowerCase();
        if(selectElement.id === "race"){
            fetchAndDisplayData(`${API_BASE_URL}races/${selectedValue}`, updateUI);
        }else{
            fetchAndDisplayData(`${API_BASE_URL}classes/${selectedValue}`, updateUI);
        }
    });
};

export {
    populateDropdown,
    fetchAndDisplayData,
    handleSelectionChange,
    API_BASE_URL
};