import '@testing-library/jest-dom';
import CharacterUIUpdater from './create_character_ui';
import { JSDOM } from 'jsdom';

const race_data = {
	"index": "elf",
	"name": "Elf",
	"speed": 30,
	"ability_bonuses": [
		{
			"ability_score": {
				"index": "dex",
				"name": "DEX",
				"url": "/api/ability-scores/dex"
			},
			"bonus": 2
		}
	],
	"age": "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.",
	"alignment": "Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others' freedom as well as their own, and they are more often good than not.",
	"size": "Medium",
	"size_description": "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.",
	"starting_proficiencies": [
		{
			"index": "skill-perception",
			"name": "Skill: Perception",
			"url": "/api/proficiencies/skill-perception"
		}
	],
	"languages": [
		{
			"index": "common",
			"name": "Common",
			"url": "/api/languages/common"
		},
		{
			"index": "elvish",
			"name": "Elvish",
			"url": "/api/languages/elvish"
		}
	],
	"language_desc": "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.",
	"traits": [
		{
			"index": "darkvision",
			"name": "Darkvision",
			"url": "/api/traits/darkvision"
		},
		{
			"index": "fey-ancestry",
			"name": "Fey Ancestry",
			"url": "/api/traits/fey-ancestry"
		},
		{
			"index": "trance",
			"name": "Trance",
			"url": "/api/traits/trance"
		},
		{
			"index": "keen-senses",
			"name": "Keen Senses",
			"url": "/api/traits/keen-senses"
		}
	],
	"subraces": [
		{
			"index": "high-elf",
			"name": "High Elf",
			"url": "/api/subraces/high-elf"
		}
	],
	"url": "/api/races/elf"
}
const class_data = {
	"index": "barbarian",
	"name": "Barbarian",
	"hit_die": 12,
	"proficiency_choices": [
		{
			"desc": "Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival",
			"choose": 2,
			"type": "proficiencies",
			"from": {
				"option_set_type": "options_array",
				"options": [
					{
						"option_type": "reference",
						"item": {
							"index": "skill-animal-handling",
							"name": "Skill: Animal Handling",
							"url": "/api/proficiencies/skill-animal-handling"
						}
					},
					{
						"option_type": "reference",
						"item": {
							"index": "skill-athletics",
							"name": "Skill: Athletics",
							"url": "/api/proficiencies/skill-athletics"
						}
					},
					{
						"option_type": "reference",
						"item": {
							"index": "skill-intimidation",
							"name": "Skill: Intimidation",
							"url": "/api/proficiencies/skill-intimidation"
						}
					},
					{
						"option_type": "reference",
						"item": {
							"index": "skill-nature",
							"name": "Skill: Nature",
							"url": "/api/proficiencies/skill-nature"
						}
					},
					{
						"option_type": "reference",
						"item": {
							"index": "skill-perception",
							"name": "Skill: Perception",
							"url": "/api/proficiencies/skill-perception"
						}
					},
					{
						"option_type": "reference",
						"item": {
							"index": "skill-survival",
							"name": "Skill: Survival",
							"url": "/api/proficiencies/skill-survival"
						}
					}
				]
			}
		}
	],
	"proficiencies": [
		{
			"index": "light-armor",
			"name": "Light Armor",
			"url": "/api/proficiencies/light-armor"
		},
		{
			"index": "medium-armor",
			"name": "Medium Armor",
			"url": "/api/proficiencies/medium-armor"
		},
		{
			"index": "shields",
			"name": "Shields",
			"url": "/api/proficiencies/shields"
		},
		{
			"index": "simple-weapons",
			"name": "Simple Weapons",
			"url": "/api/proficiencies/simple-weapons"
		},
		{
			"index": "martial-weapons",
			"name": "Martial Weapons",
			"url": "/api/proficiencies/martial-weapons"
		},
		{
			"index": "saving-throw-str",
			"name": "Saving Throw: STR",
			"url": "/api/proficiencies/saving-throw-str"
		},
		{
			"index": "saving-throw-con",
			"name": "Saving Throw: CON",
			"url": "/api/proficiencies/saving-throw-con"
		}
	],
	"saving_throws": [
		{
			"index": "str",
			"name": "STR",
			"url": "/api/ability-scores/str"
		},
		{
			"index": "con",
			"name": "CON",
			"url": "/api/ability-scores/con"
		}
	],
	"starting_equipment": [
		{
			"equipment": {
				"index": "explorers-pack",
				"name": "Explorer's Pack",
				"url": "/api/equipment/explorers-pack"
			},
			"quantity": 1
		},
		{
			"equipment": {
				"index": "javelin",
				"name": "Javelin",
				"url": "/api/equipment/javelin"
			},
			"quantity": 4
		}
	],
	"starting_equipment_options": [
		{
			"desc": "(a) a greataxe or (b) any martial melee weapon",
			"choose": 1,
			"type": "equipment",
			"from": {
				"option_set_type": "options_array",
				"options": [
					{
						"option_type": "counted_reference",
						"count": 1,
						"of": {
							"index": "greataxe",
							"name": "Greataxe",
							"url": "/api/equipment/greataxe"
						}
					},
					{
						"option_type": "choice",
						"choice": {
							"desc": "any martial melee weapon",
							"choose": 1,
							"type": "equipment",
							"from": {
								"option_set_type": "equipment_category",
								"equipment_category": {
									"index": "martial-melee-weapons",
									"name": "Martial Melee Weapons",
									"url": "/api/equipment-categories/martial-melee-weapons"
								}
							}
						}
					}
				]
			}
		},
		{
			"desc": "(a) two handaxes or (b) any simple weapon",
			"choose": 1,
			"type": "equipment",
			"from": {
				"option_set_type": "options_array",
				"options": [
					{
						"option_type": "counted_reference",
						"count": 2,
						"of": {
							"index": "handaxe",
							"name": "Handaxe",
							"url": "/api/equipment/handaxe"
						}
					},
					{
						"option_type": "choice",
						"choice": {
							"desc": "any simple weapon",
							"choose": 1,
							"type": "equipment",
							"from": {
								"option_set_type": "equipment_category",
								"equipment_category": {
									"index": "simple-weapons",
									"name": "Simple Weapons",
									"url": "/api/equipment-categories/simple-weapons"
								}
							}
						}
					}
				]
			}
		}
	],
	"class_levels": "/api/classes/barbarian/levels",
	"multi_classing": {
		"prerequisites": [
			{
				"ability_score": {
					"index": "str",
					"name": "STR",
					"url": "/api/ability-scores/str"
				},
				"minimum_score": 13
			}
		],
		"proficiencies": [
			{
				"index": "shields",
				"name": "Shields",
				"url": "/api/proficiencies/shields"
			},
			{
				"index": "simple-weapons",
				"name": "Simple Weapons",
				"url": "/api/proficiencies/simple-weapons"
			},
			{
				"index": "martial-weapons",
				"name": "Martial Weapons",
				"url": "/api/proficiencies/martial-weapons"
			}
		]
	},
	"subclasses": [
		{
			"index": "berserker",
			"name": "Berserker",
			"url": "/api/subclasses/berserker"
		}
	],
	"url": "/api/classes/barbarian"
}
const html_mock = `<div>
<h1 class="header-content">Character Creator</h1>
<div class="body-content">
    <!-- Select Race & Class -->
    <h3>Choose Race and Class</h3>
    <select id="race"></select>
    <select id="class"></select>
    <p><small style="color: red">Warning: Changing these values may undo your changes!</small></p>

    <!-- Basic Details -->
    <h3>Basic Details</h3>
    <label>Character Name</label><br>
    <input type="text" id="characterName"><br>
    <label>Speed</label>
    <p id="characterSpeed"></p>
    <label>Alignment</label>
    <p id="characterAlignment"></p>
    <label>Size</label>
    <p id="characterSize"></p>

    <!-- Proficiency Choices -->
    <h3>Proficiency Choices</h3>
    <div id="proficiencyChoicesContainer"></div>

    <!-- Ability Bonuses -->
    <h3>Ability Bonuses</h3>
    <ul id="abilityBonuses"></ul>

    <!-- Starting Proficiencies -->
    <h3>Starting Proficiencies</h3>
    <ul id="startingProficiencies"></ul>

    <!-- Languages -->
    <h3>Languages</h3>
    <ul id="languages"></ul>

    <!-- Traits -->
    <h3>Traits</h3>
    <ul id="traits"></ul>

    <!-- Subraces -->
    <h3>Subraces</h3>
    <ul id="subraces"></ul>

    <!-- Proficiencies -->
    <h3>Proficiencies</h3>
    <ul id="proficiencies"></ul>

    <!-- Saving Throws -->
    <h3>Saving Throws</h3>
    <ul id="savingThrows"></ul>

    <!-- Starting Equipment -->
    <h3>Starting Equipment</h3>
    <ul id="startingEquipment"></ul>

    <!-- Spellcasting Details -->
    <h3>Spellcasting Details</h3>
    <div id="spellcasting"></div>
</div>

<input type="button" id="accept" value="Accept">
</div>`;

