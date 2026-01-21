const debug = false;
const SAVE_KEY = 'apocalypse_game_save';
const TICK_RATE = 1000; // 1 second

const initialGameState = {
  resources: {
    food: {
      id: 'food',
      name: 'Food',
      amount: 10,
      max: 100,
      perSecond: 0
    },
    water: {
      id: 'water',
      name: 'Water',
      amount: 10,
      max: 100,
      perSecond: 0
    },
    wood: {
      id: 'wood',
      name: 'Wood',
      amount: 0,
      max: 100,
      perSecond: 0
    },
    scrap: {
      id: 'scrap',
      name: 'Scrap',
      amount: 0,
      max: 100,
      perSecond: 0
    },
    electronics: {
      id: 'electronics',
      name: 'Electronics',
      amount: 0,
      max: 100,
      perSecond: 0
    },
    meds: {
      id: 'meds',
      name: 'Medical Supplies',
      amount: 0,
      max: 100,
      perSecond: 0
    },
    electricity: {
      id: 'electricity',
      name: 'Electricity',
      amount: 0,
      max: 100,
      perSecond: 0
    },
    researchPoints: {
      id: 'researchPoints',
      name: 'Research Points',
      amount: 0,
      max: 100,
      perSecond: 0
    },
    adminPoints: {
      id: 'adminPoints',
      name: 'Administrative Points',
      amount: 0,
      max: 100,
      perSecond: 0
    },
    weapons: {
      id: 'weapons',
      name: 'Weapons',
      amount: 0,
      max: 100,
      perSecond: 0
    },
    soldiers: {
      id: 'soldiers',
      name: 'Soldiers',
      amount: 0,
      max: 100,
      perSecond: 0
    },
    defensePower: { // New resource
      id: 'defensePower',
      name: 'Defense Power',
      amount: 0, // Calculated dynamically
      perSecond: 0 // Static, no per-second change
    },
  },
  improvements: {
    silo: {
      id: 'silo',
      name: 'Food Silo',
      cost: { wood: 75, scrap: 80 },
      raises: 'food',
      raisesBy: 125,
      amount: 0,
      description: 'Increases food max by 125'
    },
	    watertanks: {
      id: 'watertanks',
      name: 'Water Tanks',
      cost: { wood: 50, scrap: 50 },
      raises: 'water',
      raisesBy: 50,
      amount: 0,
      description: 'Increases water max by 50'
    },  
    scrapyard: {
      id: 'scrapyard',
      name: 'Scrapyard',
      cost: { wood: 35, water: 80 },
      raises: 'scrap',
      raisesBy: 55,
      amount: 0,
      description: 'Increases scrap max by 55'
    },
    woodpile: {
      id: 'woodpile',
      name: 'Wood Pile',
      cost: { wood: 35, scrap: 15 },
      raises: 'wood',
      raisesBy: 85,
      amount: 0,
      description: 'Increases wood max by 85'
    },
    safehouse: {
      id: 'safehouse',
      name: 'Safe House',
      cost: { wood: 35, water: 80 },
      raises: 'electronics',
      raisesBy: 25,
      amount: 0,
      description: 'Increases electronics max by 25'
    },
    upgradeBatteries: {
      id: 'upgradeBatteries',
      name: 'Upgrade Batteries',
      cost: { electronics: 50, scrap: 75 },
      raises: 'electricity',
      raisesBy: 25,
      amount: 0,
      description: 'Increases electricity storage capacity by 25'
    },
    medicineCabinet: {
      id: 'medicineCabinet',
      name: 'Medicine Cabinet',
      cost: { wood: 250, scrap: 375 },
      raises: 'meds',
      raisesBy: 45,
      amount: 0,
      description: 'Increases medicine storage capacity by 45'
    },
    library: {
      id: 'library',
      name: 'Upgrade Library',
      cost: { electronics: 200, scrap: 550, wood: 560 },
      raises: 'researchPoints',
      raisesBy: 125,
      amount: 0,
      description: 'Increases research points storage capacity by 125'
    },
    filingCabinet: {
      id: 'filingCabinet',
      name: 'Filing Cabinets',
      cost: { electronics: 600, scrap: 1550, wood: 960 },
      raises: 'adminPoints',
      raisesBy: 75,
      amount: 0,
      description: 'Increases administrative points storage capacity by 75'
    },
    readStrategyBooks: {
      id: 'readStrategyBooks',
      name: 'Read Strategy Books',
      cost: { researchPoints: 550 },
      raises: 'maxSoldiers',
      raisesBy: 25,
      amount: 0,
      description: 'Increases barracks capacity by 25'
    },
    extendArmory: {
      id: 'extendArmory',
      name: 'Extend Armory',
      cost: { wood: 2950, scrap: 3375 },
      raises: 'maxWeapons',
      raisesBy: 25,
      amount: 0,
      description: 'Increases weapon storage capacity by 25'
    },
    storageFacilities: {
      id: 'storageFacilities',
      name: 'Storage Facilities',
      cost: { wood: 2550, scrap: 3940 },
      raisesMultiple: {
        wood: 1000,
        food: 1000,
        water: 1000,
        scrap: 1000,
        electronics: 1000
      },
      amount: 0,
      description: 'Increases storage capacity for wood, food, water, scrap, and electronics by 1000 each'
    },
    defenseTurrets: { // New improvement
      id: 'defenseTurrets',
      name: 'Defense Turrets',
      cost: { scrap: 4500, electronics: 2700 },
      raises: 'defensePower',
      raisesBy: 0.05,
      consumes: { electricity: 0.02 },
      amount: 0,
      description: 'You add defense turrets in strategic places around your settlement which will help fending off attackers. Increases defense power by 0.05.'
    },
	militaryAcademy: {
	  id: 'militaryAcademy',
	  name: 'Military Academy',
	  cost: { wood: 5550, scrap: 9940, researchPoints: 500 },
	  raisesMultiple: {
      weapons: 300, // Adjusted to match resource ID
      soldiers: 300 // Adjusted to match resource ID
	},
  amount: 0,
  description: 'Increases the maximum capacity for soldiers and weapons by 300 each'
	},
	electricFence: { // New improvement
      id: 'electricFence',
      name: 'Electric Fence',
      cost: { scrap: 9500, electronics: 5700 },
      raises: 'defensePower',
      raisesBy: 0.15,
      consumes: { electricity: 0.15 },
      amount: 0,
      description: 'You add electric fences around your settlement to fend off attackers. They are quite effective, providing 0.15 defense power per fence, but costly to build and obviously consume electricity (0.15/s).'
    },
	undergroundStorage: { // New improvement
      id: 'undergroundStorage',
      name: 'Underground Storage',
      cost: { scrap: 12500, wood: 25315 },
      raisesMultiple: {
        wood: 7000,
        food: 7000,
        water: 7000,
        scrap: 7000,
        electronics: 7000
      },
      consumes: { electricity: 0.15 },
      amount: 0,
      description: 'Increases storage capacity for wood, food, water, scrap, and electronics by 7000 each. As they are underground, they consume electricity to power the lights.'
    },
	largeBatteries: {
      id: 'largeBatteries',
      name: 'Large Batteries',
      cost: { electronics: 85, scrap: 73 }, //cost: { electronics: 8500, scrap: 7380 },
      raises: 'electricity',
      raisesBy: 250,
      amount: 0,
      description: 'Bigger and better batteries store more electricity. And cost more to build.'
    },
    extraLargeBatteries: {
      id: 'extraLargeBatteries',
      name: 'Extra Large Batteries',
      cost: { electronics: 15000, scrap: 1500 },
      raises: 'electricity',
      raisesBy: 1000,
      amount: 0,
      description: 'Extra bigger and better batteries store more electricity. And cost more to build.'
    },
  },
  buildings: {
    garden: {
      id: 'garden',
      name: 'Small Garden',
      cost: { wood: 10, scrap: 5 },
      provides: { food: 0.1 },
      amount: 0,
      description: 'A small plot to grow food'
    },
    waterCollector: {
      id: 'waterCollector',
      name: 'Water Collector',
      cost: { wood: 15, scrap: 10 },
      provides: { water: 0.2 },
      amount: 0,
      description: 'Collects rainwater'
    },
    scrapcollector: {
      id: 'scrapcollector',
      name: 'Scrap Collection Point',
      cost: { wood: 20 },
      provides: { scrap: 0.1 },
      consumes: { food: 0.02 },
      amount: 0,
      description: 'Gather scrap from the wasteland'
    },
    lumberyard: {
      id: 'lumberyard',
      name: 'Lumber Yard',
      cost: { scrap: 15 },
      provides: { wood: 0.15 },
      consumes: { food: 0.03 },
      amount: 0,
      description: 'Collects wood from the surrounding area'
    },
    tinkerer: {
      id: 'tinkerer',
      name: 'Tinkerers\' Hut',
      cost: { scrap: 35 },
      provides: { electronics: 0.05 },
      consumes: { food: 0.02, electricity: 0.05, scrap: 0.02 },
      amount: 0,
      description: 'Collects and strips electronical devices from the surrounding area'
    },
    trailer: {
      id: 'trailer',
      name: 'Trailer',
      cost: { scrap: 10, electronics: 15, food: 25 },
      provides: { scrap: 0.05 },
      consumes: { food: 0.02 },
      amount: 0,
      description: 'Provides living space for fellow survivors who in return gather scrap'
    },
    medlab: {
      id: 'medlab',
      name: 'Medical Lab',
      cost: { wood: 25, scrap: 40, electronics: 15, water: 25 },
      provides: { meds: 0.02 },
      consumes: { food: 0.03 },
      amount: 0,
      description: 'Medical Scientists in our community create needed medical supplies'
    },
    generator: {
      id: 'generator',
      name: 'Makeshift Generators',
      cost: { wood: 50, scrap: 30, electronics: 20 },
      provides: { electricity: 0.25 },
      consumes: { wood: 0.5 },
      amount: 0,
      description: 'Burns wood to power turbines that generate electricity for the community'
    },
    lumberjackcamp: {
      id: 'lumberjackcamp',
      name: 'Outpost: Lumberjack Camp',
      cost: { wood: 150, scrap: 230, electronics: 60 },
      provides: { wood: 0.35 },
      consumes: { electricity: 0.05, food: 0.05, water: 0.01 },
      amount: 0,
      description: 'A couple of lumberjacks made a camp in a nearby forest, increasing wood income by 0.35 per second. Expensive to build and maintain though.'
    },
    gatherers: {
      id: 'gatherers',
      name: 'Gatherer Guild',
      cost: { wood: 250, scrap: 330, electronics: 10 },
      provides: { wood: 0.18, electronics: 0.12, scrap: 0.32 },
      consumes: { electricity: 0.05, food: 0.3, water: 0.2 },
      amount: 0,
      description: 'A group of community members specialising in gathering more and better resources from nearby sources. They provide wood, electronics and scrap.'
    },
    pigfarm: {
      id: 'pigfarm',
      name: 'Pig Farm',
      cost: { wood: 550, scrap: 230 },
      provides: { food: 0.45 },
      consumes: { water: 0.75 },
      amount: 0,
      description: 'Pigs are tasty and a nice addition to your ever rising food needs. They need a lot of water, though.'
    },
    solarpanel: {
      id: 'solarpanel',
      name: 'Solar Panels',
      cost: { electronics: 550, scrap: 330 },
      provides: { electricity: 0.35 },
      amount: 0,
      description: 'Solar panels provide electricity. As long as the sun is shining.'
    },
    windmill: {
      id: 'windmill',
      name: 'Windmills',
      cost: { electronics: 350, scrap: 530 },
      provides: { electricity: 0.25 },
      amount: 0,
      description: 'Windmills provide electricity. As long as there is wind (at least 3m/s).'
    },
    desal: {
      id: 'desal',
      name: 'Desalination Plant',
      cost: { electronics: 350, scrap: 530, wood: 200 },
      provides: { water: 0.45 },
      consumes: { electricity: 0.02 },
      amount: 0,
      description: 'Engineers have put together a little doodahwhatchamacallit that separates water and salt from saltwater.'
    },
    school: {
      id: 'school',
      name: 'School',
      cost: { wood: 550, scrap: 230, electronics: 250 },
      provides: { researchPoints: 0.25 },
      consumes: { electricity: 0.05 },
      amount: 0,
      description: 'In the school, adults and children alike learn the necessary skills to survive in this post-apocalyptic world. This creates research points which are a necessary resource for some improvements.'
    },
    townhall: {
      id: 'townhall',
      name: 'Town Hall',
      cost: { electronics: 650, scrap: 1330, wood: 900 },
      provides: { adminPoints: 0.02 },
      consumes: { electricity: 0.05 },
      amount: 0,
      description: 'Such a big community needs structure. In the town hall, the elders provide that structure. Creates Administrative Points, a resource needed for some improvements.'
    },
    apartmentComplex: {
      id: 'apartmentComplex',
      name: 'Apartment Complex',
      cost: { electronics: 250, scrap: 1230, wood: 1400 },
      provides: { scrap: 0.05, wood: 0.05, electronics: 0.05 },
      consumes: { electricity: 0.15, food: 0.15, water: 0.05 }, 
      amount: 0,
      description: 'Trailers are nice and shiny but actual proper buildings are nicer and shinier. Apartment complexes house more people, more people means more scavengers to bring home scrap, wood and electronics. More people also means mor needs, though.'
    },
    waterSupplySystem: {
      id: 'waterSupplySystem',
      name: 'Water Supply',
      cost: { electronics: 550, scrap: 2530, wood: 800 },
      provides: { water: 0.85 },
      consumes: { electricity: 0.15 },
      amount: 0,
      description: 'A town like yours needs a proper water supply system including pumps, canalization and all the trimmings and fixings.'
    },
    armory: {
      id: 'armory',
      name: 'Armory',
      cost: { electronics: 850, scrap: 2230, wood: 2400 },
      provides: { weapons: 0.02 },
      consumes: { electricity: 0.25, wood: 0.08, scrap: 0.15, electronics: 0.04 },
      amount: 0,
      description: 'Engineers make weapons from scrap, wood, electronics and other materials.'
    },
    barracks: {
      id: 'barracks',
      name: 'Barracks',
      cost: { electronics: 350, scrap: 2530, wood: 2170 },
      provides: { soldiers: 0.02 },
      consumes: { electricity: 0.15, food: 0.4, water: 0.05 },
      amount: 0,
      description: 'Trains soldiers to defend your growing community against looters and pillagers.'
    },
    expeditionHQ: {
      id: 'expeditionHQ',
      name: 'Expedition HQ',
      cost: { electronics: 2250, scrap: 4530, wood: 7170 },
      consumes: { electricity: 1.65 },
      amount: 0,
      description: 'You need this HQ to plan expeditions and raids. This can be built only once.'
    },
    waterFromTheRiver: {
      id: 'waterFromTheRiver',
      name: 'River Pump',
      cost: { electronics: 1550, scrap: 4530, wood: 1300 },
      provides: { water: 1.25 },
      consumes: { electricity: 0.35 },
      amount: 0,
      description: 'A town like yours needs a lot of water. Your engineers devised a system to pump and filter water right from a nearby river.'
    },
    powerFromTheRiver: {
      id: 'powerFromTheRiver',
      name: 'Water Power',
      cost: { electronics: 4550, scrap: 7530, wood: 4300 },
      provides: { electricity: 3.25 },
      amount: 0,
      description: 'Creates a lot of electricity by letting the river power a generator turbine.'
    },
    scrapHunters: {
      id: 'scrapHunters',
      name: 'Scrap Hunters',
      cost: { electronics: 3550, scrap: 2530, wood: 1300 },
      provides: { scrap: 0.85 },
      consumes: { food: 0.4, water: 0.25, electricity: 0.25 },
      amount: 0,
      description: 'Specialised scavengers bring back bigger amounts of scrap, however, the building is costly to build and maintain.'
    },
    hugeFarm: {
      id: 'hugeFarm',
      name: 'Huge Farm',
      cost: { scrap: 4530, wood: 5300, water: 1590 },
      provides: { food: 1.35 },
      consumes: { water: 0.85, electricity: 0.25 },
      amount: 0,
      description: 'Big farm with big yield. And big costs to build and maintain.'
    },
    technicianHub: {
      id: 'technicianHub',
      name: 'Technician Hub',
      cost: { electronics: 5000, scrap: 3450, wood: 5210 }, 
      provides: { electronics: 2.35 }, 
      consumes: { electricity: 0.75, scrap: 0.25 }, 
      amount: 0,
      description: 'A hub for technicians to maintain and improve your advanced infrastructure. Provides huge amount of electronics, but consumes a lot of electricity and scrap.'
    },
    bigApartmentComplex: {
      id: 'bigApartmentComplex',
      name: 'Big Apartment Complex',
      cost: { electronics: 3000, scrap: 16450, wood: 12210 }, 
      provides: { scrap: 0.85, electronics: 0.75 }, 
      consumes: { electricity: 0.75, food: 0.60, water: 0.40 }, 
      amount: 0,
      description: 'Really big apartment complex, providing more living space for more willing, dutiful scavengers who bring back more valuable materials.'
    },
	armyQuarter: {
      id: 'armyQuarter',
      name: 'Army Quarter',
      cost: { electronics: 12320, scrap: 26120, wood: 21510 }, 
      provides: { soldiers: 0.04 }, 
      consumes: { electricity: 0.75, food: 0.60, water: 0.40 }, 
      amount: 0,
      description: 'With an ever growing amount of soldiers, you need to house them accordingly. The Army Quarter provides attractive living spaces for your soldiers, making the job more attractive.'
    },
	cityCouncil: {
      id: 'cityCouncil',
      name: 'City Council',
      cost: { electronics: 12650, scrap: 29330, wood: 14900 },
      provides: { adminPoints: 0.05 },
      consumes: { electricity: 0.35 },
      amount: 0,
      description: 'You are no longer just a town: your community has reached the size of an actual city. You need city councils now to manage all the administrative tasks.'
    },
	specialForcesHQ: {
      id: 'specialForcesHQ',
      name: 'Special Forces HQ',
      cost: { electronics: 32650, scrap: 39330, wood: 42900 },
      provides: { soldiers: 0.08 },
      consumes: { electricity: 0.85 },
      amount: 0,
      description: 'Trains special forces soldiers, which are a valuable addition to your fighting force.'
    },
	fieldMedicAcademy: {
      id: 'fieldMedicAcademy',
      name: 'Field Medic Academy',
      description: 'In the Field Medic Academy your healers train soldiers how to treat battle wounds. As a result, you lose 10% fewer soldiers in expeditions.',
      cost: {
        wood: 25500,
        scrap: 45210,
        electronics: 15490
      },
      amount: 0,
      maxAmount: 1, // Buildable only once, like Expedition HQ
      reducesExpeditionLosses: 0.10 // 10% reduction
    },
	masterLoggers: {
      id: 'masterLoggers',
      name: 'Master Loggers',
      cost: { electronics: 7900, scrap: 38150, wood: 25230 }, 
      provides: { wood: 1.85 }, 
      consumes: { electricity: 0.95, food: 0.80, water: 0.30 },
      amount: 0,
	  description: 'Specialists in the art of cutting, slicing and logging, the Master Loggers strive to meet your ever growing need for wood.'
    },
	cattleRanch: {
      id: 'cattleRanch',
      name: 'Cattle Ranch',
      cost: { electronics: 12270, scrap: 32045, wood: 51760 }, 
      provides: { food: 1.5 }, 
      consumes: { electricity: 1.35, water: 1.35 },
      amount: 0,
	  description: 'Mhhhhhhhhhm. Beef. Unfortunately getting to that juicy goodness takes a lot of work, wood, water and electricity. But it is sooo damn good!'
    },

  },
  researches: {
    improveGardens: {
      id: 'improveGardens',
      name: 'Improve Gardens',
      cost: { wood: 200, water: 350, researchPoints: 75 },
      effect: { type: 'increaseProduction', buildingId: 'garden', resourceId: 'food', multiplier: 1.01 },
      amount: 0,
      description: 'Increases production of Small Gardens by 1%'
    },
    improveWaterCollectors: {
      id: 'improveWaterCollectors',
      name: 'Improve Water Collectors',
      cost: { wood: 300, scrap: 125, researchPoints: 85 },
      effect: { type: 'increaseProduction', buildingId: 'waterCollector', resourceId: 'water', multiplier: 1.01 },
      amount: 0,
      description: 'Increases production of Water Collectors by 1%'
    },
    improveLumberYard: {
      id: 'improveLumberYard',
      name: 'Improve Lumber Yard',
      cost: { wood: 450, scrap: 250, researchPoints: 90 },
      effect: { type: 'increaseProduction', buildingId: 'lumberyard', resourceId: 'wood', multiplier: 1.01 },
      amount: 0,
      description: 'Increases production of Lumber Yard by 1%'
    },
    enforceSavingMindset: {
      id: 'enforceSavingMindset',
      name: 'Enforce Saving Mindset',
      cost: { researchPoints: 225, adminPoints: 150 },
      effect: { type: 'reduceConsumption', multiplier: 0.99 },
      amount: 0,
      description: 'Reduces consumption of all consumers by 1%'
    },
    improveGenerators: {
      id: 'improveGenerators',
      name: 'Improve Makeshift Generators',
      cost: { wood: 550, scrap: 750, researchPoints: 240 },
      effect: { type: 'increaseProduction', buildingId: 'generator', resourceId: 'electricity', multiplier: 1.01 },
      amount: 0,
      description: 'Increases production of Makeshift Generators by 1%'
    },
    improveLumberjackCamp: {
      id: 'improveLumberjackCamp',
      name: 'Improve Lumberjack Camp',
      cost: { wood: 34250, scrap: 12350, researchPoints: 950 },
      effect: { type: 'increaseProduction', buildingId: 'lumberjackcamp', resourceId: 'wood', multiplier: 1.01 },
      amount: 0,
      description: 'Increases production of Lumberjack Camp by 1%'
    },
	improveMasterLoggers: {
      id: 'improveMasterLoggers',
      name: 'Improve Master Loggers',
      cost: { wood: 44250, scrap: 32350, researchPoints: 1250 },
      effect: { type: 'increaseProduction', buildingId: 'masterLoggers', resourceId: 'wood', multiplier: 1.01 },
      amount: 0,
      description: 'Increases production of Master Loggers by 1%'
    },
  },
  lastSaved: Date.now(),
  lastTick: Date.now(),
  musicEnabled: false,
  hasSeenWelcome: false,
  buffsDebuffs: [],
  weather: { temperature: null, condition: null, windSpeed: null, cloudCover: null },
  hasUnlockedElectricity: false,
  electricity: 0,
  hasUnlockedBatteries: false,
  maxElectricity: 100,
  lumberjackCampsDisabled: false,
  hasIncreasedFoodConsumption: false,
  foodConsumptionRate: 0.05,
  waterConsumptionRate: 0.05,
  isNotificationVisible: false,
  activeEvent: null,
  lastEventTimes: {},
  nextEventCheck: Date.now(),
  hasUnlockedTimedEvents: false,
  generatorsDisabled: false,
  lastGeneratorStateChange: Date.now(),
  electricityConsumersDisabled: false,
  hasUnlockedCivilization: false,
  researchPoints: 0,
  maxResearchPoints: 100,
  adminPoints: 0,
  maxAdminPoints: 100,
  researchEffects: [],
  hasUnlockedMilitary: false,
  hasUnlockedExpeditions: false,
  weapons: 0,
  maxWeapons: 100,
  soldiers: 0,
  maxSoldiers: 100,
  activeExpedition: null,
  lastExpeditionTimes: {},
  hasSeenExpeditionUnlockNotification: false,
  selectedExpeditionPercentages: {},
  hasUnlockedRiverPump: false,
  hasUnlockedWaterPower: false,
  hasSeenBAPUnlock: false,
  hasUnlockedDefensePower: false, // New flag for Defense Power visibility
  eventLog: [], // Array to store the last 200 events
  achievements: {}, // Tracks unlocked achievements: { achievementId: { count: number, lastUnlocked: timestamp } }
  lastAchievementCheck: null,
};

let gameState = { ...initialGameState };

