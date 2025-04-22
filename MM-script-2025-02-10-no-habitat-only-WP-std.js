// 02/06/2025
// Does not include Dreissena or Cladocera, only includes White Perch
// Only WP values are standardized, all other values are not standardized
// Changed WP values from 0, 0.1, -0.1, ??? to 0, -0.1, -0.2, -0.3
// Changed Nutrient values from ???, ???, ???, ??? to 0, -0.1, -0.25, -0.4
// Provided a shortened label for each set of values
// Now prints a combination label in addition to a label for each set of values in it's own column
// Warmer Winters being moved to the end of the list of the components is causing a null exception whenever RCP is used...need to add a case to add to the end of the list if it is missing the ending component


async function runScenarios() {
  // CENTRAL BASIN FEATURES
  let DATA_IDS = {
    NON_WINTER_WARMING: '112881878932',
    PRECIPITATION: '174521164315',
    WATER_LEVELS: '135326197537',
    STORM_EVENTS: '145479303135',
    ALT_WINDS: '192323728300',
    WARMER_WINTERS: '188616518325',
    NUTRIENT_ENRICHMENT: '165323868909',
    WHITE_PERCH: '183073348384',
    WAE_HARVESTING: '122174299204'
  }

  // WEST BASIN FEATURES
  /*
  let DATA_IDS = {
    NON_WINTER_WARMING: '4',
    PRECIPITATION: '1',
    WATER_LEVELS: '0',
    STORM_EVENTS: '15',
    ALT_WINDS: '16',
    WARMER_WINTERS: '17',
    WAE_HARVESTING: '37',
    NUTRIENT_ENRICHMENT: '3',
    WHITE_PERCH: '39',
    DREISSENA: '11',
    CLADOCERA: '33'
  }
  */

  const EVENTS = { INPUT: new Event("input", {bubbles: true, cancelable: false, composed: true}) };

  const sleep = m => new Promise(r => setTimeout(r, m));

  let WALLEYE = [
    { short: 'W0', label: 'Walleye_0', inputValues: [{ dataId: DATA_IDS.WAE_HARVESTING, value: '0' }] },
    { short: 'WL', label: 'Walleye_L', inputValues: [{ dataId: DATA_IDS.WAE_HARVESTING, value: '0.1' }] },
    { short: 'WM', label: 'Walleye_M', inputValues: [{ dataId: DATA_IDS.WAE_HARVESTING, value: '0.2' }] },
    { short: 'WH', label: 'Walleye_H', inputValues: [{ dataId: DATA_IDS.WAE_HARVESTING, value: '0.3' }] }
  ]
  let RCP = [
    { short: 'C0', label: 'Climate_0', inputValues: [
        { dataId: DATA_IDS.NON_WINTER_WARMING, value: '0' },
        { dataId: DATA_IDS.PRECIPITATION, value: '0' },
        { dataId: DATA_IDS.WATER_LEVELS, value: '0' },
        { dataId: DATA_IDS.STORM_EVENTS, value: '0' },
        { dataId: DATA_IDS.ALT_WINDS, value: '0' },
        { dataId: DATA_IDS.WARMER_WINTERS, value: '0' }
      ]
    },
    { short: 'C2.5', label: 'Climate_2.5', inputValues: [
        { dataId: DATA_IDS.NON_WINTER_WARMING, value: '0.05' },
        { dataId: DATA_IDS.PRECIPITATION, value: '0.01' },
        { dataId: DATA_IDS.WATER_LEVELS, value: '0' },
        { dataId: DATA_IDS.STORM_EVENTS, value: '0.01' },
        { dataId: DATA_IDS.ALT_WINDS, value: '-0.02' },
        { dataId: DATA_IDS.WARMER_WINTERS, value: '0.02' }
      ]
    },
    { short: 'C4.5', label: 'Climate_4.5', inputValues: [
        { dataId: DATA_IDS.NON_WINTER_WARMING, value: '0.1' },
        { dataId: DATA_IDS.PRECIPITATION, value: '0.04' },
        { dataId: DATA_IDS.WATER_LEVELS, value: '0' },
        { dataId: DATA_IDS.STORM_EVENTS, value: '0.04' },
        { dataId: DATA_IDS.ALT_WINDS, value: '-0.02' },
        { dataId: DATA_IDS.WARMER_WINTERS, value: '0.03' }
      ] 
    },
    { short: 'C8.5', label: 'Climate_8.5', inputValues: [
        { dataId: DATA_IDS.NON_WINTER_WARMING, value: '0.15' },
        { dataId: DATA_IDS.PRECIPITATION, value: '0.07' },
        { dataId: DATA_IDS.WATER_LEVELS, value: '0.01' },
        { dataId: DATA_IDS.STORM_EVENTS, value: '0.07' },
        { dataId: DATA_IDS.ALT_WINDS, value: '-0.03' },
        { dataId: DATA_IDS.WARMER_WINTERS, value: '0.04' }
      ] 
    }
  ]
  let NUTRIENT_MGMT = [
    { short: 'N0', label: 'Nutrient_0', inputValues: [{ dataId: DATA_IDS.NUTRIENT_ENRICHMENT, value: '0' }] },
    { short: 'NL', label: 'Nutrient_L', inputValues: [{ dataId: DATA_IDS.NUTRIENT_ENRICHMENT, value: '-0.1' }] },
    { short: 'NM', label: 'Nutrient_M', inputValues: [{ dataId: DATA_IDS.NUTRIENT_ENRICHMENT, value: '-0.25' }] },
    { short: 'NH', label: 'Nutrient_H', inputValues: [{ dataId: DATA_IDS.NUTRIENT_ENRICHMENT, value: '-0.4' }] }
  ]
  let INVASIVES = [
    { short: 'WP0', label: 'WhitePerch_0', inputValues: [{ dataId: DATA_IDS.WHITE_PERCH, value: '0' }] },
    { short: 'WPL', label: 'WhitePerch_L', inputValues: [{ dataId: DATA_IDS.WHITE_PERCH, value: '-0.1' }] },
    { short: 'WPM', label: 'WhitePerch_M', inputValues: [{ dataId: DATA_IDS.WHITE_PERCH, value: '-0.2' }] },
    { short: 'WPH', label: 'WhitePerch_H', inputValues: [{ dataId: DATA_IDS.WHITE_PERCH, value: '-0.3' }] }
  ]

  let scenarioOutputs = [];
  let scenarioOutputStrings = [];
  let allComponentLabels = [];
  document.querySelector('g[class="barlabels"]').__data__.forEach(d => allComponentLabels.push(d[0]));
  let scenarioRunCount = 1;
  let i = 0;
  let j = 0;
  let k = 0;
  let l = 0;
  let m = 0;
  let n = 0;
  let inputDataList = [];
  let inputs = [];
  let labels = '';
  let table = null;
  for (i = 0; i < INVASIVES.length; i++) {
    for (j = 0; j < NUTRIENT_MGMT.length; j++) {
      for (k = 0; k < RCP.length; k++) {
        for (n = 0; n < WALLEYE.length; n++) {
          table = document.getElementById('scenarioTable');
          inputDataList = [];
          inputDataList = [ ...INVASIVES[i].inputValues, ...NUTRIENT_MGMT[j].inputValues, ...RCP[k].inputValues, ...WALLEYE[n].inputValues ];
          inputs = [];
        
          for (l = 0; l < inputDataList.length; l++) {
            inputs.push(table.querySelector(`tr[data-id="${inputDataList[l].dataId}"]`).querySelector('[class="input"]'));
            inputs[l].value = inputDataList[l].value;
          }
          for (m = 0; m < inputs.length; m++) {
            inputs[m].dispatchEvent(EVENTS.INPUT);
          }
          await sleep(2000);
          scenarioOutputs.push({
            labels: `${INVASIVES[i].short}_${NUTRIENT_MGMT[j].short}_${RCP[k].short}_${WALLEYE[n].short},${INVASIVES[i].label},${NUTRIENT_MGMT[j].label},${RCP[k].label},${WALLEYE[n].label}`,
            outputValues: document.querySelector('g[class="barlabels"]').__data__
          });
          if (scenarioRunCount % 25 === 0) {
            console.log(`[STATUS]: ${scenarioRunCount} scenarios have been run`);
          }
          scenarioRunCount++;
        }
      }
    }
  }
  labels = '';
  allComponentLabels.forEach(label => { labels = `${labels}${label},` });
  labels = labels.slice(0, -1); // remove extra comma
  scenarioOutputStrings.push(labels);
  let scenarioOutputString = '';
  console.log(`[RESULTS]: scenarioOutputs.length=${scenarioOutputs.length}`)
  for (let i = 0; i < scenarioOutputs.length; i++) {
    console.log(`i=${i}`)
    console.log(`outputValues.length (BEFORE)=${scenarioOutputs[i].outputValues.length}`)
    scenarioOutputString = `${scenarioOutputs[i].labels}`;
    for (let j = 0; j < allComponentLabels.length; j++) {
      console.log(`j=${j}`)
      console.log(`${allComponentLabels[j]} !== ${scenarioOutputs[i].outputValues[j][0]}`)
      if (allComponentLabels[j] !== scenarioOutputs[i].outputValues[j][0]) {
        scenarioOutputs[i].outputValues.splice(j, 0, [allComponentLabels[j], 0]);
      }
      console.log(`outputValues.length (AFTER)=${scenarioOutputs[i].outputValues.length}`)
      scenarioOutputString = `${scenarioOutputString},${scenarioOutputs[i].outputValues[j][1]}`;
    }
    scenarioOutputStrings.push(scenarioOutputString);
  }
  console.log('[RESULTS]: scenarioOutputStrings');
  console.log(scenarioOutputStrings);
}