const dom = new JSDOM(`<!doctype html><html><body>${html_mock}</body></html>`);
global.window = dom.window;
global.document = window.document;



describe('CharacterUIUpdater should accept API data to use and make html content', () => {
    beforeEach(() => {
        document.body.innerHTML = html_mock;
      });
    describe('updateUI MAIN FUNCTION', () => {
        const updateUI = CharacterUIUpdater.updateUI;
        it("should call the correct methods for race || class", () => {
            const basicDetails = jest.spyOn(CharacterUIUpdater, 'updateBasicDetails').mockImplementation(() => {});
            updateUI(race_data, 'race'); 
            expect(basicDetails).toHaveBeenCalled();
            basicDetails.mockRestore();
        });
        it("should handle errors thrown by the other methods when characterData is invalid", () => {
            document.body.innerHTML = 'no elements to find';
            let result = updateUI({ name: "joey"}, 'race');
			console.log(result);

            expect(result).toEqual("One or more elements not found");
        });
    });
    describe('updateBasicDetails', () => {
        const updateBasicDetails = CharacterUIUpdater.updateBasicDetails;
        it("should update three elements with API data", () => {
            updateBasicDetails(race_data);

            // html_mock + data in the html elements 
            const expectedHTML = `<div>
<h1 class="header-content">Character Creator</h1>
<div class="body-content">
    <!-- Select Race & Class -->
    <h3>Choose Race and Class</h3>
    <select id="race"></select>
    <select id="class"></select>
    <p><small style="color: red">Warning: Changing these values may undo your changes!</small></p>

    <!-- Basic Details -->
    <h3>Basic Details</h3>
    <label>Character Name</label><br>
    <input type="text" id="characterName"><br>
    <label>Speed</label>
    <p id="characterSpeed">30</p>
    <label>Alignment</label>
    <p id="characterAlignment">Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others' freedom as well as their own, and they are more often good than not.</p>
    <label>Size</label>
    <p id="characterSize">Medium</p>

    <!-- Proficiency Choices -->
    <h3>Proficiency Choices</h3>
    <div id="proficiencyChoicesContainer"></div>

    <!-- Ability Bonuses -->
    <h3>Ability Bonuses</h3>
    <ul id="abilityBonuses"></ul>

    <!-- Starting Proficiencies -->
    <h3>Starting Proficiencies</h3>
    <ul id="startingProficiencies"></ul>

    <!-- Languages -->
    <h3>Languages</h3>
    <ul id="languages"></ul>

    <!-- Traits -->
    <h3>Traits</h3>
    <ul id="traits"></ul>

    <!-- Subraces -->
    <h3>Subraces</h3>
    <ul id="subraces"></ul>

    <!-- Proficiencies -->
    <h3>Proficiencies</h3>
    <ul id="proficiencies"></ul>

    <!-- Saving Throws -->
    <h3>Saving Throws</h3>
    <ul id="savingThrows"></ul>

    <!-- Starting Equipment -->
    <h3>Starting Equipment</h3>
    <ul id="startingEquipment"></ul>

    <!-- Spellcasting Details -->
    <h3>Spellcasting Details</h3>
    <div id="spellcasting"></div>
</div>

<input type="button" id="accept" value="Accept">
</div>`;
            expect(document.body.innerHTML).toEqual(expectedHTML);
        });
        it("should handle errors when characterData is invalid", () => {
			
			expect(() => updateBasicDetails({ oof: "oof" })).toThrow("Missing required characterData properties: speed, alignment, size");
		});
    });
});