const WEATHER_EFFECTS = {
  temperature: [
    {
      condition: temp => temp > 30,
      buffDebuff: {
        name: "Hot Weather",
        type: "debuff",
        effect: "Water consumption +20%",
        apply: () => ({ waterConsumptionModifier: 1.2 })
      }
    },
    {
      condition: temp => temp < 5,
      buffDebuff: {
        name: "Cold Weather",
        type: "debuff",
        effect: "Food production -10%",
        apply: () => ({ foodProductionModifier: 0.9 })
      }
    }
  ],
  condition: [
    {
      condition: cond => cond === "Rain",
      buffDebuff: {
        name: "Rainy Weather",
        type: "buff",
        effect: "Water production +15%",
        apply: () => ({ waterProductionModifier: 1.15 })
      }
    },
    {
      condition: cond => cond === "Clear",
      buffDebuff: {
        name: "Clear Skies",
        type: "buff",
        effect: "Wood production +10%",
        apply: () => ({ woodProductionModifier: 1.1 })
      }
    }
  ]
};

WEATHER_EFFECTS.condition.push({
  condition: cond => cond === "Snow",
  buffDebuff: {
    name: "Snowy Weather",
    type: "debuff",
    effect: "Production of food, water and wood -5%",
    apply: () => ({
      foodProductionModifier: 0.95,
      waterProductionModifier: 0.95,
      woodProductionModifier: 0.95
    })
  }
});

const TIMED_EVENTS = {
  theFlu: {
    id: 'theFlu',
    name: 'The Flu',
    duration: 120000, // 120 seconds in milliseconds
    notificationText: "Your people are a close-knit community. The closer people are, the easier they spread disease. You all got the flu. It's Fred's fault, of course. Anyhow, you're all taking a lot of meds now to get better. You consume 0.2 meds every second.",
    effect: {
      type: 'consumeResource',
      resourceId: 'meds',
      amountPerSecond: 0.2 // Consume 0.2 meds per second
    },
    displayText: "The Flu: everybody is sick and needs meds! (-0.2 meds per second)",
    minCooldown: 1620000, // 27 minutes in milliseconds
    conditions: () => true // Always trigger for this example; can add conditions later
  }, 
  resourceBoost: {
    id: 'resourceBoost',
    name: 'Resource Boost',
    duration: 300000, // 5 minutes
    notificationText: "A supply drop has been found! Scrap production is increased by 50% for 5 minutes.",
    effect: {
      type: 'productionModifier',
      resourceId: 'scrap',
      modifier: 1.5 // Increase scrap production by 50%
    },
    displayText: "Resource Boost: Scrap production +50%",
    minCooldown: 900000, // 15 minutes
    conditions: () => gameState.resources.scrap.amount < 350
  }, 
  woodBoost1: {
    id: 'woodBoost1',
    name: 'Wood Boost',
    duration: 120000, // 2 minutes
    notificationText: "The lumberjacks are pumped! Wood production is increased by 20% for 2 minutes.",
    effect: {
      type: 'productionModifier',
      resourceId: 'wood',
      modifier: 1.2 // Increase wood production by 50%
    },
    displayText: "Resource Boost: Wood production +20%",
    minCooldown: 900000, // 15 minutes
    conditions: () => gameState.resources.wood.amount < 450
  },
  waterContamination: {
    id: 'waterContamination',
    name: 'Water Contamination',
    duration: 360000, // 6 minutes
    notificationText: "Due to unfavourable weather conditions contaminants have entered your water supplies. They make you feel thirsty, even though you drink enough. You consume twice as much water.",
    effect: {
      type: 'consumeResource',
      resourceId: 'water',
      amountPerSecond: 0.6 // Consume 0.6 water per second
    },
    displayText: "Water Contamination: drinking makes you thirstier, you drink more! (-0.6 water per second)",
    minCooldown: 1260000, // 21 minutes in milliseconds
    conditions: () => true // Always trigger for this example; can add conditions later
  },
  siloFire: {
    id: 'siloFire',
    name: 'Silo Fire',
    duration: 1000, // 1 seconds (no need to clutter the buff/debuff cards for instant effects, we create a dismissable notification anyway)
    notificationText: "Someone was very careless and smoked near the food silos. A fire broke out, destroying 80% of your food stock!",
    effect: {
      type: 'removeResource',
      resourceId: 'food',
      amount: () => Math.round(gameState.resources.food.amount * 0.8) // Remove 80% of current food
    },
    displayText: "Silo Fire: 80% of food destroyed!",
    minCooldown: 2160000, // 36 minutes
    conditions: () => gameState.resources.food.amount > 0 // Only trigger if there’s food to lose
  },
  luckyScavengers1: {
    id: 'luckyScavengers1',
    name: 'Lucky Scavengers',
    duration: 1000, // 1 seconds (no need to clutter the buff/debuff cards for instant effects, we create a dismissable notification anyway)
    notificationText: "Scavengers found a huge deposit of scrap and bring home 500 scrap.",
    effect: {
      type: 'addResource',
      resourceId: 'scrap',
      amount: 500 // add 500 scrap
    },
    displayText: "Lucky Scavengers: Scavengers come back from their trip with 500 scrap!",
    minCooldown: 3060000, // 51 minutes
    conditions: () => true // Always trigger for this example; can add conditions later
  },
  greenThumb1: {
    id: 'greenThumb1',
    name: 'Green Thumb',
    duration: 1000, // 1 seconds (no need to clutter the buff/debuff cards for instant effects, we create a dismissable notification anyway)
    notificationText: "Scavengers found a huge pile of canned food in an abandoned super market. It's still good. They come back with 500 food.",
    effect: {
      type: 'addResource',
      resourceId: 'food',
      amount: 500 // add 500 food
    },
    displayText: "Green Thumb: Scavengers come back from their trip with 500 food!",
    minCooldown: 2040000, // 34 minutes
    conditions: () => true // Always trigger for this example; can add conditions later
  },
  hungrySettlers: {
    id: 'hungrySettlers',
    name: 'We are hungry!',
    duration: 540000, // 9 minutes in milliseconds
    notificationText: "Hard working scavengers need to be fed well. Your food consumption is increased by 0.8!",
    effect: {
      type: 'consumeResource',
      resourceId: 'food',
      amountPerSecond: 0.8 // Consume 0.2 food per second
    },
    displayText: "We are hungry!: food consumption increased (-0.8 food per second)",
    minCooldown: 1620000, // 27 minutes in milliseconds
    conditions: () => true // Always trigger for this example; can add conditions later
  }, 
  luckyScavengers2: {
    id: 'luckyScavengers2',
    name: 'Lucky Scavengers',
    duration: 1000, // 1 seconds (no need to clutter the buff/debuff cards for instant effects, we create a dismissable notification anyway)
    notificationText: "Your scavengers found a huge pile of discarded electronics. They bring 350 electronics back home from their trip.",
    effect: {
      type: 'addResource',
      resourceId: 'electronics',
      amount: 350 // add 350 electronics
    },
    displayText: "Lucky Scavengers: Scavengers come back from their trip with 350 electronics!",
    minCooldown: 1620000, // 27 minutes in milliseconds
    conditions: () => true // Always trigger for this example; can add conditions later
  },
  luckyScavengers3: {
    id: 'luckyScavengers3',
    name: 'Lucky Scavengers',
    duration: 1000, // 1 seconds (no need to clutter the buff/debuff cards for instant effects, we create a dismissable notification anyway)
    notificationText: "Your scavengers found a huge pile of discarded electronics. They bring 1350 electronics back home from their trip.",
    effect: {
      type: 'addResource',
      resourceId: 'electronics',
      amount: 1350 // add 1350 electronics
    },
    displayText: "Lucky Scavengers: Scavengers come back from their trip with 1350 electronics!",
    minCooldown: 1020000, // 17 minutes in milliseconds
    conditions: () => true // Always trigger for this example; can add conditions later
  },
  luckyScavengers4: {
    id: 'luckyScavengers4',
    name: 'Lucky Scavengers',
    duration: 1000, // 1 seconds (no need to clutter the buff/debuff cards for instant effects, we create a dismissable notification anyway)
    notificationText: "Your scavengers found a huge pile of discarded electronics. They bring 3350 electronics back home from their trip.",
    effect: {
      type: 'addResource',
      resourceId: 'electronics',
      amount: 3350 // add 3350 electronics
    },
    displayText: "Lucky Scavengers: Scavengers come back from their trip with 3350 electronics!",
    minCooldown: 2880000, // 48 minutes in milliseconds
    conditions: () => true // Always trigger for this example; can add conditions later
  },
  theFlu2: {
    id: 'theFlu2',
    name: 'The Flu',
    duration: 120000, // 120 seconds in milliseconds
    notificationText: "You all got a nasty little bug requiring you to take a lot of meds. Med consumption of 0.7 meds/s.",
    effect: {
      type: 'consumeResource',
      resourceId: 'meds',
      amountPerSecond: 0.7 // Consume 0.2 meds per second
    },
    displayText: "The Flu: everybody is sick and needs meds! (-0.7 meds per second)",
    minCooldown: 3720000, // 62 minutes in milliseconds
    conditions: () => true // Always trigger for this example; can add conditions later
  }, 
  greenThumb2: {
    id: 'greenThumb2',
    name: 'Green Thumb',
    duration: 1000, // 1 seconds (no need to clutter the buff/debuff cards for instant effects, we create a dismissable notification anyway)
    notificationText: "Scavengers found a huge orchard with trees hanging full of fruit. That's lucky. They come back with 3500 food.",
    effect: {
      type: 'addResource',
      resourceId: 'food',
      amount: 3500 // add 500 food
    },
    displayText: "Green Thumb: Scavengers come back from their trip to the orchard with 3500 food!",
    minCooldown: 2040000, // 34 minutes
    conditions: () => true // Always trigger for this example; can add conditions later
  },
  theMightyForest: {
    id: 'theMightyForest',
    name: 'The Mighty Forest',
    duration: 1000, // 1 seconds (no need to clutter the buff/debuff cards for instant effects, we create a dismissable notification anyway)
    notificationText: "Your lumberjacks travelled wide and far and found a massive forest to go to town on. They brought home 12500 wood.",
    effect: {
      type: 'addResource',
      resourceId: 'wood',
      amount: 12500 // add 12500 wood
    },
    displayText: "The Mighty Forest: Scavengers come back from their trip to the orchard with 3500 food!",
    minCooldown: 780000, // 13 minutes
    conditions: () => true // Always trigger for this example; can add conditions later
  },
  woodBoost2: {
    id: 'woodBoost2',
    name: 'Wood Boost',
    duration: 480000, // 8 minutes
    notificationText: "The lumberjacks are pumped! Wood production is increased by 80% for 8 minutes.",
    effect: {
      type: 'productionModifier',
      resourceId: 'wood',
      modifier: 1.8 // Increase wood production by 80%
    },
    displayText: "Resource Boost: Wood production +80%",
    minCooldown: 960000, // 16 minutes
    conditions: () => true
  },
  communityAttack: {
  id: 'communityAttack',
  name: 'Community Attack',
  duration: 1000, // Instant event (1 second)
  notificationText: "A hostile group of survivors is preparing to attack your community!",
  effect: {
    type: 'communityAttack',
    resolve: () => {
  const defensePower = gameState.resources.defensePower.amount;
  let winChance, woodLoss, foodLoss, scrapLoss, electronicsLoss, soldiersLostPercent, message;

  if (defensePower < 50) {
    winChance = 0.25; // 75% chance to lose
    if (Math.random() > winChance) { // Lose
      woodLoss = Math.floor(Math.random() * (9120 - 2430 + 1)) + 2430;
      foodLoss = Math.floor(Math.random() * (12020 - 1920 + 1)) + 1920;
      scrapLoss = Math.floor(Math.random() * (5205 - 2400 + 1)) + 2400;
      electronicsLoss = Math.floor(Math.random() * (5029 - 1045 + 1)) + 1045;
      soldiersLostPercent = 0.02 + Math.random() * (0.28 - 0.02); // 2% to 28%
      const soldiersLost = Math.max(1, Math.floor(gameState.soldiers * soldiersLostPercent));
      message = `A hostile group of survivors attacked your community. As your defenses were weak, they overran you with ease.\nThe following was looted by the attackers:\nWood: ${woodLoss}\nFood: ${foodLoss}\nScrap: ${scrapLoss}\nElectronics: ${electronicsLoss}\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.resources.wood.amount = Math.max(0, gameState.resources.wood.amount - woodLoss);
      gameState.resources.food.amount = Math.max(0, gameState.resources.food.amount - foodLoss);
      gameState.resources.scrap.amount = Math.max(0, gameState.resources.scrap.amount - scrapLoss);
      gameState.resources.electronics.amount = Math.max(0, gameState.resources.electronics.amount - electronicsLoss);
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Community Attack: Lost - ${message.replace(/\n/g, ' ')}`);
    } else { // Win
      soldiersLostPercent = 0.02 + Math.random() * (0.53 - 0.02); // 2% to 53%
      const soldiersLost = Math.floor(gameState.soldiers * soldiersLostPercent);
      message = `A hostile group of survivors attacked your community. Your defenses were weak, but you managed to fend them off.\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Community Attack: Won - ${message.replace(/\n/g, ' ')}`);
    }
  } else if (defensePower <= 200) {
    winChance = 0.65; // 35% chance to lose
    if (Math.random() > winChance) { // Lose
      woodLoss = Math.floor(Math.random() * (19120 - 4430 + 1)) + 4430;
      foodLoss = Math.floor(Math.random() * (22320 - 3920 + 1)) + 3920;
      scrapLoss = Math.floor(Math.random() * (15345 - 2415 + 1)) + 2415;
      electronicsLoss = Math.floor(Math.random() * (15231 - 5045 + 1)) + 5045;
      soldiersLostPercent = 0.04 + Math.random() * (0.48 - 0.04); // 4% to 48%
      const soldiersLost = Math.max(1, Math.floor(gameState.soldiers * soldiersLostPercent));
      message = `A hostile group of survivors attacked your community. You had a good defense, but they simply outnumbered and outmatched you.\nThe following was looted by the attackers:\nWood: ${woodLoss}\nFood: ${foodLoss}\nScrap: ${scrapLoss}\nElectronics: ${electronicsLoss}\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.resources.wood.amount = Math.max(0, gameState.resources.wood.amount - woodLoss);
      gameState.resources.food.amount = Math.max(0, gameState.resources.food.amount - foodLoss);
      gameState.resources.scrap.amount = Math.max(0, gameState.resources.scrap.amount - scrapLoss);
      gameState.resources.electronics.amount = Math.max(0, gameState.resources.electronics.amount - electronicsLoss);
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Community Attack: Lost - ${message.replace(/\n/g, ' ')}`);
    } else { // Win
      soldiersLostPercent = 0.06 + Math.random() * (0.33 - 0.06); // 6% to 33%
      const soldiersLost = Math.floor(gameState.soldiers * soldiersLostPercent);
      message = `A hostile group of survivors attacked your community. Your defenses were quite well prepared and you won the fight.\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Community Attack: Won - ${message.replace(/\n/g, ' ')}`);
    }
  } else { // defensePower > 200
    winChance = 0.94; // 6% chance to lose
    if (Math.random() > winChance) { // Lose
      woodLoss = Math.floor(Math.random() * (29120 - 6430 + 1)) + 6430;
      foodLoss = Math.floor(Math.random() * (26312 - 5920 + 1)) + 5920;
      scrapLoss = Math.floor(Math.random() * (21315 - 5455 + 1)) + 5455;
      electronicsLoss = Math.floor(Math.random() * (12031 - 4045 + 1)) + 4045;
      soldiersLostPercent = 0.02 + Math.random() * (0.28 - 0.02); // 2% to 28%
      const soldiersLost = Math.max(1, Math.floor(gameState.soldiers * soldiersLostPercent));
      message = `A hostile group of survivors attacked your community. You had a good defense, but they simply outnumbered and outmatched you.\nThe following was looted by the attackers:\nWood: ${woodLoss}\nFood: ${foodLoss}\nScrap: ${scrapLoss}\nElectronics: ${electronicsLoss}\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.resources.wood.amount = Math.max(0, gameState.resources.wood.amount - woodLoss);
      gameState.resources.food.amount = Math.max(0, gameState.resources.food.amount - foodLoss);
      gameState.resources.scrap.amount = Math.max(0, gameState.resources.scrap.amount - scrapLoss);
      gameState.resources.electronics.amount = Math.max(0, gameState.resources.electronics.amount - electronicsLoss);
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Community Attack: Lost - ${message.replace(/\n/g, ' ')}`);
    } else { // Win
      soldiersLostPercent = 0.01 + Math.random() * (0.09 - 0.01); // 1% to 9%
      const soldiersLost = Math.floor(gameState.soldiers * soldiersLostPercent);
      message = `A hostile group of survivors attacked your community. They were no match for your superior defenses and you sent them home packing.\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Community Attack: Won - ${message.replace(/\n/g, ' ')}`);
    }
  }
  showNotification(message, 'large');
}
  },
  displayText: "Community Attack: Under siege!",
  minCooldown: 3600000, // 1 hour
  conditions: () => gameState.hasUnlockedDefensePower && gameState.soldiers > 0
},
bigAttack: {
  id: 'bigAttack',
  name: 'Massive Community Attack',
  duration: 1000, // Instant event (1 second)
  notificationText: "A hostile group of survivors is preparing to attack your community!",
  effect: {
    type: 'communityAttack',
    resolve: () => {
  const defensePower = gameState.resources.defensePower.amount;
  let winChance, woodLoss, foodLoss, scrapLoss, electronicsLoss, soldiersLostPercent, message;

  if (defensePower < 500) {
    winChance = 0.35; // 65% chance to lose
    if (Math.random() > winChance) { // Lose
      woodLoss = Math.floor(Math.random() * (24120 - 9430 + 1)) + 9430;
      foodLoss = Math.floor(Math.random() * (62020 - 7920 + 1)) + 7920;
      scrapLoss = Math.floor(Math.random() * (37205 - 9400 + 1)) + 9400;
      electronicsLoss = Math.floor(Math.random() * (16029 - 6045 + 1)) + 6045;
      soldiersLostPercent = 0.32 + Math.random() * (0.88 - 0.32); // 32% to 88%
      const soldiersLost = Math.max(1, Math.floor(gameState.soldiers * soldiersLostPercent));
      message = `A hostile group of survivors attacked your community. This was a BIG one...your defenses just could not hold off the attackers and you suffered a massive defeat.\nThe following was looted by the attackers:\nWood: ${woodLoss}\nFood: ${foodLoss}\nScrap: ${scrapLoss}\nElectronics: ${electronicsLoss}\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.resources.wood.amount = Math.max(0, gameState.resources.wood.amount - woodLoss);
      gameState.resources.food.amount = Math.max(0, gameState.resources.food.amount - foodLoss);
      gameState.resources.scrap.amount = Math.max(0, gameState.resources.scrap.amount - scrapLoss);
      gameState.resources.electronics.amount = Math.max(0, gameState.resources.electronics.amount - electronicsLoss);
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Massive Community Attack: Lost - ${message.replace(/\n/g, ' ')}`);
    } else { // Win
      soldiersLostPercent = 0.05 + Math.random() * (0.43 - 0.05); // 5% to 43%
      const soldiersLost = Math.floor(gameState.soldiers * soldiersLostPercent);
      message = `A hostile group of survivors attacked your community. It was a really massive attack. It took a lot, but you managed to defend your community against this massive attack.\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Massive Community Attack: Won - ${message.replace(/\n/g, ' ')}`);
    }
    showNotification(message, 'large');
  } else if (defensePower < 1000) { // defensePower >= 500
    winChance = 0.45; // 55% to lose
    if (Math.random() > winChance) { // Lose
      woodLoss = Math.floor(Math.random() * (34120 - 16430 + 1)) + 16430;
      foodLoss = Math.floor(Math.random() * (42312 - 25920 + 1)) + 25920;
      scrapLoss = Math.floor(Math.random() * (31315 - 15455 + 1)) + 15455;
      electronicsLoss = Math.floor(Math.random() * (32031 - 14045 + 1)) + 14045;
      soldiersLostPercent = 0.02 + Math.random() * (0.32 - 0.08); // 8% to 32%
      const soldiersLost = Math.max(1, Math.floor(gameState.soldiers * soldiersLostPercent));
      message = `A hostile group of survivors attacked your community. This was a BIG one...your defenses were good and strong but they just could not hold off the attackers and you suffered a massive defeat.\nThe following was looted by the attackers:\nWood: ${woodLoss}\nFood: ${foodLoss}\nScrap: ${scrapLoss}\nElectronics: ${electronicsLoss}\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.resources.wood.amount = Math.max(0, gameState.resources.wood.amount - woodLoss);
      gameState.resources.food.amount = Math.max(0, gameState.resources.food.amount - foodLoss);
      gameState.resources.scrap.amount = Math.max(0, gameState.resources.scrap.amount - scrapLoss);
      gameState.resources.electronics.amount = Math.max(0, gameState.resources.electronics.amount - electronicsLoss);
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Massive Community Attack: Lost - ${message.replace(/\n/g, ' ')}`);
    } else { // Win
      soldiersLostPercent = 0.01 + Math.random() * (0.12 - 0.03); // 3% to 13%
      const soldiersLost = Math.floor(gameState.soldiers * soldiersLostPercent);
      message = `A hostile group of survivors attacked your community. It was a really massive attack. It took a lot, but you managed to defend your community against this massive attack.\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Massive Community Attack: Won - ${message.replace(/\n/g, ' ')}`);
    }
    showNotification(message, 'large');
  }
  else { // defensePower >= 1000
    winChance = 0.64; // 36% to lose
    if (Math.random() > winChance) { // Lose
      woodLoss = Math.floor(Math.random() * (49120 - 16430 + 1)) + 16430;
      foodLoss = Math.floor(Math.random() * (66312 - 15920 + 1)) + 15920;
      scrapLoss = Math.floor(Math.random() * (31315 - 15455 + 1)) + 15455;
      electronicsLoss = Math.floor(Math.random() * (42031 - 14045 + 1)) + 14045;
      soldiersLostPercent = 0.02 + Math.random() * (0.28 - 0.02); // 2% to 28%
      const soldiersLost = Math.max(1, Math.floor(gameState.soldiers * soldiersLostPercent));
      message = `A hostile group of survivors attacked your community. This was a BIG one...your defenses were good and strong but they just could not hold off the attackers and you suffered a massive defeat.\nThe following was looted by the attackers:\nWood: ${woodLoss}\nFood: ${foodLoss}\nScrap: ${scrapLoss}\nElectronics: ${electronicsLoss}\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.resources.wood.amount = Math.max(0, gameState.resources.wood.amount - woodLoss);
      gameState.resources.food.amount = Math.max(0, gameState.resources.food.amount - foodLoss);
      gameState.resources.scrap.amount = Math.max(0, gameState.resources.scrap.amount - scrapLoss);
      gameState.resources.electronics.amount = Math.max(0, gameState.resources.electronics.amount - electronicsLoss);
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Massive Community Attack: Lost - ${message.replace(/\n/g, ' ')}`);
    } else { // Win
      soldiersLostPercent = 0.01 + Math.random() * (0.09 - 0.01); // 1% to 9%
      const soldiersLost = Math.floor(gameState.soldiers * soldiersLostPercent);
      message = `A hostile group of survivors attacked your community. It was a really massive attack. It took a lot, but you managed to defend your community against this massive attack.\n${soldiersLost} soldiers were lost in the fight for the defense of your community.`;
      gameState.soldiers = Math.max(0, gameState.soldiers - soldiersLost);
      gameState.resources.soldiers.amount = gameState.soldiers;
      logEvent(`Massive Community Attack: Won - ${message.replace(/\n/g, ' ')}`);
    }
    showNotification(message, 'large');
  }
}
  },
  displayText: "Massive Community Attack: Under siege!",
  minCooldown: 7200000, // 2 hours
  conditions: () => gameState.resources.defensePower.amount > 400
},
  
  // Add more events here as needed, e.g.:
  // resourceBoost: {
  //   id: 'resourceBoost',
  //   name: 'Resource Boost',
  //   duration: 300000, // 5 minutes
  //   notificationText: "A supply drop has been found! Scrap production is increased by 50% for 5 minutes.",
  //   effect: {
  //     type: 'productionModifier',
  //     resourceId: 'scrap',
  //     modifier: 1.5 // Increase scrap production by 50%
  //   },
  //   displayText: "Resource Boost: Scrap production +50%",
  //   minCooldown: 900000, // 15 minutes
  //   conditions: () => gameState.resources.scrap.amount < 50
  // }
};

