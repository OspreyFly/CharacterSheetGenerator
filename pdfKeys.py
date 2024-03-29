from enum import Enum


class General(Enum):
    PLAYERNAME = "PlayerName"
    CHARACTERNAME = "CharacterName"
    CLASSLEVEL = "ClassLevel"
    RACE = "Race "
    ALIGNMENT = "Alignment"
    BACKGROUND = "Background"

    PROFBONUS = "ProfBonus"
    AC = "AC"
    INITIATIVE = "Initiative"
    SPEED = "Speed"
    HPMAX = "HPMax"
    HPCURRENT = "HPCurrent"
    HPTEMP = "HPTemp"
    HITDICETOTAL = "HDTotal"

    # Currency
    CP = "CP"
    SP = "SP"
    EP = "EP"
    GP = "GP"
    PP = "PP"  # platinum pieces

    # Inventory + Feats
    ATTACKSDESCR = "AttacksSpellcasting"
    PPERCEPTION = "Passive"
    PROFDESCR = "ProficienciesLang"
    EQUIPDESCR = "Equipment"
    FEATDESCR = "Features and Traits"

    WEAPONNAME1 = "Wpn Name"
    WEAPONBONUS1 = "Wpn1 AtkBonus"
    WEAPONDAMAGE1 = "Wpn1 Damage"
    WEAPONNAME2 = "Wpn Name 2"
    WEAPONBONUS2 = "Wpn2 AtkBonus "
    WEAPONDAMAGE2 = "Wpn2 Damage "
    WEAPONNAME3 = "Wpn Name 3"
    WEAPONBONUS3 = "Wpn3 AtkBonus  "
    WEAPONDAMAGE3 = "Wpn3 Damage "
    FEATSTRAITS = "Feat+Traits"  # PAGE 1 OR 2?


class Stats(Enum):
    # Stat Spread and Saving Throws (NEED TO FIND PROF CHECKBOX FOR SAVING THROWS)
    STR = "STR"
    STRMOD = "STRmod"
    STSTR = "ST Strength"
    CON = "CON"
    CONMOD = "CONmod"
    STCON = "ST Constitution"
    DEX = "DEX"
    DEXMOD = "DEXmod "
    STDEX = "ST Dexterity"
    INT = "INT"
    INTMOD = "INTmod"
    STINT = "ST Intelligence"
    WIS = "WIS"
    WISMOD = "WISmod"
    STWIS = "ST Wisdom"
    CHA = "CHA"
    CHAMOD = "CHamod"
    STCHA = "ST Charisma"

    # Skills (NEED TO FIND PROF CHECK BOX)
    ACROBATICS = "Acrobatics"
    ANIMAL = "Animal"
    ATHLETICS = "Athletics"
    DECEPTION = "Deception "
    HISTORY = "History "
    INSIGHT = "Insight"
    INTIMIDATION = "Intimidation"
    INVESTIGATION = "Investigation "
    ARCANA = "Arcana"
    PERCEPTION = "Perception "
    NATURE = "Nature"
    PERFORMANCE = "Performance"
    MEDICINE = "Medicine"
    RELIGION = "Religion"
    STEALTH = "Stealth "
    PERSUASION = "Persuasion"
    SLEIGHT = "SleightofHand"
    SURVIVAL = "Survival"