describe('updateProficiencyChoices', () => {
	const updateProficiencyChoices = CharacterUIUpdater.updateProficiencyChoices;
	it('creates the correct number of select elements with identical options', () => {
        const proficiencyChoices =
			{
				"desc": "Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival",
				"choose": 2,
				"type": "proficiencies",
				"from": {
					"option_set_type": "options_array",
					"options": [
						{
							"option_type": "reference",
							"item": {
								"index": "skill-animal-handling",
								"name": "Skill: Animal Handling",
								"url": "/api/proficiencies/skill-animal-handling"
							}
						},
						{
							"option_type": "reference",
							"item": {
								"index": "skill-athletics",
								"name": "Skill: Athletics",
								"url": "/api/proficiencies/skill-athletics"
							}
						},
						{
							"option_type": "reference",
							"item": {
								"index": "skill-intimidation",
								"name": "Skill: Intimidation",
								"url": "/api/proficiencies/skill-intimidation"
							}
						},
						{
							"option_type": "reference",
							"item": {
								"index": "skill-nature",
								"name": "Skill: Nature",
								"url": "/api/proficiencies/skill-nature"
							}
						},
						{
							"option_type": "reference",
							"item": {
								"index": "skill-perception",
								"name": "Skill: Perception",
								"url": "/api/proficiencies/skill-perception"
							}
						},
						{
							"option_type": "reference",
							"item": {
								"index": "skill-survival",
								"name": "Skill: Survival",
								"url": "/api/proficiencies/skill-survival"
							}
						}
					]
				}
			}

        updateProficiencyChoices(proficiencyChoices);

        const container = document.getElementById('proficiencyChoicesContainer');
        expect(container.children.length).toBe(proficiencyChoices.choose);
    });
	it("should handle errors when proficiencyChoices is invalid", () => {
			expect(() => updateProficiencyChoices(undefined)).toThrow("Missing proficiency choices!");
	});
});