const EXPEDITIONS = {
  scavenging: {
    id: 'scavenging',
    name: 'Scavenging Expedition',
    description: 'Send your soldiers on a scavenging expedition into dangerous territory. They might come back with huge amounts of valuable resources, they might come back empty handed or they might not come back at all.',
    cost: { adminPoints: 250, food: 800, water: 1200 },
    duration: 240000 // 4 in milliseconds
  },
  pillage: {
    id: 'pillage',
    name: 'Pillage Another Community',
    description: 'Send your soldiers to pillage another community. They might come back with huge amounts of valuable resources, they might come back empty handed or they might not come back at all.',
    cost: { adminPoints: 450, food: 1200, water: 1600 },
    duration: 600000 // 10 minutes in milliseconds
  }
};

//Define Achievements

const ACHIEVEMENTS = {
  theWarrior: {
    name: "The Warrior",
    condition: () => gameState.soldiers >= 7500, // Use a function for flexibility
    maxUnlock: 1,
    reward: null, // No reward
    tier: 2, // Tier 2 (**) - valid tiers are 1, 2, or 3
    description: "Has 7500 soldiers or more."
  },
  theBureaucrat: {
    name: "The Bureaucrat",
    condition: () => gameState.buildings.townhall.amount >= 75,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "researchpoints", amount: 1000 },
    tier: 1, // Tier 1 (*)
    description: "Has 75 town halls or more. Grants 1000 research points."
  },
  // Example of a repeatable achievement with a different condition
  masterBuilder: {
    name: "Master Builder",
    condition: () => gameState.buildings.bigApartmentComplex.amount >= 20,
    maxUnlock: 1, // Can be unlocked up to 1 times
    reward: { type: "resource", resourceId: "adminpoints", amount: 500 },
    tier: 3, // Tier 3 (***)
    description: "Has 10 or more Big Apartment Complexes. Grants 500 administrative points."
  },
  // Example of an achievement tied to a flag
  waterPowerPioneer: {
    name: "Water Power Pioneer",
    condition: () => gameState.hasUnlockedWaterPower === true,
    maxUnlock: 1,
    reward: null,
    tier: 2,
    description: "Unlocked Water Power"
  },
  defendersAssemble: {
    name: "Defenders, assemble!",
    condition: () => gameState.hasUnlockedDefensePower === true,
    maxUnlock: 1,
    reward: null,
    tier: 3,
    description: "Unlocked Defense Power"
  },
  masterBuilder2: {
    name: "Master Builder 2",
    condition: () => gameState.buildings.bigApartmentComplex.amount >= 50,
    maxUnlock: 1, // Can be unlocked up to 1 times
    reward: { type: "resource", resourceId: "scrap", amount: 25000 },
    tier: 3, // Tier 3 (***)
    description: "Has 50 or more Big Apartment Complexes. Grants 25000 scrap."
  },
  youLoveRedTape: {
    name: "You LOVE red tape!",
    condition: () => gameState.buildings.cityCouncil.amount >= 15, // Use a function for flexibility
    maxUnlock: 1,
    reward: null, // No reward
    tier: 2, // Tier 2 (**) - valid tiers are 1, 2, or 3
    description: "Has 7500 soldiers or more."
  },
  burnItAll: {
    name: "Let it burn!",
    condition: () => gameState.buildings.generator.amount >= 250, // Use a function for flexibility
    maxUnlock: 1,
    reward: null, // No reward
    tier: 1, // Tier 1 (**) - valid tiers are 1, 2, or 3
    description: "Has 250 or more makeshift generators."
  },
  goneWithTheWind: {
    name: "Gone with the wind",
    condition: () => gameState.buildings.windmill.amount >= 200, // Use a function for flexibility
    maxUnlock: 1,
    reward: { type: "building", buildingId: "windmill", amount: 5 }, // 5 more windmills
    tier: 3, // Tier 3 (**) - valid tiers are 1, 2, or 3
    description: "Has 200 or more windmills. Grants 5 more windmills."
  },
  sunshineReaggae: {
    name: "Sunshine Reaggae",
    condition: () => gameState.buildings.solarpanel.amount >= 300, // Use a function for flexibility
    maxUnlock: 1,
	reward: { type: "building", buildingId: "solarpanel", amount: 5 }, // 5 more solar panels
    tier: 3, // Tier 3 (**) - valid tiers are 1, 2, or 3
    description: "Has 300 or more solar panels. Grants 5 more solar panels."
  },
  lordOfWar: {
    name: "Lord of War",
    condition: () => gameState.weapons >= 10000, // Use a function for flexibility
    maxUnlock: 1,
	reward: { type: "resource", resourceId: "scrap", amount: 35000 }, // 35000 scrap
    tier: 3, // Tier 3 (**) - valid tiers are 1, 2, or 3
    description: "Has 10000 or more weapons. Grants 35000 scrap."
  },
  imaBuilder: {
    name: "I build a lot!",
    condition: () => gameState.buildings.apartmentComplex.amount >= 100 && gameState.buildings.bigApartmentComplex.amount >= 50,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "scrap", amount: 50000 },
    tier: 3,
    description: "Has at least 100 Apartment Complexes and at least 50 Big Apartment Complexes. Grants 50000 scrap."
  },
  oink: {
    name: "Oink!",
    condition: () => gameState.buildings.pigfarm.amount >= 35,
    maxUnlock: 1,
    reward: null,
    tier: 1,
    description: "Has at least 35 pig farms."
  },
  oinkOink: {
    name: "Oink oink!",
    condition: () => gameState.buildings.pigfarm.amount >= 125,
    maxUnlock: 1,
    reward: null,
    tier: 2,
    description: "Has at least 125 pig farms."
  },
  oinkOinkOink: {
    name: "Oink oink oink!",
    condition: () => gameState.buildings.pigfarm.amount >= 250,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "food", amount: 50000 },
    tier: 3,
    description: "Has at least 250 pig farms. Grants 50000 food."
  },
  breakTheSilence: {
    name: "Break the Silence",
    condition: () => gameState.musicEnabled === true,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "wood", amount: 400 },
    tier: 1,
    description: "Broke the silence (turned music on). Grants 400 food."
  },
  messy: {
    name: "Moar Storage!",
    condition: () => gameState.improvements.storageFacilities.amount >= 100,
    maxUnlock: 1,
    reward: null,
    tier: 1,
    description: "Has purchased improvement Storage Facilities at least 100 times."
  },
  messier: {
    name: "MOAR Storage!!!",
    condition: () => gameState.improvements.storageFacilities.amount >= 200,
    maxUnlock: 1,
    reward: null,
    tier: 2,
    description: "Has purchased improvement Storage Facilities at least 200 times."
  },
  theMessiest: {
    name: "MOAR!!! Storage!!! Goddammit!!!",
    condition: () => gameState.improvements.storageFacilities.amount >= 300 || gameState.improvements.undergroundStorage.amount >= 50,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "scrap", amount: 85000 },
    tier: 3,
    description: "Has purchased improvement Storage Facilities at least 300 times or purchased Underground Storage at least 50 times. Grants 85000 scrap."
  },
  gotWood: {
    name: "Got wood!",
    condition: () => gameState.buildings.lumberyard.amount >= 50,
    maxUnlock: 1,
    reward: null,
    tier: 1,
    description: "Has at least 50 lumberyards."
  },
  gotWood2: {
    name: "Got moar wood!",
    condition: () => gameState.buildings.lumberyard.amount >= 100,
    maxUnlock: 1,
    reward: null,
    tier: 2,
    description: "Has at least 100 lumberyards."
  },
  gotWood3: {
    name: "Master of the forests!",
    condition: () => gameState.buildings.lumberyard.amount >= 150 || gameState.buildings.lumberjackcamp.amount >= 50,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "wood", amount: 85000 },
    tier: 3,
    description: "Has at least 150 lumberyards or at least 50 Lumberjack Camps. Grants 85000 wood."
  },
  uGotThePower: {
    name: "Oh my, such power!",
    condition: () => gameState.electricity >= 1000,
    maxUnlock: 1,
    reward: null,
    tier: 1,
    description: "Has battery capacity of at least 1000."
  },
  uGotThePower2: {
    name: "Oh my, even more power yet!",
    condition: () => gameState.electricity >= 2500,
    maxUnlock: 1,
    reward: null,
    tier: 2,
    description: "Has battery capacity of at least 2500."
  },
  uGotThePower3: {
    name: "Oh my, Mr. Electro!",
    condition: () => gameState.electricity >= 4500,
    maxUnlock: 1,
    reward: { type: "building", buildingId: "powerFromTheRiver", amount: 5 },
    tier: 3,
    description: "Has battery capacity of at least 4500."
  },
  medics: {
    name: "What is the nature of the medical emergency?",
    condition: () => gameState.buildings.fieldMedicAcademy.amount > 0,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "electronics", amount: 25000 },
    tier: 3,
    description: "Has unlocked and built the Field Medic Academy. Grants 25000 electronics."
  },
  ohSoSpecial1: {
    name: "We are kinda special.",
    condition: () => gameState.buildings.specialForcesHQ.amount >= 5,
    maxUnlock: 1,
    reward: null,
    tier: 1,
    description: "Has built at least 5 Special Forces HQ."
  },
  ohSoSpecial2: {
    name: "We are really special.",
    condition: () => gameState.buildings.specialForcesHQ.amount >= 25,
    maxUnlock: 1,
    reward: null,
    tier: 2,
    description: "Has built at least 25 Special Forces HQ."
  },
  ohSoSpecial3: {
    name: "We are super special!",
    condition: () => gameState.buildings.specialForcesHQ.amount >= 50,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "scrap", amount: 75000 },
    tier: 3,
    description: "Has built at least 50 Special Forces HQ. Grants 75000 scrap."
  },
  save1: {
    name: "I don't need much!",
    condition: () => gameState.researches.enforceSavingMindset.amount >= 10,
    maxUnlock: 1,
    reward: null,
    tier: 1,
    description: "Has enforced saving mindset at least 10 times."
  },
  save2: {
    name: "I need even less!",
    condition: () => gameState.researches.enforceSavingMindset.amount >= 25,
    maxUnlock: 1,
    reward: null,
    tier: 2,
    description: "Has enforced saving mindset at least 25 times."
  },
  save3: {
    name: "I need nothing at all!",
    condition: () => gameState.researches.enforceSavingMindset.amount >= 75,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "scrap", amount: 95000 },
    tier: 3,
    description: "Has enforced saving mindset at least 75 times. Grants 95000 scrap."
  },
  ohScrap: {
    name: "Oh Scrap!",
    condition: () => gameState.buildings.scrapHunters.amount >= 200,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "scrap", amount: 145000 },
    tier: 3,
    description: "Has built at least 200 Scrap Hunters. Grants 145000 scrap."
  },
  woody: {
    name: "Woody!",
    condition: () => gameState.buildings.masterLoggers.amount >= 50,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "wood", amount: 145000 },
    tier: 3,
    description: "Has built at least 50 Master Loggers. Grants 145000 wood."
  },
  beeeeeef: {
    name: "Mhmmmm, Beef!",
    condition: () => gameState.buildings.cattleRanch.amount >= 50,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "food", amount: 145000 },
    tier: 3,
    description: "Has built at least 50 Cattle Ranches. Grants 145000 food."
  },
  moreDef: {
    name: "Why so defensive?",
    condition: () => gameState.improvements.defenseTurrets.amount >= 100,
    maxUnlock: 1,
    reward: null,
    tier: 1,
    description: "Has purchased improvement Defense Turrets at least 100 times."
  },
  moreDef2: {
    name: "Yoooooh, so defensive?",
    condition: () => gameState.improvements.defenseTurrets.amount >= 175,
    maxUnlock: 1,
    reward: null,
    tier: 2,
    description: "Has purchased improvement Defense Turrets at least 175 times."
  },
  moreDef3: {
    name: "X-tra defensive!",
    condition: () => gameState.improvements.defenseTurrets.amount >= 50 && gameState.improvements.electricFence.amount >= 50,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "electronics", amount: 145000 },
    tier: 3,
    description: "Has purchased improvement Defense Turrets and Electric Fence at least 50 times each. 'Grants 145000 electronics."
  },
  superTechnical: {
    name: "It is quite technical!",
    condition: () => gameState.buildings.technicianHub.amount >= 200,
    maxUnlock: 1,
    reward: { type: "resource", resourceId: "scrap", amount: 245000 },
    tier: 3,
    description: "Has built Technician Hub at least 200 times. 'Grants 245000 scrap."
  },
};

// get day or night
function isDaytime() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 6 && hour < 21; // Daytime from 6 AM to 9 PM
}

function checkForEvents() {
  const now = Date.now();

  if (!gameState.hasUnlockedTimedEvents) return;
  if (gameState.activeEvent) return;
  if (now < gameState.nextEventCheck) return;

  if (debug) {console.log("Checking for events at time:", now);}
  if (debug) {console.log("lastEventTimes:", gameState.lastEventTimes)};
  if (debug) {console.log("nextEventCheck:", gameState.nextEventCheck)};

  const lastAttack = gameState.lastEventTimes['communityAttack'] || 0;
  const timeSinceLastAttack = now - lastAttack;
  const oneHour = 3600000; // 1 hour in ms

  let possibleEvents = Object.values(TIMED_EVENTS).filter(event => {
    const lastTriggered = gameState.lastEventTimes[event.id] || 0;
    const safeLastTriggered = lastTriggered > now ? 0 : lastTriggered;
    const timeSinceLast = now - safeLastTriggered;
    const isEligible = timeSinceLast >= event.minCooldown && event.conditions();
    if (debug) {console.log(`Event ${event.id}: timeSinceLast = ${timeSinceLast}ms (${(timeSinceLast / 60000).toFixed(2)} minutes), minCooldown = ${event.minCooldown}ms (${event.minCooldown / 60000} minutes), conditionMet = ${event.conditions()}, eligible = ${isEligible}`)};
    return isEligible;
  });

  let event;
  if (timeSinceLastAttack >= oneHour && gameState.hasUnlockedDefensePower && gameState.soldiers > 0) {
    event = TIMED_EVENTS['communityAttack'];
    if (debug) {console.log("Forcing communityAttack as 1 hour has passed since last attack.")};
  } else if (possibleEvents.length > 0) {
    event = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
    if (debug) {console.log("Selected random event:", event.id)};
  }

  if (!event) {
    gameState.nextEventCheck = now + 300000; // Check again in 5 minutes
    saveGame();
    return;
  }

  gameState.activeEvent = {
    id: event.id,
    name: event.name,
    duration: event.duration,
    startTime: now,
    effect: event.effect,
    displayText: event.displayText
  };
  gameState.lastEventTimes[event.id] = now;
  gameState.nextEventCheck = now + 300000; // Check again in 5 minutes
  
  // Log the event start
	logEvent(`Event started: ${event.name} - ${event.notificationText}`);

  showNotification(event.notificationText, 'normal');
  saveGame();
}

// Audio setup
const bgMusic = document.getElementById('bgMusic');
const musicButton = document.getElementById('musicButton');
const musicIcon = document.getElementById('musicIcon');

function toggleMusic() {
  gameState.musicEnabled = !gameState.musicEnabled;
  if (gameState.musicEnabled) {
    bgMusic.play();
    musicIcon.textContent = '🔊';
  } else {
    bgMusic.pause();
    musicIcon.textContent = '🔇';
  }
  saveGame();
}

// Notification System
function showNotification(message, type = 'normal') {
  // Replace \n with <br> for large notifications
  const formattedMessage = type === 'large' ? message.replace(/\n/g, '<br>') : message;

  if (type === 'normal') {
    const overlay = document.getElementById('notificationOverlay');
    const messageElement = document.getElementById('notificationMessage');
    messageElement.textContent = formattedMessage;
    overlay.style.display = 'flex';
  } else if (type === 'large') {
    const overlay = document.getElementById('largeNotificationOverlay');
    const messageElement = document.getElementById('largeNotificationMessage');
    messageElement.innerHTML = formattedMessage; // Use innerHTML for <br> tags
    overlay.style.display = 'flex';
  }
  gameState.isNotificationVisible = true;
  saveGame();
}

function hideNotification(type = 'normal') {
  if (type === 'normal') {
    const overlay = document.getElementById('notificationOverlay');
    const messageElement = document.getElementById('notificationMessage');
    if (messageElement.textContent === "Welcome to Wastelands! Survive and thrive in this post-apocalyptic world. Click 'Gather' to gather the various resources manually, build buildings to get a steady income flowing and build improvements to increase storage room and more.") {
      gameState.hasSeenWelcome = true;
      saveGame();
    }
    overlay.style.display = 'none';
  } else if (type === 'large') {
    const overlay = document.getElementById('largeNotificationOverlay');
    overlay.style.display = 'none';
  }
  // Adjust the active event's startTime to account for the paused duration
  if (gameState.activeEvent) {
    const now = Date.now();
    const pausedDuration = now - gameState.lastTick; // Time elapsed during pause
    gameState.activeEvent.startTime += pausedDuration; // Shift startTime forward
  }
  gameState.isNotificationVisible = false;
  gameState.lastTick = Date.now();
  saveGame();
}

// Set up dismiss button
document.getElementById('notificationDismiss').addEventListener('click', hideNotification);


function createEventCard(event) {
  const now = Date.now();
  const elapsed = now - event.startTime;
  const remainingTime = Math.max(0, event.duration - elapsed);
  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return `
    <div class="buff-debuff debuff">
      <p>${event.displayText} - ${formattedTime} remaining</p>
    </div>
  `;
}