class Spells(Enum):
    # Spells Page
    SPELLCLASS = "Spellcasting Class 2"
    SPELLCASTABILITY = "SpellcastingAbility 2"
    SPELLSAVEDC = "SpellSaveDC  2"
    SPELLATTACKBONUS = "SpellAtkBonus 2"

    SLOTTOTAL1 = "SlotsTotal 19"
    SLOTREMAIN1 = "SlotsRemaining 19"
    SLOTTOTAL2 = "SlotsTotal 20"
    SLOTREMAIN2 = "SlotsRemaining 20"
    SLOTTOTAL3 = "SlotsTotal 21"
    SLOTREMAIN3 = "SlotsRemaining 21"
    SLOTTOTAL4 = "SlotsTotal 22"
    SLOTREMAIN4 = "SlotsRemaining 22"
    SLOTTOTAL5 = "SlotsTotal 23"
    SLOTREMAIN5 = "SlotsRemaining 23"
    SLOTTOTAL6 = "SlotsTotal 24"
    SLOTREMAIN6 = "SlotsRemaining 24"
    SLOTTOTAL7 = "SlotsTotal 25"
    SLOTREMAIN7 = "SlotsRemaining 25"
    SLOTTOTAL8 = "SlotsTotal 26"
    SLOTREMAIN8 = "SlotsRemaining 26"
    SLOTTOTAL9 = "SlotsTotal 27"
    SLOTREMAIN9 = "SlotsRemaining 27"

    SPELL1014 = "Spells 1014"
    SPELL1015 = "Spells 1015"
    SPELL1016 = "Spells 1016"
    SPELL1017 = "Spells 1017"
    SPELL1018 = "Spells 1018"
    SPELL1019 = "Spells 1019"
    SPELL1020 = "Spells 1020"
    SPELL1021 = "Spells 1021"
    SPELL1022 = "Spells 1022"
    SPELL1023 = "Spells 1023"
    SPELL1024 = "Spells 1024"
    SPELL1025 = "Spells 1025"
    SPELL1026 = "Spells 1026"
    SPELL1027 = "Spells 1027"
    SPELL1028 = "Spells 1028"
    SPELL1029 = "Spells 1029"
    SPELL1030 = "Spells 1030"
    SPELL1031 = "Spells 1031"
    SPELL1032 = "Spells 1032"
    SPELL1033 = "Spells 1033"
    SPELL1034 = "Spells 1034"
    SPELL1035 = "Spells 1035"
    SPELL1036 = "Spells 1036"
    SPELL1037 = "Spells 1037"
    SPELL1038 = "Spells 1038"
    SPELL1039 = "Spells 1039"
    SPELL1040 = "Spells 1040"
    SPELL1041 = "Spells 1041"
    SPELL1042 = "Spells 1042"
    SPELL1043 = "Spells 1043"
    SPELL1044 = "Spells 1044"
    SPELL1045 = "Spells 1045"
    SPELL1046 = "Spells 1046"
    SPELL1047 = "Spells 1047"
    SPELL1048 = "Spells 1048"
    SPELL1049 = "Spells 1049"
    SPELL1050 = "Spells 1050"
    SPELL1051 = "Spells 1051"
    SPELL1052 = "Spells 1052"
    SPELL1053 = "Spells 1053"
    SPELL1054 = "Spells 1054"
    SPELL1055 = "Spells 1055"
    SPELL1056 = "Spells 1056"
    SPELL1057 = "Spells 1057"
    SPELL1058 = "Spells 1058"
    SPELL1059 = "Spells 1059"
    SPELL1060 = "Spells 1060"
    SPELL1061 = "Spells 1061"
    SPELL1062 = "Spells 1062"
    SPELL1063 = "Spells 1063"
    SPELL1064 = "Spells 1064"
    SPELL1065 = "Spells 1065"
    SPELL1066 = "Spells 1066"
    SPELL1067 = "Spells 1067"
    SPELL1068 = "Spells 1068"
    SPELL1069 = "Spells 1069"
    SPELL1070 = "Spells 1070"
    SPELL1071 = "Spells 1071"
    SPELL1072 = "Spells 1072"
    SPELL1073 = "Spells 1073"
    SPELL1074 = "Spells 1074"
    SPELL1075 = "Spells 1075"
    SPELL1076 = "Spells 1076"
    SPELL1077 = "Spells 1077"
    SPELL1078 = "Spells 1078"
    SPELL1079 = "Spells 1079"
    SPELL1080 = "Spells 1080"
    SPELL1081 = "Spells 1081"
    SPELL1082 = "Spells 1082"
    SPELL1083 = "Spells 1083"
    SPELL1084 = "Spells 1084"
    SPELL1085 = "Spells 1085"
    SPELL1086 = "Spells 1086"
    SPELL1087 = "Spells 1087"
    SPELL1088 = "Spells 1088"
    SPELL1089 = "Spells 1089"
    SPELL1090 = "Spells 1090"
    SPELL1091 = "Spells 1091"
    SPELL1092 = "Spells 1092"
    SPELL1093 = "Spells 1093"
    SPELL1094 = "Spells 1094"
    SPELL1095 = "Spells 1095"
    SPELL1096 = "Spells 1096"
    SPELL1097 = "Spells 1097"
    SPELL1098 = "Spells 1098"
    SPELL1099 = "Spells 1099"
    SPELL10100 = "Spells 10100"
    SPELL10101 = "Spells 10101"
    SPELL10102 = "Spells 10102"
    SPELL10103 = "Spells 10103"
    SPELL10104 = "Spells 10104"
    SPELL10105 = "Spells 10105"
    SPELL10106 = "Spells 10106"
    SPELL10107 = "Spells 10107"
    SPELL10108 = "Spells 10108"
    SPELL10109 = "Spells 10109"
    SPELL101010 = "Spells 101010"
    SPELL101011 = "Spells 101011"
    SPELL101012 = "Spells 101012"
    SPELL101013 = "Spells 101013"

    """ CB11 = "Check Box 11"
    CB12 = "Check Box 12"
    CB13 = "Check Box 13"
    CB14 = "Check Box 14"
    CB15 = "Check Box 15"
    CB16 = "Check Box 16"
    CB17 = "Check Box 17"
    CB18 = "Check Box 18"
    CB19 = "Check Box 19"
    CB20 = "Check Box 20"
    CB21 = "Check Box 21"
    CB22 = "Check Box 22"
    CB23 = "Check Box 23"
    CB24 = "Check Box 24"
    CB25 = "Check Box 25"
    CB26 = "Check Box 26"
    CB27 = "Check Box 27"
    CB28 = "Check Box 28"
    CB29 = "Check Box 29"
    CB30 = "Check Box 30"
    CB31 = "Check Box 31"
    CB32 = "Check Box 32"
    CB33 = "Check Box 33"
    CB34 = "Check Box 34"
    CB35 = "Check Box 35"
    CB36 = "Check Box 36"
    CB37 = "Check Box 37"
    CB38 = "Check Box 38"
    CB39 = "Check Box 39"
    CB40 = "Check Box 40"

    CB251 = "Check Box 251"

    CB309 = "Check Box 309"
    CB310 = "Check Box 310"
    CB313 = "Check Box 313"
    CB314 = "Check Box 314"
    CB315 = "Check Box 315"
    CB316 = "Check Box 316"
    CB317 = "Check Box 317"
    CB318 = "Check Box 318"
    CB319 = "Check Box 319"
    CB320 = "Check Box 320"
    CB321 = "Check Box 321"
    CB322 = "Check Box 322"
    CB323 = "Check Box 323"
    CB324 = "Check Box 324"
    CB325 = "Check Box 325"
    CB326 = "Check Box 326"
    CB327 = "Check Box 327"

    CB3010 = "Check Box 3010"
    CB3011 = "Check Box 3011"
    CB3012 = "Check Box 3012"
    CB3013 = "Check Box 3013"
    CB3014 = "Check Box 3014"
    CB3015 = "Check Box 3015"
    CB3016 = "Check Box 3016"
    CB3017 = "Check Box 3017"
    CB3018 = "Check Box 3018"
    CB3019 = "Check Box 3019"
    CB3020 = "Check Box 3020"
    CB3021 = "Check Box 3021"
    CB3022 = "Check Box 3022"
    CB3023 = "Check Box 3023"
    CB3024 = "Check Box 3024"
    CB3025 = "Check Box 3025"
    CB3026 = "Check Box 3026"
    CB3027 = "Check Box 3027"
    CB3028 = "Check Box 3028"
    CB3029 = "Check Box 3029"
    CB3030 = "Check Box 3030"
    CB3031 = "Check Box 3031"
    CB3032 = "Check Box 3032"
    CB3033 = "Check Box 3033"
    CB3034 = "Check Box 3034"
    CB3035 = "Check Box 3035"
    CB3036 = "Check Box 3036"
    CB3037 = "Check Box 3037"
    CB3038 = "Check Box 3038"
    CB3039 = "Check Box 3039"
    CB3040 = "Check Box 3040"
    CB3041 = "Check Box 3041"
    CB3042 = "Check Box 3042"
    CB3043 = "Check Box 3043"
    CB3044 = "Check Box 3044"
    CB3045 = "Check Box 3045"
    CB3046 = "Check Box 3046"
    CB3047 = "Check Box 3047"
    CB3048 = "Check Box 3048"
    CB3049 = "Check Box 3049"
    CB3050 = "Check Box 3050"
    CB3051 = "Check Box 3051"
    CB3052 = "Check Box 3052"
    CB3053 = "Check Box 3053"
    CB3054 = "Check Box 3054"
    CB3055 = "Check Box 3055"
    CB3056 = "Check Box 3056"
    CB3057 = "Check Box 3057"
    CB3058 = "Check Box 3058"
    CB3059 = "Check Box 3059"
    CB3060 = "Check Box 3060"
    CB3061 = "Check Box 3061"
    CB3062 = "Check Box 3062"
    CB3063 = "Check Box 3063"
    CB3064 = "Check Box 3064"
    CB3065 = "Check Box 3065"
    CB3066 = "Check Box 3066"
    CB3067 = "Check Box 3067"
    CB3068 = "Check Box 3068"
    CB3069 = "Check Box 3069"
    CB3070 = "Check Box 3070"
    CB3071 = "Check Box 3071"
    CB3072 = "Check Box 3072"
    CB3073 = "Check Box 3073"
    CB3074 = "Check Box 3074"
    CB3075 = "Check Box 3075"
    CB3076 = "Check Box 3076"
    CB3077 = "Check Box 3077"
    CB3078 = "Check Box 3078"
    CB3079 = "Check Box 3079"
    CB3080 = "Check Box 3080"
    CB3081 = "Check Box 3081"
    CB3082 = "Check Box 3082"
    CB3083 = "Check Box 3083" """