describe('updateAbilityBonuses', () => {
	const updateAbilityBonuses = CharacterUIUpdater.updateAbilityBonuses;
	let ability_bonuses =  [{
			"ability_score": {
				"index": "dex",
				"name": "DEX",
				"url": "/api/ability-scores/dex"
			},
			"bonus": 2
		}];

	it('creates the correct number of li elements', () => {
        updateAbilityBonuses(ability_bonuses);
		const container = document.getElementById("abilityBonuses");
        expect(document.getElementById(`ability-score-dex`)).toBeTruthy;
		expect(container.childElementCount).toEqual(ability_bonuses.length);
    });
	it("should handle errors when ability_bonuses is invalid", () => {
			expect(() => updateAbilityBonuses(undefined)).toThrow("Missing bonuses data!");
	});
});

describe('updateStartingProficiencies', () => {
	const updateStartingProficiencies = CharacterUIUpdater.updateStartingProficiencies;
	const proficiencies = [
		{
			"index": "light-armor",
			"name": "Light Armor",
			"url": "/api/proficiencies/light-armor"
		},
		{
			"index": "medium-armor",
			"name": "Medium Armor",
			"url": "/api/proficiencies/medium-armor"
		},
		{
			"index": "shields",
			"name": "Shields",
			"url": "/api/proficiencies/shields"
		},
		{
			"index": "simple-weapons",
			"name": "Simple Weapons",
			"url": "/api/proficiencies/simple-weapons"
		},
		{
			"index": "martial-weapons",
			"name": "Martial Weapons",
			"url": "/api/proficiencies/martial-weapons"
		},
		{
			"index": "saving-throw-str",
			"name": "Saving Throw: STR",
			"url": "/api/proficiencies/saving-throw-str"
		},
		{
			"index": "saving-throw-con",
			"name": "Saving Throw: CON",
			"url": "/api/proficiencies/saving-throw-con"
		}
	];
	
	it('creates the correct number of li elements', () => {
        updateStartingProficiencies(proficiencies);
		// define container after it has been modified
		let container = document.getElementById("startingProficiencies");

        expect(document.getElementById(`ability-score-dex`)).toBeTruthy;
		expect(proficiencies.length).toEqual(container.childElementCount);
    });
	it("should check for falsy proficiencies then output a message that there is none", () => {
		updateStartingProficiencies(undefined);
		let container = document.getElementById("startingProficiencies");
		expect(container.children[0].textContent).toEqual("None");
	});
});