// Game logic
function tick() {
  const now = Date.now();
  

if (!gameState.lastAchievementCheck) {
  gameState.lastAchievementCheck = now;
}
if (now - gameState.lastAchievementCheck >= 10000) { // Check every 10 seconds
  checkAchievements();
  gameState.lastAchievementCheck = now;
}
  
  if (gameState.isNotificationVisible) {
    updateUI();
    return;
  }

  const timeDiff = (now - gameState.lastTick) / 1000;

  checkForEvents();

  if (gameState.activeEvent) {
  const elapsed = now - gameState.activeEvent.startTime;
  if (elapsed >= gameState.activeEvent.duration) {
    if (gameState.activeEvent.effect) {
      const effect = gameState.activeEvent.effect;
      let effectDescription = '';
      if (effect.type === 'consumeResource') {
        effectDescription = `Consumed ${effect.amountPerSecond * (gameState.activeEvent.duration / 1000)} ${effect.resourceId} over ${gameState.activeEvent.duration / 1000} seconds.`;
      } else if (effect.type === 'productionModifier') {
        effectDescription = `Modified ${effect.resourceId} production by ${((effect.modifier - 1) * 100).toFixed(0)}% for ${gameState.activeEvent.duration / 1000} seconds.`;
      } else if (effect.type === 'addResource') {
        const amount = typeof effect.amount === 'function' ? effect.amount() : effect.amount;
        effectDescription = `Added ${amount} ${effect.resourceId}.`;
        gameState.resources[effect.resourceId].amount = Math.min(
          gameState.resources[effect.resourceId].max,
          gameState.resources[effect.resourceId].amount + amount
        );
      } else if (effect.type === 'removeResource') {
        const amount = typeof effect.amount === 'function' ? effect.amount() : effect.amount;
        effectDescription = `Removed ${amount} ${effect.resourceId}.`;
        gameState.resources[effect.resourceId].amount = Math.max(
          0,
          gameState.resources[effect.resourceId].amount - amount
        );
      } else if (effect.type === 'communityAttack') {
        // The effect.resolve() will handle logging the attack outcome
        effect.resolve(); // Resolve the attack
      }
      if (effectDescription) {
        logEvent(`Event ended: ${gameState.activeEvent.name} - ${effectDescription}`);
      }
    } else {
      logEvent(`Event ended: ${gameState.activeEvent.name} - No additional effects.`);
    }
    gameState.activeEvent = null;
    saveGame();
  }
}

  const {
    foodProductionModifier,
    waterProductionModifier,
    woodProductionModifier,
    scrapProductionModifier,
    electronicsProductionModifier,
    medsProductionModifier,
    waterConsumptionRate
  } = getProductionModifiers();

  const trailers = gameState.buildings.trailer.amount;
  if (trailers >= 35 && !gameState.hasIncreasedFoodConsumption) {
    showNotification("Your community is growing fast. Your gardens are having a hard time keeping up and more mouths to feed require you to amp up your food production.", 'normal');
    gameState.hasIncreasedFoodConsumption = true;
    gameState.foodConsumptionRate = 0.15;
    saveGame();
  }

  Object.values(gameState.resources).forEach(resource => {
    resource.perSecond = 0;
  });

  const netChanges = {};
  Object.keys(gameState.resources).forEach(resourceId => {
    netChanges[resourceId] = 0;
  });

  let consumptionModifier = 1.0;
  gameState.researchEffects.forEach(effect => {
    if (effect.type === 'reduceConsumption') {
      consumptionModifier *= effect.multiplier;
    }
  });

  netChanges.food -= (gameState.foodConsumptionRate * consumptionModifier) * timeDiff;
  netChanges.water -= (waterConsumptionRate * consumptionModifier) * timeDiff;

  gameState.resources.food.perSecond -= gameState.foodConsumptionRate * consumptionModifier;
  gameState.resources.water.perSecond -= waterConsumptionRate * consumptionModifier;

  if (gameState.activeEvent && gameState.activeEvent.effect) {
    const effect = gameState.activeEvent.effect;
    if (effect.type === 'consumeResource') {
      const consumption = effect.amountPerSecond * timeDiff;
      netChanges[effect.resourceId] -= consumption;
      gameState.resources[effect.resourceId].perSecond -= effect.amountPerSecond;
    } else if (effect.type === 'productionModifier') {
      // Handled in production logic below
    }
  }
  
  if (gameState.activeExpedition) {
    const elapsed = now - gameState.activeExpedition.startTime;
    if (elapsed >= gameState.activeExpedition.duration) {
      resolveExpedition();
    }
  }

  Object.values(gameState.buildings).forEach(building => {
    Object.entries(building.provides || {}).forEach(([resourceId, amount]) => {
      if (resourceId === 'electricity' || resourceId === 'researchPoints' || resourceId === 'adminPoints') return;

      if ((building.consumes && building.consumes.electricity) && gameState.electricityConsumersDisabled) {
        return;
      }

      let modifiedAmount = amount;

      const productionEffects = gameState.researchEffects.filter(
        effect => effect.type === 'increaseProduction' && effect.buildingId === building.id && effect.resourceId === resourceId
      );
      productionEffects.forEach(effect => {
        modifiedAmount *= effect.multiplier;
      });

      if (resourceId === 'food') {
        modifiedAmount *= foodProductionModifier;
      } else if (resourceId === 'water') {
        modifiedAmount *= waterProductionModifier;
      } else if (resourceId === 'wood') {
        modifiedAmount *= woodProductionModifier;
      } else if (resourceId === 'scrap') {
        modifiedAmount *= scrapProductionModifier;
      } else if (resourceId === 'electronics') {
        modifiedAmount *= electronicsProductionModifier;
      } else if (resourceId === 'meds') {
        modifiedAmount *= medsProductionModifier;
      }

      const generation = modifiedAmount * building.amount * timeDiff;
      netChanges[resourceId] += generation;
      gameState.resources[resourceId].perSecond += modifiedAmount * building.amount;
    });

    Object.entries(building.consumes || {}).forEach(([resourceId, amount]) => {
      if (resourceId === 'electricity') return;
      if (building.id === 'generator') return;
      const modifiedAmount = amount * consumptionModifier;
      const consumption = modifiedAmount * building.amount * timeDiff;
      netChanges[resourceId] -= consumption;
      gameState.resources[resourceId].perSecond -= modifiedAmount * building.amount;
    });
  });

  if (gameState.hasUnlockedElectricity) {
    const generators = gameState.buildings.generator.amount;
    const solarPanels = gameState.buildings.solarpanel.amount;
    const windmills = gameState.buildings.windmill.amount;
    const waterPower = gameState.buildings.powerFromTheRiver.amount;
    const trailers = gameState.buildings.trailer.amount;

    let electricityGenerated = 0;
    let totalElectricityConsumed = 0;

    Object.values(gameState.buildings).forEach(building => {
      if (building.consumes && building.consumes.electricity) {
        const consumption = building.consumes.electricity * building.amount * timeDiff;
        totalElectricityConsumed += consumption;
      }
    });

    Object.values(gameState.improvements).forEach(improvement => {
      if (improvement.consumes && improvement.consumes.electricity) {
        const consumption = improvement.consumes.electricity * improvement.amount * timeDiff;
        totalElectricityConsumed += consumption;
      }
    });

    if (trailers > 0) {
      const trailerConsumption = 0.2 * trailers * timeDiff;
      totalElectricityConsumed += trailerConsumption;
    }

    let renewableProductionPerSecond = 0;

    if (solarPanels > 0 && isDaytime()) {
      const cloudCover = gameState.weather.cloudCover || 0;
      let efficiency;
      if (cloudCover === 0) {
        efficiency = 1.0;
      } else if (cloudCover <= 25) {
        efficiency = 0.9;
      } else if (cloudCover <= 50) {
        efficiency = 0.75;
      } else if (cloudCover <= 84) {
        efficiency = 0.5;
      } else {
        efficiency = 0.08;
      }
      const baseProduction = solarPanels * 0.35;
      const adjustedProduction = baseProduction * efficiency;
      renewableProductionPerSecond += adjustedProduction;
      electricityGenerated += adjustedProduction * timeDiff;
    }

    const windSpeed = gameState.weather.windSpeed || 0;
    const isWindy = windSpeed > 3;
    if (isWindy) {
      const windProduction = windmills * 0.25;
      renewableProductionPerSecond += windProduction;
      electricityGenerated += windProduction * timeDiff;
    }
    
    if (waterPower > 0) {
      const waterPowerProduction = waterPower * 3.25;
      renewableProductionPerSecond += waterPowerProduction;
      electricityGenerated += waterPowerProduction * timeDiff;
    }

    if (generators > 0) {
      let generatorProductionRate = gameState.buildings.generator.provides.electricity || 0;

      const productionEffects = gameState.researchEffects.filter(
        effect => effect.type === 'increaseProduction' && effect.buildingId === 'generator' && effect.resourceId === 'electricity'
      );
      productionEffects.forEach(effect => {
        generatorProductionRate *= effect.multiplier;
      });

      const woodConsumptionRate = generators * 0.5 * consumptionModifier;
      const currentWood = gameState.resources.wood.amount;
      const woodRequiredThisTick = woodConsumptionRate * timeDiff;

      let woodProductionRate = 0;
      Object.values(gameState.buildings).forEach(building => {
        if (building.provides && building.provides.wood) {
          let modifiedAmount = building.provides.wood;
          const productionEffects = gameState.researchEffects.filter(
            effect => effect.type === 'increaseProduction' && effect.buildingId === building.id && effect.resourceId === 'wood'
          );
          productionEffects.forEach(effect => {
            modifiedAmount *= effect.multiplier;
          });
          modifiedAmount *= woodProductionModifier;
          if (building.consumes && building.consumes.electricity && gameState.electricityConsumersDisabled) {
            modifiedAmount = 0;
          }
          woodProductionRate += modifiedAmount * building.amount;
        }
      });

      const timeHorizon = 5;
      const woodAvailableOverTime = currentWood + (woodProductionRate * timeHorizon);
      const woodRequiredOverTime = woodConsumptionRate * timeHorizon;
      const canSustain = woodAvailableOverTime >= woodRequiredOverTime;

      const timeSinceLastChange = (now - gameState.lastGeneratorStateChange) / 1000;
      const minToggleDelay = 5;

      const totalConsumptionPerSecond = totalElectricityConsumed / timeDiff;
      const renewableSufficient = renewableProductionPerSecond >= totalConsumptionPerSecond;
      const batteryPower = totalConsumptionPerSecond *2;
      const batterySufficent = renewableProductionPerSecond + (gameState.electricity - batteryPower) >= totalConsumptionPerSecond;
      //console.log("totalConsumptionPerSecond:" + totalConsumptionPerSecond);
      //console.log("gameState.electricity: " + gameState.electricity);
      //console.log("batteryPower: " + batteryPower);
      //console.log("batterySufficent: " + batterySufficent);
      //console.log("renewableSufficient: " + renewableSufficient);
      //console.log("canSustain: " +canSustain);
      //console.log("gameState.generatorsDisabled: " + gameState.generatorsDisabled);
      //console.log("gameState.lastGeneratorStateChange: " + gameState.lastGeneratorStateChange);

      if (timeSinceLastChange >= minToggleDelay) {
  //if ((renewableSufficient || batterySufficent || !canSustain) && !gameState.generatorsDisabled) {
    if ((batterySufficent || !canSustain) && !gameState.generatorsDisabled) {
    gameState.generatorsDisabled = true;
    gameState.lastGeneratorStateChange = now;
    let message;
    if (!canSustain) {
      message = "Not enough wood! Makeshift Generators have stopped producing electricity.";
      showNotification(message, 'normal');
    } else {
      message = "Your renewable energy sources create enough electricity for the community's needs. The Makeshift Generators have been turned off to conserve wood.";
    }
    //showNotification(message, 'normal');
    logEvent(message);
    saveGame();
  //} else if (!renewableSufficient && !batterySufficent && canSustain && gameState.generatorsDisabled) {
  } else if (!batterySufficent && canSustain && gameState.generatorsDisabled) {
    gameState.generatorsDisabled = false;
    gameState.lastGeneratorStateChange = now;
    const message = "Your renewable energy sources do not create sufficient electricity to satisfy your ever growing community's needs. The Makeshift Generators have been turned on again to create sufficient electricity.";
    //showNotification(message, 'normal');
    logEvent(message);
    saveGame();
  } else {
    //console.log("else");
    //    gameState.generatorsDisabled = false;
    //gameState.lastGeneratorStateChange = now;
    //const message = "Your renewable energy sources do not create sufficient electricity to satisfy your ever growing community's needs. The Makeshift Generators have been turned on again to create sufficient electricity.";
    //howNotification(message, 'normal');
    //logEvent(message);
    //saveGame();
  }
}

      if (!gameState.generatorsDisabled && gameState.resources.wood.amount >= woodRequiredThisTick && !renewableSufficient) {
        electricityGenerated += generators * generatorProductionRate * timeDiff;
        netChanges.wood -= woodRequiredThisTick;
        gameState.resources.wood.perSecond -= woodConsumptionRate;
      } else if (!gameState.generatorsDisabled && gameState.resources.wood.amount < woodRequiredThisTick) {
        gameState.generatorsDisabled = true;
        gameState.lastGeneratorStateChange = now;
        showNotification("Not enough wood! Makeshift Generators have stopped producing electricity.", 'normal');
        saveGame();
      }
    }

    gameState.electricity += electricityGenerated;
    gameState.electricity -= totalElectricityConsumed;
    gameState.electricity = Math.min(gameState.maxElectricity, Math.max(0, gameState.electricity));

    gameState.resources.electricity.amount = gameState.electricity;
    gameState.resources.electricity.max = gameState.maxElectricity;
    gameState.resources.electricity.perSecond = (electricityGenerated - totalElectricityConsumed) / timeDiff;

    const hasElectricityConsumers = Object.values(gameState.buildings).some(
      building => building.consumes && building.consumes.electricity && building.amount > 0
    ) || Object.values(gameState.improvements).some(
      improvement => improvement.consumes && improvement.consumes.electricity && improvement.amount > 0
    );
    if (hasElectricityConsumers) {
      if (gameState.electricity <= 0 && !gameState.electricityConsumersDisabled) {
        gameState.electricityConsumersDisabled = true;
        showNotification(
          "Electricity has run out! All electricity-dependent buildings (e.g., Lumberjack Camps, Tinkerer's Huts, Gatherer Guilds, Desalination Plants) have stopped producing resources.",
          'normal'
        );
		logEvent(message);
        saveGame();
      } else if (gameState.electricity > 0 && gameState.electricityConsumersDisabled) {
        gameState.electricityConsumersDisabled = false;
        showNotification(
          "Electricity restored! All electricity-dependent buildings have resumed production.",
          'normal'
        );
		logEvent(message);
        saveGame();
      }
    }
  }

  if (gameState.hasUnlockedCivilization) {
    const schools = gameState.buildings.school.amount;

    let researchGenerated = 0;
    if (schools > 0 && !gameState.electricityConsumersDisabled) {
      const researchProductionRate = gameState.buildings.school.provides.researchPoints || 0;
      researchGenerated += schools * researchProductionRate * timeDiff;
    }

    let totalResearchConsumed = 0;

    gameState.researchPoints += researchGenerated;
    gameState.researchPoints -= totalResearchConsumed;
    gameState.researchPoints = Math.min(gameState.maxResearchPoints, Math.max(0, gameState.researchPoints));

    gameState.resources.researchPoints.amount = gameState.researchPoints;
    gameState.resources.researchPoints.max = gameState.maxResearchPoints;
    gameState.resources.researchPoints.perSecond = (researchGenerated - totalResearchConsumed) / timeDiff;

    const townhalls = gameState.buildings.townhall.amount;
    let adminGenerated = 0;
    if (townhalls > 0 && !gameState.electricityConsumersDisabled) {
      const adminProductionRate = gameState.buildings.townhall.provides.adminPoints || 0;
      adminGenerated += townhalls * adminProductionRate * timeDiff;
    }
    let totalAdminConsumed = 0;
    gameState.adminPoints += adminGenerated;
    gameState.adminPoints -= totalAdminConsumed;
    gameState.adminPoints = Math.min(gameState.maxAdminPoints, Math.max(0, gameState.adminPoints));
    gameState.resources.adminPoints.amount = gameState.adminPoints;
    gameState.resources.adminPoints.max = gameState.maxAdminPoints;
    gameState.resources.adminPoints.perSecond = (adminGenerated - totalAdminConsumed) / timeDiff;

    if (gameState.hasUnlockedMilitary) {
      const armories = gameState.buildings.armory.amount;
      let weaponsGenerated = 0;
      if (armories > 0 && !gameState.electricityConsumersDisabled) {
        const weaponsProductionRate = gameState.buildings.armory.provides.weapons || 0;
        weaponsGenerated += armories * weaponsProductionRate * timeDiff;
      }
      let totalWeaponsConsumed = 0;
      gameState.weapons += weaponsGenerated;
      gameState.weapons -= totalWeaponsConsumed;
      gameState.weapons = Math.min(gameState.maxWeapons, Math.max(0, gameState.weapons));
      gameState.resources.weapons.amount = gameState.weapons;
      gameState.resources.weapons.max = gameState.maxWeapons;
      gameState.resources.weapons.perSecond = (weaponsGenerated - totalWeaponsConsumed) / timeDiff;

      const barracks = gameState.buildings.barracks.amount;
      let soldiersGenerated = 0;
      //TODO: Use all buildings for soldier production
	    if (barracks > 0 && !gameState.electricityConsumersDisabled) {
        const soldiersProductionRate = gameState.buildings.barracks.provides.soldiers || 0;
        soldiersGenerated += barracks * soldiersProductionRate * timeDiff;
      }
      let totalSoldiersConsumed = 0;
      gameState.soldiers += soldiersGenerated;
	    
	    // console.log(`soldiersGenerated: ${soldiersGenerated}`);

      gameState.soldiers -= totalSoldiersConsumed;
      gameState.soldiers = Math.min(gameState.maxSoldiers, Math.max(0, gameState.soldiers));
      gameState.resources.soldiers.amount = gameState.soldiers;
      gameState.resources.soldiers.max = gameState.maxSoldiers;
      gameState.resources.soldiers.perSecond = (soldiersGenerated - totalSoldiersConsumed) / timeDiff;
//	    console.log(`gameState.resources.soldiers.perSecond: ${gameState.resources.soldiers.perSecond}`);

      if (gameState.hasUnlockedDefensePower) {
  // Base defense from soldiers and weapons
let baseDefense = 0;
let doubledSoldiers = gameState.soldiers * 2;
if (doubledSoldiers <= gameState.weapons) {
	baseDefense = gameState.soldiers * 2 / 10;
}
else {
	baseDefense = ((gameState.soldiers * 2) - gameState.weapons) / 10;
}


	      
  // Sum contributions from all defense improvements
  let improvementDefense = 0;
  Object.values(gameState.improvements).forEach(improvement => {
    if (improvement.raises === 'defensePower') {
      improvementDefense += improvement.amount * improvement.raisesBy;
    }
  });

  // Total defense power
  gameState.resources.defensePower.amount = Math.max(0, baseDefense + improvementDefense);
  gameState.resources.defensePower.perSecond = 0; // Still static
}
    }
  }
  
  Object.keys(gameState.resources).forEach(resourceId => {
    if (resourceId === 'electricity' || resourceId === 'researchPoints' || resourceId === 'adminPoints' || resourceId === 'weapons' || resourceId === 'soldiers' || resourceId === 'defensePower') return;
    const resource = gameState.resources[resourceId];
    const currentAmount = Number(resource.amount) || 0;
    const change = Number(netChanges[resourceId]) || 0;
    const maxAmount = Number(resource.max ?? Infinity) || Infinity;
    resource.amount = Math.min(maxAmount, Math.max(0, currentAmount + change));
  });

  gameState.lastTick = now;
  updateUI();
}

function formatNumber(number, decimals = 2) {
  return Number(number).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}


function updateExpeditionSelection(expeditionId, percentage) {
  if (!gameState.selectedExpeditionPercentages) {
    gameState.selectedExpeditionPercentages = {};
  }
  gameState.selectedExpeditionPercentages[expeditionId] = percentage;
  saveGame();
  updateUI();
}

function showEventLog() {
  if (gameState.eventLog.length === 0) {
    showNotification("No events have occurred yet.", "large");
    return;
  }

  const logEntries = gameState.eventLog
    .map(entry => `<span style="color: #4CAF50; font-weight: bold;">${entry.timestamp}</span>: ${entry.description}`)
    .join('\n');
  showNotification(`Recent Events (Last ${gameState.eventLog.length}):\n${logEntries}`, "large");
}

function resolveExpedition() {
  const expedition = EXPEDITIONS[gameState.activeExpedition.id];
  const soldiersSent = gameState.activeExpedition.soldiersSent;
  let outcome, woodGain, foodGain, scrapGain, soldiersLost, message;

  // Check if Field Medic Academy is built
  const hasFieldMedicAcademy = gameState.buildings.fieldMedicAcademy.amount > 0;
  const lossReduction = hasFieldMedicAcademy ? (1 - gameState.buildings.fieldMedicAcademy.reducesExpeditionLosses) : 1; // 0.9 if built, 1 if not

  if (expedition.id === 'scavenging') {
    const rand = Math.random();
    if (rand < 0.12) { // 12% - Empty handed
      outcome = 1;
      soldiersLost = 0;
      message = "Your soldiers went out and searched the wastelands. They found absolutely nothing, they come back empty handed and frustrated. Unfortunately it seems you wasted the resources for this trip. Better luck next time.";
    } else if (rand < 0.70) { // 58% - Resources, no fight
      outcome = 2;
      woodGain = Math.floor(Math.random() * (1920 - 230 + 1)) + 230;
      foodGain = Math.floor(Math.random() * (1205 - 129 + 1)) + 129;
      scrapGain = Math.floor(Math.random() * (1882 - 201 + 1)) + 201;
      soldiersLost = 0;
      message = `Your soldiers went out and searched the wastelands. They came back with quite a bunch of materials:\nWood: ${woodGain}\nFood: ${foodGain}\nScrap: ${scrapGain}\nAll soldiers came back.`;
    } else if (rand < 0.85) { // 15% - Resources, fight won
      outcome = 3;
      woodGain = Math.floor(Math.random() * (3920 - 530 + 1)) + 530;
      foodGain = Math.floor(Math.random() * (2255 - 329 + 1)) + 329;
      scrapGain = Math.floor(Math.random() * (3812 - 601 + 1)) + 601;
      soldiersLost = Math.floor(soldiersSent * (Math.random() * 0.15) * lossReduction);
      message = `Your soldiers went out and searched the wastelands. They came back with quite a bunch of materials, but the fight for them came at a cost!\nWood: ${woodGain}\nFood: ${foodGain}\nScrap: ${scrapGain}\nLost soldiers: ${soldiersLost}`;
    } else { // 15% - Fight lost
      outcome = 4;
      woodGain = 0;
      foodGain = 0;
      scrapGain = 0;
      soldiersLost = Math.floor(soldiersSent * (Math.random() * 0.55) * lossReduction);
      message = `Your soldiers went out and searched the wastelands. Unfortunately the resistance they encountered was too much for them and those who survived had to retreat empty handed.\nLost soldiers: ${soldiersLost}`;
    }
  } else if (expedition.id === 'pillage') {
    const rand = Math.random();
    if (rand < 0.33) { // 33% - Resources with losses
      outcome = 1;
      woodGain = Math.floor(Math.random() * (2920 - 430 + 1)) + 430;
      foodGain = Math.floor(Math.random() * (4205 - 629 + 1)) + 629;
      scrapGain = Math.floor(Math.random() * (3882 - 361 + 1)) + 361;
      soldiersLost = Math.floor(soldiersSent * (0.02 + Math.random() * (0.28 - 0.02)) * lossReduction); // 2-28%
      message = `Your soldiers raided a nearby village. They came back with quite a bunch of materials:\nWood: ${woodGain}\nFood: ${foodGain}\nScrap: ${scrapGain}\nLost soldiers: ${soldiersLost}`;
    } else if (rand < 0.67) { // 34% - Resources, no fight
      outcome = 2;
      woodGain = Math.floor(Math.random() * (1920 - 230 + 1)) + 230;
      foodGain = Math.floor(Math.random() * (1205 - 129 + 1)) + 129;
      scrapGain = Math.floor(Math.random() * (1882 - 201 + 1)) + 201;
      soldiersLost = 0;
      message = `Your soldiers went out to raid a nearby village. Upon arrival, the elders of the enemy village sent an envoy to your troops, giving them huge amounts of resources as a bribe to prevent hostilities.\nWood: ${woodGain}\nFood: ${foodGain}\nScrap: ${scrapGain}`;
    } else { // 33% - Total loss
      outcome = 3;
      woodGain = 0;
      foodGain = 0;
      scrapGain = 0;
      soldiersLost = Math.floor(soldiersSent * lossReduction); // Full loss reduced by 10% if academy exists
      message = "Your soldiers went out to raid a nearby village. Boy, did you underestimate your enemies. They slaughtered every last one of your soldiers.";
    }
  }

  // Return surviving soldiers
  const soldiersReturning = soldiersSent - soldiersLost;
  gameState.soldiers = Math.min(gameState.maxSoldiers, gameState.soldiers + soldiersReturning);
  gameState.weapons = Math.min(gameState.maxWeapons, gameState.weapons + soldiersReturning);
  gameState.resources.soldiers.amount = gameState.soldiers;
  gameState.resources.weapons.amount = gameState.weapons;

  // Add resources
  gameState.resources.wood.amount = Math.min(gameState.resources.wood.max, gameState.resources.wood.amount + (woodGain || 0));
  gameState.resources.food.amount = Math.min(gameState.resources.food.max, gameState.resources.food.amount + (foodGain || 0));
  gameState.resources.scrap.amount = Math.min(gameState.resources.scrap.max, gameState.resources.scrap.amount + (scrapGain || 0));
  
  // Log the expedition outcome
  logEvent(`Expedition (${expedition.name}) completed: ${message.replace(/\n/g, ' ')}`);

  // Show the result notification
  showNotification(message, 'large');

  // Clear the active expedition
  gameState.activeExpedition = null;

  // Force a full UI refresh by resetting the expeditions container
  const expeditionsContainer = document.getElementById('expeditionsContainer');
  if (expeditionsContainer) {
    expeditionsContainer.dataset.initialized = false; // Force rebuild of expedition cards
  }

  saveGame();
  updateUI();
}

function getProductionModifiers() {
  let foodProductionModifier = 1.0;
  let waterProductionModifier = 1.0;
  let woodProductionModifier = 1.0;
  let scrapProductionModifier = 1.0;
  let electronicsProductionModifier = 1.0;
  let medsProductionModifier = 1.0;
  let waterConsumptionRate = gameState.waterConsumptionRate;

  // Apply buffs/debuffs
  gameState.buffsDebuffs.forEach(effect => {
    const modifiers = effect.apply ? effect.apply() : {};
    if (modifiers.waterConsumptionModifier) {
      waterConsumptionRate *= modifiers.waterConsumptionModifier;
    }
    if (modifiers.foodProductionModifier) {
      foodProductionModifier *= modifiers.foodProductionModifier;
    }
    if (modifiers.waterProductionModifier) {
      waterProductionModifier *= modifiers.waterProductionModifier;
    }
    if (modifiers.woodProductionModifier) {
      woodProductionModifier *= modifiers.woodProductionModifier;
    }
    if (modifiers.scrapProductionModifier) {
      scrapProductionModifier *= modifiers.scrapProductionModifier;
    }
    if (modifiers.electronicsProductionModifier) {
      electronicsProductionModifier *= modifiers.electronicsProductionModifier;
    }
    if (modifiers.medsProductionModifier) {
      medsProductionModifier *= modifiers.medsProductionModifier;
    }
  });

  return {
    foodProductionModifier,
    waterProductionModifier,
    woodProductionModifier,
    scrapProductionModifier,
    electronicsProductionModifier,
    medsProductionModifier,
    waterConsumptionRate
  };
}

function createResourceBudgetItem(resourceId, resource) {
  const {
    foodProductionModifier,
    waterProductionModifier,
    woodProductionModifier,
    scrapProductionModifier,
    electronicsProductionModifier,
    medsProductionModifier,
    waterConsumptionRate
  } = getProductionModifiers();

  // Apply research effects for consumption reduction
  let consumptionModifier = 1.0;
  gameState.researchEffects.forEach(effect => {
    if (effect.type === 'reduceConsumption') {
      consumptionModifier *= effect.multiplier;
    }
  });
  
  if (resourceId === 'electricity' || resourceId === 'researchPoints' || resourceId === 'adminPoints' || resourceId === 'weapons' || resourceId === 'soldiers') return '';

  // Calculate production
  let totalProduction = 0;
  const producers = Object.values(gameState.buildings)
    .filter(building => building.provides && building.provides[resourceId] && building.amount > 0)
    .map(building => {
      if (building.consumes && building.consumes.electricity && gameState.electricityConsumersDisabled) {
        return `<li>${building.name}: (+${building.provides[resourceId]}/s, ${building.amount} owned, total +0/s) (Disabled: No Electricity)</li>`;
      }
      let modifiedAmount = building.provides[resourceId];

      // Apply research effects for production increase
      const productionEffects = gameState.researchEffects.filter(
        effect => effect.type === 'increaseProduction' && effect.buildingId === building.id && effect.resourceId === resourceId
      );
      productionEffects.forEach(effect => {
        modifiedAmount *= effect.multiplier;
      });

      // Apply weather modifiers
      if (resourceId === 'food') {
        modifiedAmount *= foodProductionModifier;
      } else if (resourceId === 'water') {
        modifiedAmount *= waterProductionModifier;
      } else if (resourceId === 'wood') {
        modifiedAmount *= woodProductionModifier;
      } else if (resourceId === 'scrap') {
        modifiedAmount *= scrapProductionModifier;
      } else if (resourceId === 'electronics') {
        modifiedAmount *= electronicsProductionModifier;
      } else if (resourceId === 'meds') {
        modifiedAmount *= medsProductionModifier;
      }

      const total = modifiedAmount * building.amount;
      totalProduction += total;
      return `<li>${building.name}: (+${modifiedAmount.toFixed(2)}/s, ${building.amount} owned, total +${total.toFixed(2)}/s)</li>`;
    })
    .join('');

  // Calculate consumption
  let totalConsumption = 0;
  const consumerItems = Object.values(gameState.buildings)
    .filter(building => building.consumes && building.consumes[resourceId] && building.amount > 0)
    .map(building => {
      // Skip generator consumption if disabled and the resource is wood
      if (building.id === 'generator' && resourceId === 'wood' && gameState.generatorsDisabled) {
        return `<li>${building.name}: (-${building.consumes[resourceId].toFixed(2)}/s, ${building.amount} owned, total -0/s) (Disabled: Renewable Energy Sufficient or No Wood)</li>`;
      }
      const modifiedAmount = building.consumes[resourceId] * consumptionModifier;
      const total = modifiedAmount * building.amount;
      totalConsumption += total;
      return `<li>${building.name}: (-${building.consumes[resourceId].toFixed(2)}/s, ${building.amount} owned, total -${total.toFixed(2)}/s)</li>`;
    });

  if (resourceId === 'food') {
    const modifiedBaseConsumption = gameState.foodConsumptionRate * consumptionModifier;
    totalConsumption += modifiedBaseConsumption;
    consumerItems.push(`<li>Base Consumption: (-${modifiedBaseConsumption.toFixed(2)}/s)</li>`);
  } else if (resourceId === 'water') {
    const modifiedBaseConsumption = waterConsumptionRate * consumptionModifier;
    totalConsumption += modifiedBaseConsumption;
    consumerItems.push(`<li>Base Consumption: (-${modifiedBaseConsumption.toFixed(2)}/s)</li>`);
  }

  const netRate = totalProduction - totalConsumption;
  const netClass = netRate > 0 ? 'net-positive' : netRate < 0 ? 'net-negative' : 'net-neutral';

  return `
    <div class="resource-budget-item">
      <h3>${resource.name}</h3>
      <p>Net: <span class="${netClass}">${netRate.toFixed(2)}/s</span></p>
      ${producers ? '<p>Produced:</p><ul>' + producers + '</ul>' : ''}
      ${consumerItems.length > 0 ? '<p>Consumed:</p><ul>' + consumerItems.join('') + '</ul>' : ''}
    </div>
  `;
}

function createElectricityBudgetItem() {
  if (!gameState.hasUnlockedElectricity) return '';

  const generators = gameState.buildings.generator.amount;
  const solarPanels = gameState.buildings.solarpanel.amount;
  const windmills = gameState.buildings.windmill.amount;
  const waterPower = gameState.buildings.powerFromTheRiver.amount;
  const trailers = gameState.buildings.trailer.amount;
  const defenseTurrets = gameState.improvements.defenseTurrets.amount;

  let generatorProductionRate = gameState.buildings.generator.provides.electricity || 0;

  const productionEffects = gameState.researchEffects.filter(
    effect => effect.type === 'increaseProduction' && effect.buildingId === 'generator' && effect.resourceId === 'electricity'
  );
  productionEffects.forEach(effect => {
    generatorProductionRate *= effect.multiplier;
  });

  let generatorProduction = gameState.generatorsDisabled ? 0 : generators * generatorProductionRate;

  let solarProduction = 0;
  let solarStatus = '';
  if (isDaytime()) {
    const cloudCover = gameState.weather.cloudCover || 0;
    let efficiency;
    if (cloudCover === 0) {
      efficiency = 1.0;
      solarStatus = ' (Clear Skies 100% efficiency)';
    } else if (cloudCover <= 25) {
      efficiency = 0.9;
      solarStatus = ' (Few Clouds 90% efficiency)';
    } else if (cloudCover <= 50) {
      efficiency = 0.75;
      solarStatus = ' (Scattered Clouds 75% efficiency)';
    } else if (cloudCover <= 84) {
      efficiency = 0.5;
      solarStatus = ' (Broken Clouds 50% efficiency)';
    } else {
      efficiency = 0.08;
      solarStatus = ' (Overcast 8% efficiency)';
    }
    const baseProduction = solarPanels * 0.35;
    solarProduction = baseProduction * efficiency;
  } else {
    solarStatus = ' (Disabled: Night)';
  }

  const windSpeed = gameState.weather.windSpeed || 0;
  const isWindy = windSpeed > 3;
  const windProduction = isWindy ? windmills * 0.25 : 0;

  const waterPowerProduction = waterPower * 3.25;

  const totalProduction = generatorProduction + solarProduction + windProduction + waterPowerProduction;

  let totalConsumption = 0;
  const consumers = [];
  Object.values(gameState.buildings).forEach(building => {
    if (building.consumes && building.consumes.electricity && building.amount > 0) {
      const consumptionPerUnit = building.consumes.electricity;
      const total = consumptionPerUnit * building.amount;
      totalConsumption += total;
      consumers.push(`<li>${building.name}: (-${consumptionPerUnit.toFixed(2)}/s, ${building.amount} owned, total -${total.toFixed(2)}/s)</li>`);
    }
  });

  Object.values(gameState.improvements).forEach(improvement => {
    if (improvement.consumes && improvement.consumes.electricity && improvement.amount > 0) {
      const consumptionPerUnit = improvement.consumes.electricity;
      const total = consumptionPerUnit * improvement.amount;
      totalConsumption += total;
      consumers.push(`<li>${improvement.name}: (-${consumptionPerUnit.toFixed(2)}/s, ${improvement.amount} owned, total -${total.toFixed(2)}/s)</li>`);
    }
  });

  if (trailers > 0) {
    const trailerConsumptionPerUnit = 0.2;
    const trailerTotalConsumption = trailerConsumptionPerUnit * trailers;
    totalConsumption += trailerTotalConsumption;
    consumers.push(`<li>Trailer: (-${trailerConsumptionPerUnit.toFixed(2)}/s, ${trailers} owned, total -${trailerTotalConsumption.toFixed(2)}/s)</li>`);
  }

  const netRate = totalProduction - totalConsumption;
  const netClass = netRate > 0 ? 'net-positive' : netRate < 0 ? 'net-negative' : 'net-neutral';

  const producers = [];
  if (generators > 0) {
    producers.push(`<li>Makeshift Generators: (+${gameState.generatorsDisabled ? 0 : generatorProductionRate.toFixed(2)}/s, ${generators} owned, total +${generatorProduction.toFixed(2)}/s)${gameState.generatorsDisabled ? ' (Disabled: No Wood or Renewable Sufficient)' : ''}</li>`);
  }
  if (solarPanels > 0) {
    producers.push(`<li>Solar Panels: (+${(solarProduction / solarPanels || 0).toFixed(2)}/s, ${solarPanels} owned, total +${solarProduction.toFixed(2)}/s)${solarStatus}</li>`);
  }
  if (windmills > 0) {
    producers.push(`<li>Windmills: (+${isWindy ? 0.25 : 0}/s, ${windmills} owned, total +${windProduction.toFixed(2)}/s)${isWindy ? '' : ' (Disabled: Low Wind)'}</li>`);
  }
  if (waterPower > 0) {
    producers.push(`<li>Water Power: (+3.25/s, ${waterPower} owned, total +${waterPowerProduction.toFixed(2)}/s)</li>`);
  }

  const neededPowereBackup = totalConsumption - waterPowerProduction;
  const neededPowereBackupClass = neededPowereBackup < 0 ? 'net-positive' : neededPowereBackup > 0 ? 'net-negative' : 'net-neutral';
  const volatilePower = solarProduction + windProduction;
  const batteryLife = gameState.electricity / (totalConsumption - waterPowerProduction);
   const batteryLifeClass = batteryLife < 0 ? 'net-positive' : batteryLife > 0 ? 'net-negative' : 'net-neutral';

  return `
    <div class="resource-budget-item">
      <h3>Electricity</h3>
      <p>Net: <span class="${netClass}">${netRate.toFixed(2)}/s</span></p>
      <p>Production: <span class="${netClass}">${totalProduction.toFixed(2)}/s</span></p>
      <p>of which is wood power: <span class="${netClass}">${generatorProduction.toFixed(2)}/s</span></p>
      <p>of which is water power: <span class="${netClass}">${waterPowerProduction.toFixed(2)}/s</span></p>
      <p>of which is solar power: <span class="${netClass}">${solarProduction.toFixed(2)}/s</span></p>
      <p>of which is wind power: <span class="${netClass}">${windProduction.toFixed(2)}/s</span></p>
      <p>Consumption: <span class="${netClass}">${totalConsumption.toFixed(2)}/s</span></p>
      <p>Volatile production: <span class="${netClass}">${volatilePower.toFixed(2)}/s</span></p>
      <p>Needed back up: <span class="${neededPowereBackupClass}">${neededPowereBackup.toFixed(2)}/s</span></p>
      <p>Batteries will last: <span class="${batteryLifeClass}">${batteryLife.toFixed(0)} ticks</span></p>
        
      ${producers.length > 0 ? '<p>Produced:</p><ul>' + producers.join('') + '</ul>' : ''}
      ${consumers.length > 0 ? '<p>Consumed:</p><ul>' + consumers.join('') + '</ul>' : ''}
    </div>
  `;
}

function createCivilizationBudgetItem() {
  if (!gameState.hasUnlockedCivilization) return '';

  const schools = gameState.buildings.school.amount;
  const townhalls = gameState.buildings.townhall.amount;
  const cityCouncils = gameState.buildings.cityCouncil?.amount || 0; // Add cityCouncil
  const armories = gameState.buildings.armory?.amount || 0;
  const barracks = gameState.buildings.barracks?.amount || 0;
  const armyQuarters = gameState.buildings.armyQuarter?.amount || 0; // Add armyQuarter
  const specialForcesHQ = gameState.buildings.specialForcesHQ?.amount || 0; // Add specialForcesHQ

  // Research Points
  const researchProductionRate = gameState.buildings.school.provides.researchPoints || 0;
  let researchProduction = gameState.electricityConsumersDisabled ? 0 : schools * researchProductionRate;
  const totalResearchConsumption = 0;
  const researchNetRate = researchProduction - totalResearchConsumption;
  const researchNetClass = researchNetRate > 0 ? 'net-positive' : researchNetRate < 0 ? 'net-negative' : 'net-neutral';

  // Administrative Points
  const townhallAdminProductionRate = gameState.buildings.townhall.provides.adminPoints || 0;
  const cityCouncilAdminProductionRate = gameState.buildings.cityCouncil?.provides.adminPoints || 0; // Add cityCouncil rate
  let adminProduction = gameState.electricityConsumersDisabled 
    ? 0 
    : (townhalls * townhallAdminProductionRate) + (cityCouncils * cityCouncilAdminProductionRate); // Combine both
  const totalAdminConsumption = 0;
  const adminNetRate = adminProduction - totalAdminConsumption;
  const adminNetClass = adminNetRate > 0 ? 'net-positive' : adminNetRate < 0 ? 'net-negative' : 'net-neutral';

  // Weapons
  const weaponsProductionRate = gameState.buildings.armory?.provides.weapons || 0;
  let weaponsProduction = gameState.electricityConsumersDisabled ? 0 : armories * weaponsProductionRate;
  const totalWeaponsConsumption = 0;
  const weaponsNetRate = weaponsProduction - totalWeaponsConsumption;
  const weaponsNetClass = weaponsNetRate > 0 ? 'net-positive' : weaponsNetRate < 0 ? 'net-negative' : 'net-neutral';

  // Soldiers
  const barracksSoldiersProductionRate = gameState.buildings.barracks?.provides.soldiers || 0;
  const armyQuarterSoldiersProductionRate = gameState.buildings.armyQuarter?.provides.soldiers || 0; // Add armyQuarter rate
  const specialForcesProductionRate = gameState.buildings.specialForcesHQ?.provides.soldiers || 0; // Add specialForcesHQ rate
  let soldiersProduction = gameState.electricityConsumersDisabled 
    ? 0 
    : (barracks * barracksSoldiersProductionRate) + (armyQuarters * armyQuarterSoldiersProductionRate) + (specialForcesHQ * specialForcesProductionRate); // Combine both
  const totalSoldiersConsumption = 0;
  const soldiersNetRate = soldiersProduction - totalSoldiersConsumption;
  const soldiersNetClass = soldiersNetRate > 0 ? 'net-positive' : soldiersNetRate < 0 ? 'net-negative' : 'net-neutral';

  // Defense Power (only if unlocked)
  let defensePowerHTML = '';
  if (gameState.hasUnlockedDefensePower) {
    const defensePower = gameState.resources.defensePower.amount;
    const defenseNetRate = 0; // Static resource, no per-second change
    const defenseNetClass = 'net-neutral'; // No change rate, so neutral
    defensePowerHTML = `
      <div class="resource-budget-item">
        <h3>Defense Power</h3>
        <p>Current: ${defensePower.toFixed(2)}</p>
        <p>Net: <span class="${defenseNetClass}">${defenseNetRate.toFixed(2)}/s</span></p>
      </div>
    `;
  }

  let researchProducers = schools > 0 
    ? `School: (+${gameState.electricityConsumersDisabled ? 0 : researchProductionRate.toFixed(2)}/s, ${schools} owned, total +${researchProduction.toFixed(2)}/s)${gameState.electricityConsumersDisabled ? ' (Disabled: No Electricity)' : ''}` 
    : '';
  let adminProducers = '';
  if (townhalls > 0) {
    adminProducers += `Town Hall: (+${gameState.electricityConsumersDisabled ? 0 : townhallAdminProductionRate.toFixed(2)}/s, ${townhalls} owned, total +${(townhalls * townhallAdminProductionRate).toFixed(2)}/s)${gameState.electricityConsumersDisabled ? ' (Disabled: No Electricity)' : ''}`;
  }
  if (cityCouncils > 0) {
    adminProducers += `${townhalls > 0 ? '<br>' : ''}City Council: (+${gameState.electricityConsumersDisabled ? 0 : cityCouncilAdminProductionRate.toFixed(2)}/s, ${cityCouncils} owned, total +${(cityCouncils * cityCouncilAdminProductionRate).toFixed(2)}/s)${gameState.electricityConsumersDisabled ? ' (Disabled: No Electricity)' : ''}`;
  }
  let weaponsProducers = armories > 0 
    ? `Armory: (+${gameState.electricityConsumersDisabled ? 0 : weaponsProductionRate.toFixed(2)}/s, ${armories} owned, total +${weaponsProduction.toFixed(2)}/s)${gameState.electricityConsumersDisabled ? ' (Disabled: No Electricity)' : ''}` 
    : '';
  let soldiersProducers = '';
  if (barracks > 0) {
    soldiersProducers += `Barracks: (+${gameState.electricityConsumersDisabled ? 0 : barracksSoldiersProductionRate.toFixed(2)}/s, ${barracks} owned, total +${(barracks * barracksSoldiersProductionRate).toFixed(2)}/s)${gameState.electricityConsumersDisabled ? ' (Disabled: No Electricity)' : ''}`;
  }
  if (armyQuarters > 0) {
    soldiersProducers += `${barracks > 0 ? '<br>' : ''}Army Quarter: (+${gameState.electricityConsumersDisabled ? 0 : armyQuarterSoldiersProductionRate.toFixed(2)}/s, ${armyQuarters} owned, total +${(armyQuarters * armyQuarterSoldiersProductionRate).toFixed(2)}/s)${gameState.electricityConsumersDisabled ? ' (Disabled: No Electricity)' : ''}`;
  }
  
  if (specialForcesHQ > 0) {
    soldiersProducers += `${barracks > 0 ? '<br>' : ''}Special Forces HQ: (+${gameState.electricityConsumersDisabled ? 0 : specialForcesProductionRate.toFixed(2)}/s, ${armyQuarters} owned, total +${(armyQuarters * specialForcesProductionRate).toFixed(2)}/s)${gameState.electricityConsumersDisabled ? ' (Disabled: No Electricity)' : ''}`;
  }

  let html = `
    <div class="resource-budget-item">
      <h3>Research Points</h3>
      <p>Net: <span class="${researchNetClass}">${researchNetRate.toFixed(2)}/s</span></p>
      ${researchProducers ? '<p>Produced: ' + researchProducers + '</p>' : ''}
    </div>
    <div class="resource-budget-item">
      <h3>Administrative Points</h3>
      <p>Net: <span class="${adminNetClass}">${adminNetRate.toFixed(2)}/s</span></p>
      ${adminProducers ? '<p>Produced: ' + adminProducers + '</p>' : ''}
    </div>
  `;
  if (gameState.hasUnlockedMilitary) {
    html += `
      <div class="resource-budget-item">
        <h3>Weapons</h3>
        <p>Net: <span class="${weaponsNetClass}">${weaponsNetRate.toFixed(2)}/s</span></p>
        ${weaponsProducers ? '<p>Produced: ' + weaponsProducers + '</p>' : ''}
      </div>
      <div class="resource-budget-item">
        <h3>Soldiers</h3>
        <p>Net: <span class="${soldiersNetClass}">${soldiersNetRate.toFixed(2)}/s</span></p>
        ${soldiersProducers ? '<p>Produced: ' + soldiersProducers + '</p>' : ''}
      </div>
      ${defensePowerHTML}
    `;
  }
  return html;
}

function gather(resourceId) {
  const resource = gameState.resources[resourceId];
  resource.amount = Math.min((resource.max ?? Infinity), resource.amount + 1);
  updateUI();
}

function gather100(resourceId) {
  const resource = gameState.resources[resourceId];
  resource.amount = Math.min((resource.max ?? Infinity), resource.amount + 100);
  updateUI();
}

function gather10000(resourceId) {
  const resource = gameState.resources[resourceId];
  resource.amount = Math.min((resource.max ?? Infinity), resource.amount + 10000);
  updateUI();
}

function improve(improvementId) {
  const improvement = gameState.improvements[improvementId];
  
  for (const [resourceId, cost] of Object.entries(improvement.cost)) {
    if (resourceId === 'researchPoints') {
      if (gameState.researchPoints < cost) return;
    } else if (resourceId === 'adminPoints') {
      if (gameState.adminPoints < cost) return;
    } else {
      if (gameState.resources[resourceId].amount < cost) return;
    }
  }

  Object.entries(improvement.cost).forEach(([resourceId, cost]) => {
    if (resourceId === 'researchPoints') {
      gameState.researchPoints -= cost;
      gameState.resources.researchPoints.amount = gameState.researchPoints;
    } else if (resourceId === 'adminPoints') {
      gameState.adminPoints -= cost;
      gameState.resources.adminPoints.amount = gameState.adminPoints;
    } else {
      gameState.resources[resourceId].amount -= cost;
    }
  });

  improvement.amount += 1;

  if (improvement.raisesMultiple) {
  Object.entries(improvement.raisesMultiple).forEach(([resourceId, increase]) => {
    if (resourceId === 'weapons') {
      gameState.maxWeapons += increase;
      gameState.resources.weapons.max = gameState.maxWeapons;
    } else if (resourceId === 'soldiers') {
      gameState.maxSoldiers += increase;
      gameState.resources.soldiers.max = gameState.maxSoldiers;
    } else {
      const resource = gameState.resources[resourceId];
      resource.max += increase;
    }
    });
	} else {
    if (improvement.raises === 'electricity') {
      gameState.maxElectricity += improvement.raisesBy;
    } else if (improvement.raises === 'researchPoints') {
      gameState.maxResearchPoints += improvement.raisesBy;
    } else if (improvement.raises === 'adminPoints') {
      gameState.maxAdminPoints += improvement.raisesBy;
    } else if (improvement.raises === 'maxSoldiers') {
      gameState.maxSoldiers += improvement.raisesBy;
      gameState.resources.soldiers.max = gameState.maxSoldiers;
    } else if (improvement.raises === 'maxWeapons') {
      gameState.maxWeapons += improvement.raisesBy;
      gameState.resources.weapons.max = gameState.maxWeapons;
    } else if (improvement.raises === 'defensePower') { // New case
      gameState.resources.defensePower.amount += improvement.raisesBy;
    } else {
      const resourceId = improvement.raises;
      const resource = gameState.resources[resourceId];
      resource.max += improvement.raisesBy;
    }
  }

  updateUI();
  saveGame();
}

function build(buildingId) {
  const building = gameState.buildings[buildingId];
  for (const [resourceId, cost] of Object.entries(building.cost)) {
    if (gameState.resources[resourceId].amount < cost) {
      return;
    }
  }
  // Check maxAmount before building
  if (building.maxAmount && building.amount >= building.maxAmount) {
    return; // Don’t build if at or above max
  }
  Object.entries(building.cost).forEach(([resourceId, cost]) => {
    gameState.resources[resourceId].amount -= cost;
  });
  building.amount += 1;

  if (buildingId === 'trailer') {
    if (building.amount === 15 && !gameState.hasUnlockedElectricity) {
      gameState.hasUnlockedElectricity = true;
      showNotification(
        "You now have 15 trailers, your community is growing. You need electricity to power fridges, lights and more. " +
        "Your engineers whipped up a couple of makeshift generators: wood is burned to power turbines that generate the needed electricity.",
        'normal'
      );
      gameState.buildings.generator.amount += 2;
      saveGame();
    }
    if (building.amount >= 50 && !gameState.hasUnlockedTimedEvents) {
      gameState.hasUnlockedTimedEvents = true;
      showNotification(
        "Your community has grown significantly with 50 trailers! However, with growth come new challenges. " +
        "Timed events will now occur, bringing both opportunities and risks to your settlement.",
        'normal'
      );
      gameState.nextEventCheck = Date.now();
      saveGame();
    }
    if (building.amount === 55 && !gameState.hasUnlockedCivilization) {
      gameState.hasUnlockedCivilization = true;
      showNotification(
        "55 trailers, good grief! You're no longer just a community, your community is becoming a little town. " +
        "Your rebuilding efforts are astonishing. However, a town has very different needs and challenges than a community of a couple of trailers. " +
        "From now on, you'll have to build schools, a town hall to keep things organised and structured and much more.",
        'normal'
      );
      saveGame();
    }
  }

  if (buildingId === 'generator' && building.amount === 25 && !gameState.hasUnlockedBatteries) {
    gameState.hasUnlockedBatteries = true;
    showNotification(
      "You now have 25 Makeshift Generators! Your engineers have developed an upgrade for your batteries, " +
      "allowing you to store more electricity to support your growing community.",
      'normal'
    );
    saveGame();
  }

  if (
    (buildingId === 'apartmentComplex' || buildingId === 'waterSupplySystem') &&
    gameState.buildings.apartmentComplex.amount >= 15 &&
    gameState.buildings.townhall.amount >= 15 &&
    !gameState.hasUnlockedMilitary
  ) {
    gameState.hasUnlockedMilitary = true;
    showNotification(
      "Your community has reached an impressive size. Unfortunately that makes it also interesting for looters and hostile pillagers. " +
      "You decide to train soldiers in the barracks and build weapons in the armory. A costly thing to do, but how else are you going to defend yourself? " +
      "Once you have enough weapons and soldiers you can also build an Expedition HQ in which you can plan expeditions and pillage tours of your own.",
      'normal'
    );
    saveGame();
  }

  if (
    (buildingId === 'apartmentComplex' || buildingId === 'waterSupplySystem') &&
    gameState.buildings.apartmentComplex.amount >= 20 &&
    gameState.buildings.waterSupplySystem.amount >= 30 &&
    !gameState.hasUnlockedRiverPump
  ) {
    gameState.hasUnlockedRiverPump = true;
    showNotification(
      "Your town is growing and growing. You need better ways of supplying your people with more clean water. " +
      "Luckily your engineers have thought of something. You can now build the River Pump.",
      'normal'
    );
    saveGame();
  }

  if (
    (buildingId === 'armory' || buildingId === 'barracks') &&
    gameState.buildings.armory.amount >= 5 &&
    gameState.buildings.barracks.amount >= 5 &&
    !gameState.hasUnlockedExpeditions
  ) {
    gameState.hasUnlockedExpeditions = true;
    showNotification(
      "Now, that you're building weapons and training soldiers, you can send them on expeditions. Build the Expedition HQ. " +
      "Caution: this building needs a lot of electricity to work.",
      'normal'
    );
    saveGame();
  }
  
  if (
    (buildingId === 'apartmentComplex' || buildingId === 'solarpanel' || buildingId === 'windmill') &&
    gameState.buildings.apartmentComplex.amount >= 15 &&
    gameState.buildings.solarpanel.amount > 100 &&
    gameState.buildings.windmill.amount > 100 &&
    !gameState.hasUnlockedWaterPower
  ) {
    gameState.hasUnlockedWaterPower = true;
    showNotification(
      "A town like yours needs a lot of power. Ideally, without needing the sun to shine or wind to blow. " +
      "Luckily, water always flows in the nearby river. Your engineers devised a water powered turbine that creates massive amounts of energy.",
      'normal'
    );
    saveGame();
  }
  
  if (
    buildingId === 'apartmentComplex' &&
    gameState.buildings.apartmentComplex.amount >= 35 &&
    gameState.hasUnlockedWaterPower &&
    !gameState.hasSeenBAPUnlock 
  ) {
    gameState.hasSeenBAPUnlock = true;
    showNotification(
      "With a robust power supply and a growing population, you need more space for more willing and dutiful scavengers to bring in even more valuable materials. You can now build the Big Apartment Complex.",
      'normal'
    );
    saveGame();
  }

  if (
    (buildingId === 'armory' || buildingId === 'barracks' || buildingId === 'bigApartmentComplex') &&
    gameState.buildings.armory.amount >= 15 &&
    gameState.buildings.barracks.amount >= 15 &&
    gameState.buildings.bigApartmentComplex.amount >= 5 &&
    !gameState.hasUnlockedDefensePower
  ) {
	  showNotification(
      "Communities big like yours are juicy targets for looters and pillagers. Hell, you yourself are pillaging your way through the wastelands to get the resources you need, aren't you? So do others. You need to amp up your defenses. You now have a new characteristic to take care of: Defense Power. It can be improved upon by having soldiers at home and building various defensive buildings and structures.",
      'normal'
    );
    gameState.hasUnlockedDefensePower = true;
    saveGame();
  }

  updateUI();
}