describe('updateLanguages', () => {
	const updateLanguages = CharacterUIUpdater.updateLanguages;
	let languages = [
		{
			"index": "common",
			"name": "Common",
			"url": "/api/languages/common"
		},
		{
			"index": "elvish",
			"name": "Elvish",
			"url": "/api/languages/elvish"
		}
	];
	it('creates the correct number of li elements', () => {
		updateLanguages(languages);
		let container = document.getElementById('languages');
		expect(container.childElementCount).toEqual(languages.length);
	});
	it('should check for falsy language then output a message that there is none"', () => {
		updateLanguages(undefined);
		let container = document.getElementById('languages');
		expect(container.children[0].textContent).toEqual("None");
	});
});

describe('updateTraits', () => {
	const updateTraits = CharacterUIUpdater.updateTraits;
	let traits = [
		{
			"index": "darkvision",
			"name": "Darkvision",
			"url": "/api/traits/darkvision"
		},
		{
			"index": "fey-ancestry",
			"name": "Fey Ancestry",
			"url": "/api/traits/fey-ancestry"
		},
		{
			"index": "trance",
			"name": "Trance",
			"url": "/api/traits/trance"
		},
		{
			"index": "keen-senses",
			"name": "Keen Senses",
			"url": "/api/traits/keen-senses"
		}
	];
	it('creates the correct number of li elements', () => {
		updateTraits(traits);
		let container = document.getElementById('traits');
		expect(container.childElementCount).toEqual(traits.length);
	});
	it('should check for falsy traits then output a message that there is none"', () => {
		updateTraits(undefined);
		let container = document.getElementById('traits');
		expect(container.children[0].textContent).toEqual("None");
	});
});

describe('updateSubraces', () => {
	const updateSubraces = CharacterUIUpdater.updateSubraces;
	let subraces = [
		{
			"index": "high-elf",
			"name": "High Elf",
			"url": "/api/subraces/high-elf"
		}
	];
	it('creates the correct number of li elements', () => {
		updateSubraces(subraces);
		let container = document.getElementById('subraces');
		expect(container.childElementCount).toEqual(subraces.length);
	});
	it('should check for falsy subraces then output a message that there is none"', () => {
		updateSubraces(undefined);
		let container = document.getElementById('subraces');
		expect(container.children[0].textContent).toEqual("None");
	});
});

describe('updateProficiencies', () => {
	const updateProficiencies = CharacterUIUpdater.updateProficiencies;
	let proficiencies = [
		{
			"index": "light-armor",
			"name": "Light Armor",
			"url": "/api/proficiencies/light-armor"
		},
		{
			"index": "medium-armor",
			"name": "Medium Armor",
			"url": "/api/proficiencies/medium-armor"
		},
		{
			"index": "shields",
			"name": "Shields",
			"url": "/api/proficiencies/shields"
		},
		{
			"index": "simple-weapons",
			"name": "Simple Weapons",
			"url": "/api/proficiencies/simple-weapons"
		},
		{
			"index": "martial-weapons",
			"name": "Martial Weapons",
			"url": "/api/proficiencies/martial-weapons"
		},
		{
			"index": "saving-throw-str",
			"name": "Saving Throw: STR",
			"url": "/api/proficiencies/saving-throw-str"
		},
		{
			"index": "saving-throw-con",
			"name": "Saving Throw: CON",
			"url": "/api/proficiencies/saving-throw-con"
		}
	];
	it('creates the correct number of li elements', () => {
		updateProficiencies(proficiencies);
		let container = document.getElementById('proficiencies');
		expect(container.childElementCount).toEqual(proficiencies.length);
	});
	it('should check for falsy proficiencies then output a message that there is none"', () => {
		updateProficiencies(undefined);
		let container = document.getElementById('proficiencies');
		expect(container.children[0].textContent).toEqual("None");
	});
});

describe('updateSavingThrows', () => {
	const updateSavingThrows = CharacterUIUpdater.updateSavingThrows;
	let savingThrows = [
		{
			"index": "str",
			"name": "STR",
			"url": "/api/ability-scores/str"
		},
		{
			"index": "con",
			"name": "CON",
			"url": "/api/ability-scores/con"
		}
	];
	it('creates the correct number of li elements', () => {
		updateSavingThrows(savingThrows);
		let container = document.getElementById('savingThrows');
		expect(container.childElementCount).toEqual(savingThrows.length);
	});
	it('should check for falsy savingThrows then output a message that there is none"', () => {
		updateSavingThrows(undefined);
		let container = document.getElementById('savingThrows');
		expect(container.children[0].textContent).toEqual("None");
	});
});