// UI rendering
function createResourceCard(resource) {
  const isConsumable = resource.id === 'food' || resource.id === 'water';
  const perSecondClass = resource.perSecond < 0 ? 'not-affordable' : 'affordable';
  const consumptionRate = resource.id === 'food' ? gameState.foodConsumptionRate : gameState.waterConsumptionRate;
  
  return `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${resource.name}</h3>
        <button class="btn" onclick="window.gather('${resource.id}')">Gather</button>
      </div>
      <div class="resource-info">
        <p>Amount: ${resource.amount.toFixed(1)}${resource.max ? ` / ${resource.max}` : ''}</p>
        <p class="${perSecondClass}">Per second: ${resource.perSecond.toFixed(2)}</p>
        ${isConsumable ? `<p class="not-affordable">Consumption: -${consumptionRate}/s</p>` : ''}
      </div>
    </div>
  `;
}

// UI rendering for buffs/debuffs
function createBuffDebuffCard(buffDebuff) {
  return `
    <div class="buff-debuff ${buffDebuff.type}">
      <p>${buffDebuff.name}: ${buffDebuff.effect}</p>
    </div>
  `;
}

function createEventCard(event) {
  const now = Date.now();
  const elapsed = now - event.startTime;
  const remainingTime = Math.max(0, event.duration - elapsed);
  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return `
    <div class="buff-debuff debuff">
      <p>${event.displayText} - ${formattedTime} remaining</p>
    </div>
  `;
}

function createBuildingCard(building) {
  if (!building || typeof building !== 'object' || !building.id || !building.cost || !building.name || !building.description || Object.keys(building).length === 0) {
    if (debug) {console.error("Invalid building in createBuildingCard:", building)};
    return '';
  }

  if (building.id === 'generator' && !gameState.hasUnlockedElectricity) {
    return '';
  }

  if (['school', 'townhall', 'apartmentComplex', 'waterSupplySystem'].includes(building.id) && !gameState.hasUnlockedCivilization) {
    return '';
  }
  
  if (['armory', 'barracks', 'expeditionHQ'].includes(building.id) && !gameState.hasUnlockedMilitary) {
    return '';
  }

  if (building.id === 'expeditionHQ' && !gameState.hasUnlockedExpeditions) {
    return '';
  }

  // Gate River Pump
  if (building.id === 'waterFromTheRiver' && !gameState.hasUnlockedRiverPump) {
    return '';
  }
  
  // Gate Water Power
  if (building.id === 'powerFromTheRiver' && !gameState.hasUnlockedWaterPower) {
    return '';
  }
  
  // Gate Scrap Hunters and Huge Farm
  if (['scrapHunters', 'hugeFarm'].includes(building.id) && !gameState.hasUnlockedWaterPower) {
    return '';
  }
  
  // Gate Technician Hub
  if (building.id === 'technicianHub' && (!gameState.hasUnlockedWaterPower || gameState.buildings.apartmentComplex.amount < 25)) {
    return '';
  }

  // Gate Big Apartment Complex
  if (building.id === 'bigApartmentComplex' && (!gameState.hasUnlockedWaterPower || gameState.buildings.apartmentComplex.amount < 35)) {
    return '';
  }

  // Gate Army Quarter
  if (building.id === 'armyQuarter' && (gameState.buildings.bigApartmentComplex.amount < 65 || gameState.buildings.barracks.amount < 75)) {
    return '';
  }

  // Gate City Council
  if (building.id === 'cityCouncil' && (gameState.buildings.bigApartmentComplex.amount < 65 || gameState.buildings.townhall.amount < 75)) {
    return '';
  }

  // Gate Special Forces HQ
  if (building.id === 'specialForcesHQ' && (gameState.buildings.armyQuarter.amount < 15 || gameState.buildings.cityCouncil.amount < 15)) {
    return '';
  }

  // Gate Field Medic Academy
  if (building.id === 'fieldMedicAcademy' && (gameState.buildings.expeditionHQ.amount < 1 || gameState.buildings.specialForcesHQ.amount < 5)) {
    return '';
  }

  // Gate Master Loggers
  if (building.id === 'masterLoggers' && (gameState.buildings.lumberjackcamp.amount < 100 || gameState.buildings.bigApartmentComplex.amount < 25)) {
    return '';
  }

  // Gate Cattle Ranch
  if (building.id === 'cattleRanch' && (gameState.buildings.pigfarm.amount < 200 || gameState.buildings.bigApartmentComplex.amount < 35)) {
    return '';
  }

  const canAfford = Object.entries(building.cost).every(
    ([resourceId, cost]) => gameState.resources[resourceId].amount >= cost
  );
  // Explicitly handle expeditionHQ and maxAmount separately
  let isBuildable = true;
  if (building.id === 'expeditionHQ') {
    isBuildable = building.amount < 1;
    if (debug) {console.log(`expeditionHQ isBuildable: ${isBuildable} (amount: ${building.amount})`)};
  } else if (building.maxAmount) {
    isBuildable = building.amount < building.maxAmount;
    if (debug) {console.log(`${building.id} isBuildable: ${isBuildable} (amount: ${building.amount}, maxAmount: ${building.maxAmount})`)};
  }

  const canAffordTen = Object.entries(building.cost).every(
    ([resourceId, cost]) => gameState.resources[resourceId].amount >= cost * 10
  );

  const costList = Object.entries(building.cost)
    .map(([resourceId, cost]) => {
      const affordable = gameState.resources[resourceId].amount >= cost;
      return `
        <li class="cost-item ${affordable ? 'affordable' : 'not-affordable'}">
          ${gameState.resources[resourceId].name}: ${cost}
        </li>
      `;
    })
    .join('');

  const providesList = Object.entries(building.provides || {})
    .map(([resourceId, amount]) => `
      <li>${resourceId === 'electricity' ? 'Electricity' : resourceId === 'researchPoints' ? 'Research Points' : resourceId === 'adminPoints' ? 'Administrative Points' : gameState.resources[resourceId].name}: ${amount}/s</li>
    `)
    .join('');

  const consumesList = Object.entries(building.consumes || {})
    .map(([resourceId, amount]) => `
      <li>${resourceId === 'electricity' ? 'Electricity' : gameState.resources[resourceId].name}: ${amount}/s</li>
    `)
    .join('');

  return `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${building.name}</h3>
        <span>Owned: ${building.amount}</span>
      </div>
      <p class="building-info">${building.description}</p>
      <div class="building-info">
        <p>Costs:</p>
        <ul class="cost-list">${costList}</ul>
        ${providesList ? '<p>Provides per second:</p><ul class="cost-list">' + providesList + '</ul>' : ''}
        ${consumesList ? '<p>Consumes per second:</p><ul class="cost-list">' + consumesList + '</ul>' : ''}
      </div>
      <button 
        class="btn ${canAfford && isBuildable ? '' : 'disabled'}"
        onclick="window.build('${building.id}')"
        ${canAfford && isBuildable ? '' : 'disabled'}
      >
        Build
      </button>
      ${canAffordTen && isBuildable ? `
        <button 
          class="btn"
          onclick="window.buildMultiple('${building.id}', 10)"
        >
          Build 10
        </button>
      ` : ''}
    </div>
  `;
}

window.buildMultiple = function(buildingId, count) {
  const building = gameState.buildings[buildingId];
  if (!building) return;

  const totalCost = {};
  Object.entries(building.cost).forEach(([resourceId, cost]) => {
    totalCost[resourceId] = cost * count;
  });

  const canAfford = Object.entries(totalCost).every(
    ([resourceId, cost]) => gameState.resources[resourceId].amount >= cost
  );

  let isBuildable = true;
  if (building.id === 'expeditionHQ') {
    isBuildable = building.amount + count <= 1;
  } else if (building.maxAmount) {
    isBuildable = building.amount + count <= building.maxAmount;
  }

  if (!canAfford || !isBuildable) return;

  Object.entries(totalCost).forEach(([resourceId, cost]) => {
    gameState.resources[resourceId].amount -= cost;
  });

  building.amount += count;

  saveGame();
  updateUI();
};

window.researchMultiple = function(researchId, count) {
  const research = gameState.researches[researchId];
  if (!research) return;

  // Check if player can afford the total cost
  const totalCost = {};
  Object.entries(research.cost).forEach(([resourceId, cost]) => {
    totalCost[resourceId] = cost * count;
  });

  const canAfford = Object.entries(totalCost).every(([resourceId, cost]) => {
    if (resourceId === 'researchPoints') {
      return gameState.researchPoints >= cost;
    } else if (resourceId === 'adminPoints') {
      return gameState.adminPoints >= cost;
    }
    return gameState.resources[resourceId].amount >= cost;
  });

  if (!canAfford) return;

  // Deduct total cost
  Object.entries(totalCost).forEach(([resourceId, cost]) => {
    if (resourceId === 'researchPoints') {
      gameState.researchPoints -= cost;
    } else if (resourceId === 'adminPoints') {
      gameState.adminPoints -= cost;
    } else {
      gameState.resources[resourceId].amount -= cost;
    }
  });

  // Apply the research effect 'count' times
  for (let i = 0; i < count; i++) {
    gameState.researchEffects.push({ ...research.effect });
  }
  research.amount += count;

  saveGame();
  updateUI();
};

function createImprovementsCard(improvement) {
  // Hide Upgrade Batteries until unlocked
  if (improvement.id === 'upgradeBatteries' && !gameState.hasUnlockedBatteries) {
    return '';
  }

  // Hide civilization-related improvements until unlocked
  if (['library', 'filingCabinet'].includes(improvement.id) && !gameState.hasUnlockedCivilization) {
    return '';
  }

  // Hide military-related improvements until unlocked
  if (['readStrategyBooks', 'extendArmory'].includes(improvement.id) && !gameState.hasUnlockedMilitary) {
    return '';
  }

  // Hide Defense Turrets until Defense Power is unlocked
  if (improvement.id === 'defenseTurrets' && !gameState.hasUnlockedDefensePower) {
    return '';
  }
  
  // Hide Electric Fence until 40 Defense Turrets are built
  if (improvement.id === 'electricFence' && gameState.improvements.defenseTurrets.amount < 40) {
    return '';
  }
  
  // Hide Underground Storage until 100 storage facilities are built
  if (improvement.id === 'undergroundStorage' && gameState.improvements.storageFacilities.amount < 100) {
    return '';
  }
  
  // Hide Large Batteries until 75 Upgrade Battieres are built
  if (improvement.id === 'largeBatteries' && gameState.improvements.upgradeBatteries.amount < 75) {
    return '';
  }
  
  // Hide Extra Large Batteries until 75 Upgrade Battieres are built
  if (improvement.id === 'extraLargeBatteries' && gameState.improvements.largeBatteries.amount < 75) {
    return '';
  }
  
  
  // Gate Military Academy
  if (improvement.id === 'militaryAcademy' && 
      (gameState.improvements.extendArmory.amount < 15 || 
       gameState.improvements.readStrategyBooks.amount < 15)) {
    return '';
  }

  const canAfford = Object.entries(improvement.cost).every(
    ([resourceId, cost]) => {
      if (resourceId === 'researchPoints') {
        return gameState.researchPoints >= cost;
      } else if (resourceId === 'adminPoints') {
        return gameState.adminPoints >= cost;
      }
      return gameState.resources[resourceId].amount >= cost;
    }
  );

  const costList = Object.entries(improvement.cost)
    .map(([resourceId, cost]) => {
      let affordable;
      if (resourceId === 'researchPoints') {
        affordable = gameState.researchPoints >= cost;
      } else if (resourceId === 'adminPoints') {
        affordable = gameState.adminPoints >= cost;
      } else {
        affordable = gameState.resources[resourceId].amount >= cost;
      }
      return `
        <li class="cost-item ${affordable ? 'affordable' : 'not-affordable'}">
          ${resourceId === 'researchPoints' ? 'Research Points' : resourceId === 'adminPoints' ? 'Administrative Points' : gameState.resources[resourceId].name}: ${cost}
        </li>
      `;
    })
    .join('');

  const consumesList = improvement.consumes ? Object.entries(improvement.consumes)
    .map(([resourceId, amount]) => `
      <li>${resourceId === 'electricity' ? 'Electricity' : gameState.resources[resourceId].name}: ${amount}/s</li>
    `)
    .join('') : '';

  return `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${improvement.name}</h3>
        <span>Owned: ${improvement.amount}</span>
      </div>
      <p class="building-info">${improvement.description}</p>
      <div class="building-info">
        <p>Costs:</p>
        <ul class="cost-list">${costList}</ul>
        ${consumesList ? '<p>Consumes per second:</p><ul class="cost-list">' + consumesList + '</ul>' : ''}
      </div>
      <button 
        class="btn ${canAfford ? '' : 'disabled'}"
        onclick="window.improve('${improvement.id}')"
        ${canAfford ? '' : 'disabled'}
      >
        Build
      </button>
    </div>
  `;
}


function createResearchCard(research) {
  // Explicitly exclude expeditionHQ from researches
  if (research.id === 'expeditionHQ') {
    return '';
  }

  const canAffordSingle = Object.entries(research.cost).every(([resourceId, cost]) => {
    if (resourceId === 'researchPoints') {
      return gameState.researchPoints >= cost;
    } else if (resourceId === 'adminPoints') {
      return gameState.adminPoints >= cost;
    }
    return gameState.resources[resourceId].amount >= cost;
  });

  // Check if player can afford 10 researches
  const canAffordTen = Object.entries(research.cost).every(([resourceId, cost]) => {
    const costForTen = cost * 10;
    if (resourceId === 'researchPoints') {
      return gameState.researchPoints >= costForTen;
    } else if (resourceId === 'adminPoints') {
      return gameState.adminPoints >= costForTen;
    }
    return gameState.resources[resourceId].amount >= costForTen;
  });

  const costList = Object.entries(research.cost)
    .map(([resourceId, cost]) => {
      let affordable;
      if (resourceId === 'researchPoints') {
        affordable = gameState.researchPoints >= cost;
      } else if (resourceId === 'adminPoints') {
        affordable = gameState.adminPoints >= cost;
      } else {
        affordable = gameState.resources[resourceId].amount >= cost;
      }
      return `
        <li class="cost-item ${affordable ? 'affordable' : 'not-affordable'}">
          ${resourceId === 'researchPoints' ? 'Research Points' : resourceId === 'adminPoints' ? 'Administrative Points' : gameState.resources[resourceId].name}: ${cost}
        </li>
      `;
    })
    .join('');
    
  // Hide Improve Lumberjack Camp
  if (research.id === 'improveLumberjackCamp' && gameState.buildings.lumberjackcamp.amount < 300) {
    return '';
  }
  
  // Hide Improve Master Loggers
  if (research.id === 'improveMasterLoggers' && gameState.buildings.masterLoggers.amount < 50) {
    return '';
  }

  return `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${research.name}</h3>
        <span>Researched: ${research.amount}</span>
      </div>
      <p class="research-info">${research.description}</p>
      <div class="research-info">
        <p>Costs:</p>
        <ul class="cost-list">${costList}</ul>
      </div>
      <button 
        class="btn ${canAffordSingle ? '' : 'disabled'}"
        onclick="window.research('${research.id}')"
        ${canAffordSingle ? '' : 'disabled'}
      >
        Research
      </button>
      ${canAffordTen ? `
        <button 
          class="btn"
          onclick="window.researchMultiple('${research.id}', 10)"
        >
          Research 10
        </button>
      ` : ''}
    </div>
  `;
}

function createExpeditionCard(expedition) {
  const { id, name, description, cost } = expedition;

  // Log the current adminPoints for debugging
  if (debug) {console.log(`Rendering expedition card for ${id}: gameState.adminPoints=${gameState.adminPoints}, gameState.resources.adminPoints.amount=${gameState.resources.adminPoints.amount}`)};

  const canAfford = Object.entries(cost).every(([resourceId, amount]) => {
    if (resourceId === 'adminPoints') {
      const affordable = gameState.adminPoints >= amount;
      if (debug) {console.log(`Checking affordability for ${resourceId}: need ${amount}, have ${gameState.adminPoints}, affordable=${affordable}`)};
      return affordable;
    }
    const affordable = gameState.resources[resourceId].amount >= amount;
    if (debug) {console.log(`Checking affordability for ${resourceId}: need ${amount}, have ${gameState.resources[resourceId].amount}, affordable=${affordable}`)};
    return affordable;
  });

  const costList = Object.entries(cost)
    .map(([resourceId, amount]) => {
      const affordable = resourceId === 'adminPoints' 
        ? gameState.adminPoints >= amount 
        : gameState.resources[resourceId].amount >= amount;
      if (debug) {console.log(`Displaying cost for ${resourceId}: need ${amount}, have ${resourceId === 'adminPoints' ? gameState.adminPoints : gameState.resources[resourceId].amount}, class=${affordable ? 'affordable' : 'not-affordable'}`)};
      return `
        <li class="cost-item ${affordable ? 'affordable' : 'not-affordable'}">
          ${resourceId === 'adminPoints' ? 'Administrative Points' : gameState.resources[resourceId].name}: ${amount}
        </li>
      `;
    })
    .join('');

  // Calculate available soldier/weapon pairs
  const maxPairs = Math.min(Math.floor(gameState.soldiers), Math.floor(gameState.weapons));
  const options = [
    { percent: 10, soldiers: Math.floor(maxPairs * 0.1) },
    { percent: 50, soldiers: Math.floor(maxPairs * 0.5) },
    { percent: 90, soldiers: Math.floor(maxPairs * 0.9) }
  ];
  const isExpeditionActive = gameState.activeExpedition && gameState.activeExpedition.id === id;

  // Initialize selected percentage in gameState if not set
  if (!gameState.selectedExpeditionPercentages) {
    gameState.selectedExpeditionPercentages = {};
  }
  if (!gameState.selectedExpeditionPercentages[id]) {
    gameState.selectedExpeditionPercentages[id] = 10; // Default to 10%
  }

  const soldierOptions = options.map(option => {
    const disabled = maxPairs < 1 || isExpeditionActive || option.soldiers < 1;
    return `
      <label id="soldier-option-${id}-${option.percent}">
        <input 
          type="radio" 
          name="${id}-soldiers" 
          value="${option.percent}" 
          ${option.percent === gameState.selectedExpeditionPercentages[id] ? 'checked' : ''} 
          ${disabled ? 'disabled' : ''} 
          ${option.soldiers < 1 ? 'style="visibility: hidden;"' : ''} 
          onchange="window.updateExpeditionSelection('${id}', ${option.percent})"
        >
        ${option.percent}% of your army (${option.soldiers} soldier/weapon pairs)
      </label><br>
    `;
  }).join('');

  // Show countdown if active
  let countdownHTML = '';
  if (isExpeditionActive) {
    const now = Date.now();
    const elapsed = now - gameState.activeExpedition.startTime;
    const remainingTime = Math.max(0, gameState.activeExpedition.duration - elapsed);
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    countdownHTML = `<p id="countdown-${id}">Expedition in progress: ${formattedTime} remaining</p>`;
  }

  return `
    <div class="card" id="expedition-card-${id}">
      <div class="card-header">
        <h3 class="card-title">${name}</h3>
      </div>
      <p class="building-info">${description}</p>
      <div class="building-info">
        <p>Costs:</p>
        <ul class="cost-list">${costList}</ul>
        <p>Choose soldiers to send:</p>
        <div class="soldier-options">${soldierOptions}</div>
        ${countdownHTML}
      </div>
      <button 
        class="btn ${canAfford && !isExpeditionActive && maxPairs > 0 ? '' : 'disabled'}"
        onclick="window.sendExpedition('${id}')"
        ${canAfford && !isExpeditionActive && maxPairs > 0 ? '' : 'disabled'}
      >
        Send Expedition
      </button>
    </div>
  `;
}

function sendExpedition(expeditionId) {
  if (gameState.activeExpedition) return; // Only one expedition at a time

  const expedition = EXPEDITIONS[expeditionId];
  const maxPairs = Math.min(Math.floor(gameState.soldiers), Math.floor(gameState.weapons));
  const percentage = gameState.selectedExpeditionPercentages[expeditionId];
  const soldiersToSend = Math.floor(maxPairs * (percentage / 100));
  if (soldiersToSend < 1) {
    showNotification("Not enough soldier/weapon pairs to send.", 'normal');
    return;
  }

  // Check and deduct costs
  for (const [resourceId, amount] of Object.entries(expedition.cost)) {
    if (resourceId === 'adminPoints') {
      if (gameState.adminPoints < amount) return;
    } else {
      if (gameState.resources[resourceId].amount < amount) return;
    }
  }
  Object.entries(expedition.cost).forEach(([resourceId, amount]) => {
    if (resourceId === 'adminPoints') {
      gameState.adminPoints -= amount;
      gameState.resources.adminPoints.amount = gameState.adminPoints;
    } else {
      gameState.resources[resourceId].amount -= amount;
    }
  });

  // Deduct soldiers and weapons
  gameState.soldiers -= soldiersToSend;
  gameState.weapons -= soldiersToSend;
  gameState.resources.soldiers.amount = gameState.soldiers;
  gameState.resources.weapons.amount = gameState.weapons;

  // Start expedition
  gameState.activeExpedition = {
    id: expeditionId,
    startTime: Date.now(),
    duration: expedition.duration,
    soldiersSent: soldiersToSend,
    percentage: percentage,
    needsUpdate: true // Flag to trigger UI refresh
  };
  gameState.lastExpeditionTimes[expeditionId] = Date.now();

  showNotification(`Sending ${soldiersToSend} soldier/weapon pairs on a ${expedition.name}.`, 'normal');
  saveGame();
  updateUI();
}

function syncGameState() {
  // Sync resources
  Object.entries(initialGameState.resources).forEach(([resourceId, resource]) => {
    if (!gameState.resources[resourceId]) {
      gameState.resources[resourceId] = { ...resource };
    }
  });

  // Sync improvements
  Object.entries(initialGameState.improvements).forEach(([improvementId, improvement]) => {
    if (!gameState.improvements[improvementId]) {
      gameState.improvements[improvementId] = { ...improvement };
    }
  });

  // Sync buildings
  if (debug) {console.log("Syncing buildings. Initial buildings:", initialGameState.buildings)};
  if (debug) {console.log("Current gameState.buildings:", gameState.buildings)};
  Object.keys(gameState.buildings).forEach(buildingId => {
    if (gameState.buildings[buildingId] === undefined || gameState.buildings[buildingId] === null) {
      if (debug) {console.log(`Removing invalid building entry: ${buildingId}`)};
      delete gameState.buildings[buildingId];
    }
  });
  Object.entries(initialGameState.buildings).forEach(([buildingId, initialBuilding]) => {
    if (!gameState.buildings[buildingId] || typeof gameState.buildings[buildingId] !== 'object') {
      if (debug) {console.log(`Building ${buildingId} not found or invalid in gameState.buildings, initializing.`)};
      gameState.buildings[buildingId] = { ...initialBuilding };
    } else {
      if (debug) {console.log(`Building ${buildingId} found, ensuring properties. Current:`, gameState.buildings[buildingId])};
      gameState.buildings[buildingId] = {
        ...initialBuilding,
        amount: gameState.buildings[buildingId].amount ?? 0
      };
    }
  });
  if (debug) {console.log("After sync, gameState.buildings:", gameState.buildings)};

  // Sync researches
  Object.entries(initialGameState.researches).forEach(([researchId, initialResearch]) => {
    if (!gameState.researches[researchId]) {
      gameState.researches[researchId] = { ...initialResearch };
    } else {
      gameState.researches[researchId] = {
        ...initialResearch,
        amount: gameState.researches[researchId].amount
      };
    }
  });

  // Check and set hasUnlockedExpeditions with notification
  const previousUnlockedExpeditions = gameState.hasUnlockedExpeditions;
  gameState.hasUnlockedExpeditions = gameState.buildings.armory?.amount >= 5 && gameState.buildings.barracks?.amount >= 5;
  if (debug) {console.log("hasUnlockedExpeditions set to:", gameState.hasUnlockedExpeditions)};
  if (!previousUnlockedExpeditions && gameState.hasUnlockedExpeditions && !gameState.hasSeenExpeditionUnlockNotification) {
    showNotification(
      "Now, that you're building weapons and training soldiers, you can send them on expeditions. Build the Expedition HQ. Caution: this building needs a lot of electricity to work.",
      'normal'
    );
    gameState.hasSeenExpeditionUnlockNotification = true;
    saveGame();
  }

  // Sync top-level electricity with resources.electricity
  if (gameState.hasUnlockedElectricity) {
    gameState.resources.electricity.amount = gameState.electricity;
    gameState.resources.electricity.max = gameState.maxElectricity;
  }

  // Sync top-level civilization resources with their resource entries
  if (gameState.hasUnlockedCivilization) {
    gameState.resources.researchPoints.amount = gameState.researchPoints;
    gameState.resources.researchPoints.max = gameState.maxResearchPoints;
    gameState.resources.adminPoints.amount = gameState.adminPoints;
    gameState.resources.adminPoints.max = gameState.maxAdminPoints;

    if (gameState.hasUnlockedMilitary) {
      gameState.resources.weapons.amount = gameState.weapons;
      gameState.resources.weapons.max = gameState.maxWeapons;
      gameState.resources.soldiers.amount = gameState.soldiers;
      gameState.resources.soldiers.max = gameState.maxSoldiers;
    }
  }
  
  // Sync River Pump unlock
  if (
    gameState.buildings.apartmentComplex?.amount >= 20 &&
    gameState.buildings.waterSupplySystem?.amount >= 30 &&
    !gameState.hasUnlockedRiverPump
  ) {
    gameState.hasUnlockedRiverPump = true;
    showNotification(
      "Your town is growing and growing. You need better ways of supplying your people with more clean water. " +
      "Luckily your engineers have thought of something. You can now build the River Pump.",
      'normal'
    );
    saveGame();
  }

  // Sync Water Power unlock
  if (
    gameState.buildings.apartmentComplex?.amount >= 15 &&
    gameState.buildings.solarpanel?.amount > 100 &&
    gameState.buildings.windmill?.amount > 100 &&
    !gameState.hasUnlockedWaterPower
  ) {
    gameState.hasUnlockedWaterPower = true;
    showNotification(
      "A town like yours needs a lot of power. Ideally, without needing the sun to shine or wind to blow. " +
      "Luckily, water always flows in the nearby river. Your engineers devised a water powered turbine that creates massive amounts of energy.",
      'normal'
    );
    saveGame();
  }

  updateUI();
}

function research(researchId) {
  const research = gameState.researches[researchId];
  
  // Check if we can afford it
  for (const [resourceId, cost] of Object.entries(research.cost)) {
    if (resourceId === 'researchPoints') {
      if (gameState.researchPoints < cost) return;
    } else if (resourceId === 'adminPoints') {
      if (gameState.adminPoints < cost) return;
    } else {
      if (gameState.resources[resourceId].amount < cost) return;
    }
  }

  // Deduct resources
  Object.entries(research.cost).forEach(([resourceId, cost]) => {
    if (resourceId === 'researchPoints') {
      gameState.researchPoints -= cost;
      gameState.resources.researchPoints.amount = gameState.researchPoints;
    } else if (resourceId === 'adminPoints') {
      gameState.adminPoints -= cost;
      gameState.resources.adminPoints.amount = gameState.adminPoints;
    } else {
      gameState.resources[resourceId].amount -= cost;
    }
  });

  // Increment the research amount
  research.amount += 1;

  // Apply the research effect by adding it to researchEffects
  gameState.researchEffects.push({
    id: researchId,
    type: research.effect.type,
    buildingId: research.effect.buildingId,
    resourceId: research.effect.resourceId,
    multiplier: research.effect.multiplier
  });

  // Calculate the new production rate for notification
  if (research.effect.type === 'increaseProduction') {
    const building = gameState.buildings[research.effect.buildingId];
    const baseProduction = building.provides[research.effect.resourceId];
    const totalMultiplier = gameState.researchEffects
      .filter(effect => effect.type === 'increaseProduction' && effect.buildingId === research.effect.buildingId && effect.resourceId === research.effect.resourceId)
      .reduce((acc, effect) => acc * effect.multiplier, 1);
    const newProductionPerUnit = baseProduction * totalMultiplier;
    const totalIncrease = (newProductionPerUnit - baseProduction) * building.amount;
    showNotification(
      `Research completed: ${research.name}! ${building.name} now produces ${newProductionPerUnit.toFixed(3)} ${research.effect.resourceId} per second per unit (total increase: +${totalIncrease.toFixed(3)}/s).`,
      'normal'
    );
  } else if (research.effect.type === 'reduceConsumption') {
    const totalMultiplier = gameState.researchEffects
      .filter(effect => effect.type === 'reduceConsumption')
      .reduce((acc, effect) => acc * effect.multiplier, 1);
    const reductionPercentage = (1 - totalMultiplier) * 100;
    showNotification(
      `Research completed: ${research.name}! Consumption of all resources reduced by ${reductionPercentage.toFixed(1)}%.`,
      'normal'
    );
  }

  updateUI();
  saveGame();
}

function updateUI() {
  const resourcesContainer = document.getElementById('resourcesContainer');
  const improvementsContainer = document.getElementById('improvementsContainer');
  const buildingsContainer = document.getElementById('buildingsContainer');
  const buffsDebuffsContainer = document.getElementById('buffsDebuffsContainer');
  const resourceBudgetContainer = document.getElementById('resourceBudgetContainer');
  const electricitySection = document.getElementById('electricitySection');
  const electricityBar = document.getElementById('electricityBar');
  const electricityLabel = document.getElementById('electricityLabel');
  const civilizationSection = document.getElementById('civilizationSection');
  const researchBar = document.getElementById('researchBar');
  const researchLabel = document.getElementById('researchLabel');
  const adminBar = document.getElementById('adminBar');
  const adminLabel = document.getElementById('adminLabel');
  const researchesContainer = document.getElementById('researchesContainer');
  const expeditionSection = document.getElementById('expeditionSection');
  const expeditionsContainer = document.getElementById('expeditionsContainer');

  resourcesContainer.innerHTML = Object.entries(gameState.resources)
    .filter(([resourceId]) => resourceId !== 'electricity' && resourceId !== 'researchPoints' && resourceId !== 'adminPoints' && resourceId !== 'weapons' && resourceId !== 'soldiers' && resourceId !== 'defensePower')
    .map(([_, resource]) => createResourceCard(resource))
    .join('');
  
  improvementsContainer.innerHTML = Object.values(gameState.improvements)
    .map(createImprovementsCard)
    .join('');

  const buildingCards = Object.keys(gameState.buildings)
    .map(buildingId => {
      const building = gameState.buildings[buildingId];
      if (!building || typeof building !== 'object') {
        if (debug) {console.error(`Invalid building for ID ${buildingId}:`, building)};
        return '';
      }
      return createBuildingCard(building);
    })
    .filter(card => card !== '')
    .join('');
  buildingsContainer.innerHTML = buildingCards;

  let buffsDebuffsHTML = gameState.buffsDebuffs && gameState.buffsDebuffs.length > 0
    ? gameState.buffsDebuffs.map(createBuffDebuffCard).join('')
    : '';
  if (gameState.activeEvent) {
    buffsDebuffsHTML += createEventCard(gameState.activeEvent);
  }
  buffsDebuffsContainer.innerHTML = buffsDebuffsHTML || '<p class="buff-debuff">No active buffs, debuffs, or events.</p>';

  const resourceBudgets = Object.entries(gameState.resources)
    .filter(([resourceId]) => resourceId !== 'electricity' && resourceId !== 'researchPoints' && resourceId !== 'adminPoints' && resourceId !== 'weapons' && resourceId !== 'soldiers' && resourceId !== 'defensePower')
    .map(([resourceId, resource]) => createResourceBudgetItem(resourceId, resource))
    .join('');
  const electricityBudget = createElectricityBudgetItem();
  const civilizationBudget = createCivilizationBudgetItem();
  resourceBudgetContainer.innerHTML = resourceBudgets + electricityBudget + civilizationBudget;

  if (gameState.hasUnlockedElectricity) {
    electricitySection.style.display = 'block';
    const percentage = (gameState.electricity / gameState.maxElectricity) * 100;
    electricityBar.style.setProperty('--width', `${percentage}%`);
    electricityBar.className = 'electricity-bar';
    if (percentage >= 50) {
      electricityBar.classList.add('green');
    } else if (percentage >= 25) {
      electricityBar.classList.add('yellow');
    } else {
      electricityBar.classList.add('red');
    }
    electricityLabel.textContent = `${gameState.electricity.toFixed(1)} / ${gameState.maxElectricity}`;
  } else {
    electricitySection.style.display = 'none';
  }

  if (gameState.hasUnlockedCivilization) {
  civilizationSection.style.display = 'block';
  researchesContainer.style.display = 'block'; // Make Researches section visible
  // Populate the Researches section with research cards
  const researchCardsContainer = researchesContainer.querySelector('.cards-container');
  researchCardsContainer.innerHTML = Object.values(gameState.researches)
    .map(createResearchCard)
    .join('');
  const researchPercentage = (gameState.researchPoints / gameState.maxResearchPoints) * 100;
  researchBar.style.setProperty('--width', `${researchPercentage}%`);
  researchLabel.textContent = `${gameState.researchPoints.toFixed(1)} / ${gameState.maxResearchPoints}`;
  // Position Research Points label to the right of the bar
  researchLabel.style.position = 'static';
  researchLabel.style.transform = 'none';
  researchLabel.style.marginLeft = '10px';

  const adminPercentage = (gameState.adminPoints / gameState.maxAdminPoints) * 100;
  adminBar.style.setProperty('--width', `${adminPercentage}%`);
  adminLabel.textContent = `${gameState.adminPoints.toFixed(1)} / ${gameState.maxAdminPoints}`;
  // Position Administrative Points label to the right of the bar
  adminLabel.style.position = 'static';
  adminLabel.style.transform = 'none';
  adminLabel.style.marginLeft = '10px';

  if (gameState.hasUnlockedMilitary) {
    // Weapons
    let weaponsDiv = document.getElementById('weaponsDiv');
    if (!weaponsDiv) {
      weaponsDiv = document.createElement('div');
      weaponsDiv.id = 'weaponsDiv';
      weaponsDiv.className = 'civilization-resource';
      weaponsDiv.innerHTML = '<h3>Weapons</h3>';
      civilizationSection.appendChild(weaponsDiv);
    }
    let weaponsContainer = document.getElementById('weaponsContainer');
    if (!weaponsContainer) {
      weaponsContainer = document.createElement('div');
      weaponsContainer.id = 'weaponsContainer';
      weaponsContainer.className = 'civilization-bar-container';
      weaponsDiv.appendChild(weaponsContainer);
    }
    let weaponsBar = document.getElementById('weaponsBar');
    if (!weaponsBar) {
      weaponsBar = document.createElement('div');
      weaponsBar.id = 'weaponsBar';
      weaponsBar.className = 'civilization-bar';
      weaponsContainer.appendChild(weaponsBar);
    }
    let weaponsLabel = document.getElementById('weaponsLabel');
    if (!weaponsLabel) {
      weaponsLabel = document.createElement('span');
      weaponsLabel.id = 'weaponsLabel';
      weaponsContainer.appendChild(weaponsLabel);
    }
    const weaponsPercentage = (gameState.weapons / gameState.maxWeapons) * 100;
    weaponsBar.style.setProperty('--width', `${weaponsPercentage}%`);
    weaponsLabel.textContent = `${gameState.weapons.toFixed(1)} / ${gameState.maxWeapons}`;
    // Position Weapons label to the right of the bar
    weaponsLabel.style.position = 'static';
    weaponsLabel.style.transform = 'none';
    weaponsLabel.style.marginLeft = '10px';

    // Soldiers
    let soldiersDiv = document.getElementById('soldiersDiv');
    if (!soldiersDiv) {
      soldiersDiv = document.createElement('div');
      soldiersDiv.id = 'soldiersDiv';
      soldiersDiv.className = 'civilization-resource';
      soldiersDiv.innerHTML = '<h3>Soldiers</h3>';
      civilizationSection.appendChild(soldiersDiv);
    }
    let soldiersContainer = document.getElementById('soldiersContainer');
    if (!soldiersContainer) {
      soldiersContainer = document.createElement('div');
      soldiersContainer.id = 'soldiersContainer';
      soldiersContainer.className = 'civilization-bar-container';
      soldiersDiv.appendChild(soldiersContainer);
    }
    let soldiersBar = document.getElementById('soldiersBar');
    if (!soldiersBar) {
      soldiersBar = document.createElement('div');
      soldiersBar.id = 'soldiersBar';
      soldiersBar.className = 'civilization-bar';
      soldiersContainer.appendChild(soldiersBar);
    }
    let soldiersLabel = document.getElementById('soldiersLabel');
    if (!soldiersLabel) {
      soldiersLabel = document.createElement('span');
      soldiersLabel.id = 'soldiersLabel';
      soldiersContainer.appendChild(soldiersLabel);
    }
    const soldiersPercentage = (gameState.soldiers / gameState.maxSoldiers) * 100;
    soldiersBar.style.setProperty('--width', `${soldiersPercentage}%`);
    soldiersLabel.textContent = `${gameState.soldiers.toFixed(1)} / ${gameState.maxSoldiers}`;
    // Position Soldiers label to the right of the bar
    soldiersLabel.style.position = 'static';
    soldiersLabel.style.transform = 'none';
    soldiersLabel.style.marginLeft = '10px';

    // Defense Power
    if (gameState.hasUnlockedDefensePower) {
      let defensePowerDiv = document.getElementById('defensePowerDiv');
      if (!defensePowerDiv) {
        defensePowerDiv = document.createElement('div');
        defensePowerDiv.id = 'defensePowerDiv';
        defensePowerDiv.className = 'civilization-resource';
        defensePowerDiv.innerHTML = '<h3>Defense Power</h3>';
        civilizationSection.appendChild(defensePowerDiv);
      }
      let defensePowerContainer = document.getElementById('defensePowerContainer');
      if (!defensePowerContainer) {
        defensePowerContainer = document.createElement('div');
        defensePowerContainer.id = 'defensePowerContainer';
        defensePowerContainer.className = 'civilization-bar-container';
        defensePowerDiv.appendChild(defensePowerContainer);
      }
      let defensePowerBar = document.getElementById('defensePowerBar');
      if (!defensePowerBar) {
        defensePowerBar = document.createElement('div');
        defensePowerBar.id = 'defensePowerBar';
        defensePowerBar.className = 'civilization-bar';
        defensePowerContainer.appendChild(defensePowerBar);
      }
      let defensePowerLabel = document.getElementById('defensePowerLabel');
      if (!defensePowerLabel) {
        defensePowerLabel = document.createElement('span');
        defensePowerLabel.id = 'defensePowerLabel';
        defensePowerContainer.appendChild(defensePowerLabel);
      }
      defensePowerBar.style.setProperty('--width', '100%'); // Fixed width
      defensePowerBar.className = 'civilization-bar'; // Reset classes
      const defensePower = gameState.resources.defensePower.amount;
      // Reset classes and border to ensure clean slate
defensePowerBar.classList.remove('red', 'yellow', 'green');
defensePowerBar.style.border = 'none'; // Reset border by default

if (defensePower < 50) {
  defensePowerBar.classList.add('red');
} else if (defensePower < 150) {
  defensePowerBar.classList.add('yellow');
} else if (defensePower >= 150 && defensePower <= 200) {
  defensePowerBar.classList.add('green');
} else if (defensePower > 200) {
  defensePowerBar.classList.add('green');
  defensePowerBar.style.border = '2px solid #00FF00'; // Bright green border
}
      defensePowerLabel.textContent = `${defensePower.toFixed(2)}`;
      // Position Defense Power label to the right of the bar
      defensePowerLabel.style.position = 'static';
      defensePowerLabel.style.transform = 'none';
      defensePowerLabel.style.marginLeft = '10px';
    }
  }
} else {
    civilizationSection.style.display = 'none';
    researchesContainer.style.display = 'none';
  }

  if (gameState.buildings.expeditionHQ?.amount >= 1) {
    expeditionSection.style.display = 'block';
    const wasActive = expeditionsContainer.dataset.wasActive === 'true';
    const isActive = !!gameState.activeExpedition;

    const affordabilityKey = Object.values(EXPEDITIONS).map(expedition => {
      const canAfford = Object.entries(expedition.cost).every(([resourceId, amount]) => {
        if (resourceId === 'adminPoints') return gameState.adminPoints >= amount;
        return gameState.resources[resourceId].amount >= amount;
      });
      return `${expedition.id}:${canAfford}`;
    }).join('|');
    const previousAffordabilityKey = expeditionsContainer.dataset.affordabilityKey || '';

    if (
      !expeditionsContainer.dataset.initialized ||
      wasActive !== isActive ||
      affordabilityKey !== previousAffordabilityKey
    ) {
      if (debug) {console.log(`Rebuilding expedition cards: initialized=${expeditionsContainer.dataset.initialized}, wasActive=${wasActive}, isActive=${isActive}, affordabilityChanged=${affordabilityKey !== previousAffordabilityKey}`)};
      expeditionsContainer.innerHTML = Object.values(EXPEDITIONS).map(createExpeditionCard).join('');
      expeditionsContainer.dataset.initialized = 'true';
      expeditionsContainer.dataset.wasActive = isActive.toString();
      expeditionsContainer.dataset.affordabilityKey = affordabilityKey;
    }

    Object.values(EXPEDITIONS).forEach(expedition => {
      if (gameState.activeExpedition && gameState.activeExpedition.id === expedition.id) {
        const countdownElement = document.getElementById(`countdown-${expedition.id}`);
        if (countdownElement) {
          const now = Date.now();
          const elapsed = now - gameState.activeExpedition.startTime;
          const remainingTime = Math.max(0, gameState.activeExpedition.duration - elapsed);
          const minutes = Math.floor(remainingTime / 60000);
          const seconds = Math.floor((remainingTime % 60000) / 1000);
          const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          countdownElement.textContent = `Expedition in progress: ${formattedTime} remaining`;
        }
      }
      const maxPairs = Math.min(Math.floor(gameState.soldiers), Math.floor(gameState.weapons));
      const options = [
        { percent: 10, soldiers: Math.floor(maxPairs * 0.1) },
        { percent: 50, soldiers: Math.floor(maxPairs * 0.5) },
        { percent: 90, soldiers: Math.floor(maxPairs * 0.9) }
      ];
      options.forEach(option => {
        const labelElement = document.getElementById(`soldier-option-${expedition.id}-${option.percent}`);
        if (labelElement) {
          labelElement.innerHTML = `
            <input 
              type="radio" 
              name="${expedition.id}-soldiers" 
              value="${option.percent}" 
              ${option.percent === gameState.selectedExpeditionPercentages[expedition.id] ? 'checked' : ''} 
              ${maxPairs < 1 || (gameState.activeExpedition && gameState.activeExpedition.id === expedition.id) || option.soldiers < 1 ? 'disabled' : ''} 
              ${option.soldiers < 1 ? 'style="visibility: hidden;"' : ''} 
              onchange="window.updateExpeditionSelection('${expedition.id}', ${option.percent})"
            >
            ${option.percent}% of your army (${option.soldiers} soldier/weapon pairs)
          `;
        }
      });
    });
  } else {
    expeditionSection.style.display = 'none';
  }
}

function checkAchievements() {
  const now = Date.now();
  for (const [achievementId, achievement] of Object.entries(ACHIEVEMENTS)) {
    // Initialize achievement tracking if not present
    if (!gameState.achievements[achievementId]) {
      gameState.achievements[achievementId] = { count: 0, lastUnlocked: null };
    }

    const achievementData = gameState.achievements[achievementId];
    // Check if the achievement can still be unlocked
    if (achievementData.count >= achievement.maxUnlock) {
      continue; // Already unlocked the maximum number of times
    }

    // Check if the condition is met
    if (achievement.condition()) {
      achievementData.count += 1;
      achievementData.lastUnlocked = now;

      // Apply reward if any
      if (achievement.reward) {
        if (achievement.reward.type === "resource") {
          const resource = gameState.resources[achievement.reward.resourceId];
          if (resource) {
            resource.amount = Math.min(
              resource.max,
              resource.amount + achievement.reward.amount
            );
          } else if (achievement.reward.resourceId === "soldiers") {
            gameState.soldiers = Math.min(
              gameState.maxSoldiers,
              gameState.soldiers + achievement.reward.amount
            );
            gameState.resources.soldiers.amount = gameState.soldiers;
          } else if (achievement.reward.resourceId === "weapons") {
            gameState.weapons = Math.min(
              gameState.maxWeapons,
              gameState.weapons + achievement.reward.amount
            );
            gameState.resources.weapons.amount = gameState.weapons;
          } else if (achievement.reward.resourceId === "researchpoints") {
            gameState.researchpoints += achievement.reward.amount;
          } else if (achievement.reward.resourceId === "adminpoints") {
            gameState.adminpoints += achievement.reward.amount;
          }
        } else if (achievement.reward.type === "building") {
          const building = gameState.buildings[achievement.reward.buildingId];
          if (building) {
            building.amount += achievement.reward.amount;
            updateMaxResources(); // Update resource caps (e.g., electricity from windmills)
          }
        }
      }

      // Notify the player
      const rewardText = achievement.reward
        ? achievement.reward.type === "building"
          ? `\nReward: ${achievement.reward.amount} ${gameState.buildings[achievement.reward.buildingId].name}(s)`
          : `\nReward: ${achievement.reward.amount} ${achievement.reward.resourceId}`
        : "";
      const tierText = "*".repeat(achievement.tier);
      showNotification(
        `Achievement Unlocked: ${achievement.name} (${tierText})\n${achievement.description}${rewardText}`,
        "normal"
      );

      // Log the event with a modified format
      const logRewardText = achievement.reward
        ? achievement.reward.type === "building"
          ? ` (Reward: ${achievement.reward.amount} ${gameState.buildings[achievement.reward.buildingId].name}(s))`
          : ` (Reward: ${achievement.reward.amount} ${achievement.reward.resourceId})`
        : "";
      logEvent(`[Achievement] Unlocked ${achievement.name} (${tierText})${logRewardText}`);

      saveGame();
    }
  }
}

// Save/Load functionality
function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
  gameState.lastSaved = Date.now();
}