describe('updateStartingEquipment', () => {
	const updateStartingEquipment = CharacterUIUpdater.updateStartingEquipment;
	let equipment = [
		{
			"equipment": {
				"index": "explorers-pack",
				"name": "Explorer's Pack",
				"url": "/api/equipment/explorers-pack"
			},
			"quantity": 1
		},
		{
			"equipment": {
				"index": "javelin",
				"name": "Javelin",
				"url": "/api/equipment/javelin"
			},
			"quantity": 4
		}
	];
	it('creates the correct number of li elements', () => {
		updateStartingEquipment(equipment);
		let container = document.getElementById('startingEquipment');
		expect(container.childElementCount).toEqual(equipment.length);
	});
	it('should check for falsy equipment then output a message that there is none"', () => {
		updateStartingEquipment(undefined);
		let container = document.getElementById('startingEquipment');
		expect(container.children[0].textContent).toEqual("None x0");
	});
});

describe('updateSpellCasting', () => {
	const updateSpellCasting = CharacterUIUpdater.updateSpellCasting;
	let spellcasting = {
		"level": 1,
		"spellcasting_ability": {
			"index": "int",
			"name": "INT",
			"url": "/api/ability-scores/int"
		},
		"info": [
			{
				"name": "Cantrips",
				"desc": [
					"At 1st level, you know three cantrips of your choice from the wizard spell list. You learn additional wizard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Wizard table."
				]
			},
			{
				"name": "Spellbook",
				"desc": [
					"At 1st level, you have a spellbook containing six 1st- level wizard spells of your choice. Your spellbook is the repository of the wizard spells you know, except your cantrips, which are fixed in your mind."
				]
			},
			{
				"name": "Preparing and Casting Spells",
				"desc": [
					"The Wizard table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.",
					"You prepare the list of wizard spells that are available for you to cast. To do so, choose a number of wizard spells from your spellbook equal to your Intelligence modifier + your wizard level (minimum of one spell). The spells must be of a level for which you have spell slots.",
					"For example, if you're a 3rd-level wizard, you have four 1st-level and two 2nd-level spell slots. With an Intelligence of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination, chosen from your spellbook. If you prepare the 1st-level spell magic missile, you can cast it using a 1st-level or a 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.",
					"You can change your list of prepared spells when you finish a long rest. Preparing a new list of wizard spells requires time spent studying your spellbook and memorizing the incantations and gestures you must make to cast the spell: at least 1 minute per spell level for each spell on your list."
				]
			},
			{
				"name": "Spellcasting Ability",
				"desc": [
					"Intelligence is your spellcasting ability for your wizard spells, since you learn your spells through dedicated study and memorization. You use your Intelligence whenever a spell refers to your spellcasting ability. In addition, you use your Intelligence modifier when setting the saving throw DC for a wizard spell you cast and when making an attack roll with one.",
					"Spell save DC = 8 + your proficiency bonus + your Intelligence modifier.",
					"Spell attack modifier = your proficiency bonus + your Intelligence modifier."
				]
			},
			{
				"name": "Ritual Casting",
				"desc": [
					"You can cast a wizard spell as a ritual if that spell has the ritual tag and you have the spell in your spellbook. You don't need to have the spell prepared."
				]
			},
			{
				"name": "Spellcasting Focus",
				"desc": [
					"You can use an arcane focus as a spellcasting focus for your wizard spells."
				]
			}
		]
	}
	it('creates the correct number of li elements', () => {
		updateSpellCasting(spellcasting);
		let container = document.getElementById('spellcasting');
		expect(container.getElementsByTagName('li').length).toEqual(spellcasting.info.length);
	});
	
	it('should check for falsy spellcasting then output a message that there is none"', () => {
		updateSpellCasting(undefined);
		let container = document.getElementById('spellcasting');
		expect(container.children[0].textContent).toEqual("No Spell Casting Provided");
	});
});