function loadGame() {
  const savedGame = localStorage.getItem(SAVE_KEY);
  if (savedGame) {
    gameState = JSON.parse(savedGame);

    // Targeted cleanup of only undefined resources in gameState.resources
    const validResourceIds = Object.keys(initialGameState.resources);
    Object.keys(gameState.resources).forEach(resourceId => {
      if (!validResourceIds.includes(resourceId)) {
        if (debug) {console.log(`Removing undefined resource: ${resourceId}`)};
        delete gameState.resources[resourceId];
      }
    });
	
	// Targeted cleanup of only undefined buildings in gameState.buildings
const validBuildingIds = Object.keys(initialGameState.buildings);
Object.keys(gameState.buildings).forEach(buildingId => {
  if (!validBuildingIds.includes(buildingId)) {
    if (debug) {console.log(`Removing undefined building: ${buildingId}`)};
    delete gameState.buildings[buildingId];
  }
});


    if (!gameState.buildings || typeof gameState.buildings !== 'object' || Array.isArray(gameState.buildings)) {
      if (debug) {console.error("gameState.buildings is invalid, resetting to initial state:", gameState.buildings)};
      gameState.buildings = { ...initialGameState.buildings };
    }

    Object.entries(gameState.resources).forEach(([resourceId, resource]) => {
      if (resourceId !== 'electricity' && resourceId !== 'researchPoints' && resourceId !== 'adminPoints' && resourceId !== 'weapons' && resourceId !== 'soldiers' && resourceId !== 'defensePower') {
        resource.max = initialGameState.resources[resourceId].max;
        Object.values(gameState.improvements).forEach(improv => {
          if (improv.raises === resourceId) {
            resource.max += improv.amount * improv.raisesBy;
          } else if (improv.raisesMultiple && improv.raisesMultiple[resourceId]) {
            resource.max += improv.amount * improv.raisesMultiple[resourceId];
          }
        });
      }
    });

    gameState.maxElectricity = initialGameState.maxElectricity;
    if (gameState.improvements.upgradeBatteries) {
      gameState.maxElectricity += gameState.improvements.upgradeBatteries.amount * gameState.improvements.upgradeBatteries.raisesBy;
    }

    gameState.maxResearchPoints = initialGameState.maxResearchPoints;
    if (gameState.improvements.library) {
      gameState.maxResearchPoints += gameState.improvements.library.amount * gameState.improvements.library.raisesBy;
    }

    gameState.maxAdminPoints = initialGameState.maxAdminPoints;
    if (gameState.improvements.filingCabinet) {
      gameState.maxAdminPoints += gameState.improvements.filingCabinet.amount * gameState.improvements.filingCabinet.raisesBy;
    }

    gameState.maxSoldiers = initialGameState.maxSoldiers;
    if (gameState.improvements.readStrategyBooks) {
      gameState.maxSoldiers += gameState.improvements.readStrategyBooks.amount * gameState.improvements.readStrategyBooks.raisesBy;
    }
    if (gameState.improvements.militaryAcademy) {
      gameState.maxSoldiers += gameState.improvements.militaryAcademy.amount * 300;
    }
    gameState.resources.soldiers.max = gameState.maxSoldiers;

    gameState.maxWeapons = initialGameState.maxWeapons;
    if (gameState.improvements.extendArmory) {
      gameState.maxWeapons += gameState.improvements.extendArmory.amount * gameState.improvements.extendArmory.raisesBy;
    }
    if (gameState.improvements.militaryAcademy) {
      gameState.maxWeapons += gameState.improvements.militaryAcademy.amount * 300;
    }
    gameState.resources.weapons.max = gameState.maxWeapons;

    gameState.hasUnlockedExpeditions = gameState.buildings.armory?.amount >= 5 && gameState.buildings.barracks?.amount >= 5;

    if (gameState.researches && gameState.researches.expeditionHQ) {
      delete gameState.researches.expeditionHQ;
    }

    if (!gameState.buffsDebuffs) gameState.buffsDebuffs = [];
    if (gameState.hasSeenWelcome === undefined) gameState.hasSeenWelcome = false;
    if (gameState.hasUnlockedElectricity === undefined) gameState.hasUnlockedElectricity = false;
    if (gameState.electricity === undefined) gameState.electricity = 0;
    if (gameState.hasUnlockedBatteries === undefined) gameState.hasUnlockedBatteries = false;
    if (gameState.maxElectricity === undefined) {
      gameState.maxElectricity = 100;
      if (gameState.improvements.upgradeBatteries) {
        gameState.maxElectricity += gameState.improvements.upgradeBatteries.amount * 25;
      }
    }
    if (gameState.lumberjackCampsDisabled === undefined) {
      gameState.lumberjackCampsDisabled = false;
    }
    if (gameState.hasIncreasedFoodConsumption === undefined) {
      gameState.hasIncreasedFoodConsumption = false;
    }
    if (gameState.foodConsumptionRate === undefined) {
      gameState.foodConsumptionRate = 0.05;
    }
    if (gameState.waterConsumptionRate === undefined) {
      gameState.waterConsumptionRate = 0.05;
    }
    if (gameState.hasIncreasedFoodConsumption && gameState.foodConsumptionRate === 0.05) {
      gameState.foodConsumptionRate = 0.15;
    }
    if (gameState.isNotificationVisible === undefined) {
      gameState.isNotificationVisible = false;
    }
    if (!gameState.activeEvent) gameState.activeEvent = null;
    if (!gameState.lastEventTimes) gameState.lastEventTimes = {};
    if (!gameState.nextEventCheck) gameState.nextEventCheck = Date.now();
    if (gameState.nextEventCheck <= Date.now()) {
      gameState.nextEventCheck = Date.now() + 300000;
    }
    if (gameState.hasUnlockedTimedEvents === undefined) {
      gameState.hasUnlockedTimedEvents = gameState.buildings.trailer.amount >= 50;
    }
    if (gameState.generatorsDisabled === undefined) {
      gameState.generatorsDisabled = false;
    }
    if (gameState.lastGeneratorStateChange === undefined) {
      gameState.lastGeneratorStateChange = Date.now();
    }
    if (gameState.electricityConsumersDisabled === undefined) {
      gameState.electricityConsumersDisabled = gameState.lumberjackCampsDisabled || false;
    }
    if (gameState.hasUnlockedCivilization === undefined) {
      gameState.hasUnlockedCivilization = gameState.buildings.trailer.amount >= 55;
    }
    if (gameState.researchPoints === undefined) gameState.researchPoints = 0;
    if (gameState.maxResearchPoints === undefined) {
      gameState.maxResearchPoints = 100;
      if (gameState.improvements.library) {
        gameState.maxResearchPoints += gameState.improvements.library.amount * 125;
      }
    }
    if (gameState.adminPoints === undefined) gameState.adminPoints = 0;
    if (gameState.maxAdminPoints === undefined) {
      gameState.maxAdminPoints = 100;
      if (gameState.improvements.filingCabinet) {
        gameState.maxAdminPoints += gameState.improvements.filingCabinet.amount * 75;
      }
    }
    if (!gameState.resources.electricity) {
      gameState.resources.electricity = { ...initialGameState.resources.electricity };
    }
    gameState.resources.electricity.amount = gameState.electricity;
    gameState.resources.electricity.max = gameState.maxElectricity;
    if (!gameState.resources.researchPoints) {
      gameState.resources.researchPoints = { ...initialGameState.resources.researchPoints };
    }
    gameState.resources.researchPoints.amount = gameState.researchPoints;
    gameState.resources.researchPoints.max = gameState.maxResearchPoints;
    if (!gameState.resources.adminPoints) {
      gameState.resources.adminPoints = { ...initialGameState.resources.adminPoints };
    }
    gameState.resources.adminPoints.amount = gameState.adminPoints;
    gameState.resources.adminPoints.max = gameState.maxAdminPoints;
    if (!gameState.researches) {
      gameState.researches = { ...initialGameState.researches };
    }
    if (!gameState.researchEffects) {
      gameState.researchEffects = [];
    }
    if (gameState.hasUnlockedMilitary === undefined) {
      gameState.hasUnlockedMilitary = gameState.buildings.apartmentComplex?.amount >= 15 && gameState.buildings.townhall?.amount >= 15;
    }
    if (gameState.weapons === undefined) gameState.weapons = 0;
    if (gameState.maxWeapons === undefined) gameState.maxWeapons = 100;
    if (gameState.soldiers === undefined) gameState.soldiers = 0;
    if (gameState.maxSoldiers === undefined) gameState.maxSoldiers = 100;
    if (!gameState.resources.weapons) {
      gameState.resources.weapons = { ...initialGameState.resources.weapons };
    }
    gameState.resources.weapons.amount = gameState.weapons;
    gameState.resources.weapons.max = gameState.maxWeapons;
    if (!gameState.resources.soldiers) {
      gameState.resources.soldiers = { ...initialGameState.resources.soldiers };
    }
    gameState.resources.soldiers.amount = gameState.soldiers;
    gameState.resources.soldiers.max = gameState.maxSoldiers;
    if (!gameState.resources.defensePower) {
      gameState.resources.defensePower = { ...initialGameState.resources.defensePower };
    }
    if (gameState.activeExpedition === undefined) {
      gameState.activeExpedition = null;
    } else if (gameState.activeExpedition && !gameState.activeExpedition.percentage) {
      gameState.activeExpedition = null;
    }
    if (!gameState.lastExpeditionTimes) {
      gameState.lastExpeditionTimes = {};
    }
    if (gameState.hasSeenExpeditionUnlockNotification === undefined) {
      gameState.hasSeenExpeditionUnlockNotification = false;
    }
    if (!gameState.selectedExpeditionPercentages) {
      gameState.selectedExpeditionPercentages = {};
    }
    if (gameState.hasUnlockedRiverPump === undefined) {
      gameState.hasUnlockedRiverPump = false;
    }
    if (gameState.hasUnlockedWaterPower === undefined) {
      gameState.hasUnlockedWaterPower = false;
    }
    if (gameState.hasSeenBAPUnlock === undefined) {
      gameState.hasSeenBAPUnlock = false;
    }
    if (gameState.hasUnlockedDefensePower === undefined) {
      gameState.hasUnlockedDefensePower = false;
    }
    // Retroactively unlock Water Power and Big Apartment Complex if conditions met
    if (
      gameState.buildings.apartmentComplex?.amount >= 15 &&
      gameState.buildings.solarpanel?.amount > 100 &&
      gameState.buildings.windmill?.amount > 100 &&
      !gameState.hasUnlockedWaterPower
    ) {
      gameState.hasUnlockedWaterPower = true;
    }
    if (
      gameState.buildings.apartmentComplex?.amount >= 35 &&
      gameState.hasUnlockedWaterPower &&
      !gameState.hasSeenBAPUnlock
    ) {
      gameState.hasSeenBAPUnlock = true;
    }
    if (
      gameState.buildings.armory?.amount >= 15 &&
      gameState.buildings.barracks?.amount >= 15 &&
      gameState.buildings.bigApartmentComplex?.amount >= 5 &&
      !gameState.hasUnlockedDefensePower
    ) {
      gameState.hasUnlockedDefensePower = true;
    }
    if (gameState.activeEvent && gameState.activeEvent.id === 'communityAttack' && !gameState.activeEvent.effect.resolve) {
      gameState.activeEvent.effect.resolve = TIMED_EVENTS['communityAttack'].effect.resolve;
    }
    // Recalculate Defense Power based on all defense improvements
    if (gameState.hasUnlockedDefensePower) {
      const baseDefense = ((gameState.soldiers * 2) - gameState.weapons) / 10;
      let improvementDefense = 0;
      Object.values(gameState.improvements).forEach(improvement => {
        if (improvement.raises === 'defensePower') {
          improvementDefense += improvement.amount * improvement.raisesBy;
        }
      });
      gameState.resources.defensePower.amount = Math.max(0, baseDefense + improvementDefense);
    }
  } else {
    gameState = { ...initialGameState };
    gameState.hasSeenExpeditionUnlockNotification = false;
  }
  
  if (!gameState.weather) gameState.weather = { temperature: null, condition: null, windSpeed: null, cloudCover: null };
  syncGameState();
  if (gameState.musicEnabled) {
    bgMusic.play();
    musicIcon.textContent = '🔊';
  }
  
  if (!gameState.eventLog) {
  gameState.eventLog = [];
}
if (!gameState.achievements) {
  gameState.achievements = {};
}
if (!gameState.lastAchievementCheck) {
  gameState.lastAchievementCheck = null;
}
  
  updateUI();

  if (!gameState.hasSeenWelcome) {
    showNotification("Welcome to Wastelands! Survive and thrive in this post-apocalyptic world. Click 'Gather' to gather the various resources manually, build buildings to get a steady income flowing and build improvements to increase storage room and more.", 'normal');
  }

  saveGame();
}

// Add to game loop or a timer
setInterval(syncGameState, 5000); // Check every 5 seconds (adjust as needed)

function exportSave() {
  const saveData = (JSON.stringify(gameState));
  navigator.clipboard.writeText(saveData);
  alert('Save data copied to clipboard!');
}

function importSave() {
  const importInput = document.getElementById('importInput');
  try {
    const decoded = JSON.parse((importInput.value));
    gameState = decoded;
    saveGame();
    updateUI();
    importInput.value = '';
  } catch (e) {
    alert('Invalid save data');
  }
}

function logEvent(description) {
  const now = new Date();
  const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} on ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  const eventEntry = { timestamp, description };
  
  // Add the new event to the beginning of the array
  gameState.eventLog.unshift(eventEntry);
  
  // Keep only the last 200 events
  if (gameState.eventLog.length > 200) {
    gameState.eventLog = gameState.eventLog.slice(0, 200);
  }
  
  saveGame();
}

function showAchievements() {
  // Calculate total achievements
  const totalAchievements = Object.keys(ACHIEVEMENTS).length;
  if (totalAchievements === 0) {
    showNotification("No achievements available yet.", "large");
    return;
  }

  // Calculate unlocked achievements
  let unlockedAchievements = 0;
  for (const achievementId in ACHIEVEMENTS) {
    const achievementData = gameState.achievements[achievementId] || { count: 0 };
    if (achievementData.count > 0) {
      unlockedAchievements++;
    }
  }

  // Update the achievements count display
  document.getElementById('achievementsTotal').textContent = `${unlockedAchievements} of ${totalAchievements}`;

  // Populate the achievements grid
  const grid = document.getElementById('achievementsGrid');
  grid.innerHTML = ''; // Clear existing content

  // Sort achievements alphabetically by name (ascending), then by tier (ascending)
  const sortedAchievements = Object.entries(ACHIEVEMENTS).sort((a, b) => {
    const nameA = a[1].name.toLowerCase();
    const nameB = b[1].name.toLowerCase();
    const nameComparison = nameA.localeCompare(nameB);
    if (nameComparison !== 0) {
      return nameComparison; // Sort by name first (ascending)
    }
    // If names are equal, sort by tier (ascending)
    const tierA = a[1].tier;
    const tierB = b[1].tier;
    return tierA - tierB; // Sort by tier in ascending order (lower tier first)
  });

  for (const [achievementId, achievement] of sortedAchievements) {
    const achievementData = gameState.achievements[achievementId] || { count: 0 };
    const isUnlocked = achievementData.count > 0;
    const tierText = "*".repeat(achievement.tier);
    const countText = achievement.maxUnlock > 1 ? ` (${achievementData.count}/${achievement.maxUnlock})` : "";

    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? '' : 'unachieved'}`;
    card.title = `${achievement.name}${countText}\n${achievement.description}`;

    const trophy = document.createElement('span');
    trophy.className = 'trophy';
    trophy.textContent = '🏆';
    card.appendChild(trophy);

    const name = document.createElement('span');
    name.className = 'achievement-name';
    name.textContent = achievement.name;
    card.appendChild(name);

    const tier = document.createElement('span');
    tier.className = 'tier';
    tier.textContent = tierText;
    card.appendChild(tier);

    grid.appendChild(card);
  }

  // Show the popup
  document.getElementById('achievementsPopup').style.display = 'flex';
}

function resetGame() {
  localStorage.removeItem(SAVE_KEY);
  gameState = { ...initialGameState }; // Fresh reset
  saveGame();
  updateUI();
  if (debug) {console.log("Game reset to start values.")};
}

var objToday = new Date(),
  weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
  dayOfWeek = weekday[objToday.getDay()],
  domEnder = function() { var a = objToday.getDate(); if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
  dayOfMonth = (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
  months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
  curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear(),
  curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
  curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
  curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
  curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var today = dayOfWeek + ", \n" + curMonth + " " + dayOfMonth + ", " + curYear;

document.getElementById('today').textContent = today;

// fetch temperature and location
const CITY = document.getElementById('locale');
const SKYCONDITION = document.getElementById('skyCond');
const windSP = document.getElementById('windSP');
const TEMPERATURE = document.getElementById('temperature');
const URL_MAIN = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '8f57cb746c4c1d4b48b7f35eba6f6230';
const UNITS = 'metric';

function getChiemseePosition() {
  return {
    coords: {
      latitude: 47.88,
      longitude: 12.42,
      accuracy: 0
    },
    timestamp: Date.now()
  };
}

let weatherUrl = ''; // Store the URL globally

navigator.geolocation.getCurrentPosition(loadUrl, (error) => {
  if (debug) {console.error("Geolocation error:", error)};
  // Fallback: Retry geolocation after a delay
  setTimeout(() => {
    if (debug) {console.log("Retrying geolocation...")};
    navigator.geolocation.getCurrentPosition(loadUrl, (error) => {
      if (debug) {console.error("Geolocation failed again:", error)};
		loadUrl(getChiemseePosition());
      // CITY.innerText = "Location unavailable";
      // TEMPERATURE.innerText = "N/A";
    });
  }, 5000);
});

function loadUrl(pos) {
  let lat = pos.coords.latitude;
  let long = pos.coords.longitude;
  weatherUrl = `${URL_MAIN}?lat=${lat}&lon=${long}&units=${UNITS}&APPID=${API_KEY}`;
  fetchApi(weatherUrl);
}

// Update the interval to use the stored URL
setInterval(() => {
  if (weatherUrl) {
    fetchApi(weatherUrl);
  } else {
    if (debug) {console.warn("Weather URL not set yet, skipping fetch.")};
  }
}, 300000);



async function fetchApi(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      if (debug) {console.error("Failed to fetch weather data:", response.statusText)};
      return;
    }
    let data = await response.json();
    let temperature = data.main.temp.toFixed(1);
    let condition = data.weather[0].main; // e.g., "Rain", "Clear", "Clouds"
    let windSpeed = data.wind.speed; // Store as a number
    let cloudCover = data.clouds.all; // Cloud cover percentage (0-100)
    let solarStatus; // Declare the variable
	
    if (cloudCover === 0) {
      solarStatus = 'Clear Skies';
    } else if (cloudCover <= 25) {
      solarStatus = 'Cloudy';
    } else if (cloudCover <= 50) {
      solarStatus = 'Scattered Clouds';
    } else if (cloudCover <= 84) {
      solarStatus = 'Broken Clouds';
    } else if (condition === 'Rain') {
      solarStatus = 'Rainy Weather';
	} 
	  else {
      solarStatus = 'Overcast';
    }

    // Update DOM elements
    CITY.innerText = `${data.name}`;
    TEMPERATURE.innerText = `${temperature} ºC`;
    SKYCONDITION.innerText = `${solarStatus}`;
    windSP.innerText = `Wind Speed: ${windSpeed} m/s`; // Format for display

    // Store weather data in gameState
    gameState.weather.temperature = parseFloat(temperature);
    gameState.weather.condition = condition;
    gameState.weather.windSpeed = parseFloat(windSpeed); // Store as a number
    gameState.weather.cloudCover = cloudCover; // Store cloud cover percentage
    saveGame(); // Save the updated weather data
    updateBuffsDebuffs(); // Update buffs/debuffs based on new weather

    if (debug) {console.log(`Weather updated: ${data.name}, ${temperature}ºC, ${condition}, Wind: ${windSpeed}m/s, Cloud Cover: ${cloudCover}%`)};
  } catch (error) {
    if (debug) {console.error("Error fetching weather data:", error)};
  }
}

// Update buffs/debuffs based on weather
function updateBuffsDebuffs() {
  const previousBuffsDebuffs = [...gameState.buffsDebuffs];
  const buffsDebuffs = [];

  const temp = gameState.weather.temperature;
  if (temp !== null) {
    WEATHER_EFFECTS.temperature.forEach(effect => {
      if (effect.condition(temp)) {
        buffsDebuffs.push(effect.buffDebuff);
      }
    });
  }

  const condition = gameState.weather.condition;
  if (condition) {
    WEATHER_EFFECTS.condition.forEach(effect => {
      if (effect.condition(condition)) {
        buffsDebuffs.push(effect.buffDebuff);
      }
    });
  }

  const previousNames = previousBuffsDebuffs.map(bd => bd.name).sort();
  const newNames = buffsDebuffs.map(bd => bd.name).sort();
  const isDifferent = JSON.stringify(previousNames) !== JSON.stringify(newNames);

  if (isDifferent) {
	  
	  // Log removed buffs/debuffs
    previousBuffsDebuffs.forEach(bd => {
      if (!newNames.includes(bd.name)) {
        logEvent(`Weather effect ended: ${bd.name} (${bd.effect})`);
      }
    });
    // Log new buffs/debuffs
    buffsDebuffs.forEach(bd => {
      if (!previousNames.includes(bd.name)) {
        logEvent(`Weather effect applied: ${bd.name} (${bd.effect})`);
      }
    });
	
    if (buffsDebuffs.length > 0) {
      const message = buffsDebuffs.map(bd => `${bd.name}: ${bd.effect}`).join("\n");
      showNotification(`Weather Update:\n${message}`, 'normal');
    } else {
      showNotification("Weather Update: No active buffs or debuffs.", 'normal');
    }
  }

  gameState.buffsDebuffs = buffsDebuffs;
  updateUI();
}

// Initialize game
window.gather = gather;
window.improve = improve;
window.build = build;
window.research = research;
window.sendExpedition = sendExpedition;

document.getElementById('saveButton').addEventListener('click', saveGame);
document.getElementById('exportButton').addEventListener('click', exportSave);
document.getElementById('importButton').addEventListener('click', importSave);
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('musicButton').addEventListener('click', toggleMusic);
document.getElementById('logButton').addEventListener('click', showEventLog);
document.getElementById('achButton').addEventListener('click', showAchievements);

// Set up dismiss buttons
document.getElementById('notificationDismiss').addEventListener('click', () => hideNotification('normal'));
document.getElementById('largeNotificationDismiss').addEventListener('click', () => hideNotification('large'));
document.getElementById('closeAchievementsPopup').addEventListener('click', () => {
  document.getElementById('achievementsPopup').style.display = 'none';
});

document.getElementById('cheatButton').addEventListener('click', () => {
  const normalResources = ['food', 'water', 'scrap', 'wood', 'electronics', 'medicalSupplies'];
  normalResources.forEach(resourceId => {
    if (gameState.resources[resourceId]) {
      gameState.resources[resourceId].amount = gameState.resources[resourceId].max;
    }
  });
  updateUI();
  saveGame();
  showNotification('Cheat activated: All normal resources filled to max!', 'normal');
});

// Add event listener for the Imprint button
const legalButton = document.getElementById('legalButton');
if (legalButton) {
  legalButton.addEventListener('click', () => {
    window.open('https://badidol.de/?imprint', '_blank');
  });
} else {
  if (debug) {console.warn("Imprint button not found in the DOM.")};
}

// Add this after other event listeners
document.getElementById('backgroundStoryButton').addEventListener('click', () => {
  const backgroundStory = `
    In the year 2045, the world as we knew it crumbled. A devastating combination of climate collapse, resource wars, and a global pandemic left civilization in ruins. The skies turned gray with ash, and the earth became a wasteland where only the strongest—or the most cunning—could survive.\n
    You are one of the few who endured. Leading a small group of survivors, you’ve found a patch of land to call your own. But survival isn’t guaranteed. Food is scarce, water is precious, and the remnants of technology are both a blessing and a curse. Scavengers roam the wastes, and sickness spreads easily in close quarters.\n
    Your task is to rebuild, to create a community that can thrive against all odds. Gather resources, build shelters, and protect your people from the harsh realities of this new world. Every decision matters—will you focus on food production, or secure enough medicine to fend off disease? Will you harness the power of electricity, or conserve your precious wood for warmth?\n
    The wasteland is unforgiving, but you are determined. Can you lead your community to a new dawn, or will you become just another forgotten story in the ashes of the old world?
  `;
  showNotification(backgroundStory, 'large');
});

// Load saved game
loadGame();

// Start game loop
setInterval(tick, TICK_RATE);

// Auto-save every minute
setInterval(saveGame, 1000);

// refresh weather and location once every 5 minutes
setInterval(fetchApi, 300000);

// refresh page every 15 minutes
setInterval(location.reload, 900000);
