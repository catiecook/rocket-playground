
export function createLaunchCountByRocketSuccess(launches) {
  let finalLaunchCount = [];
  //sort array
  let launchesSorted = launches.slice().sort((a, b) => a.rocket.rocket_name.localeCompare(b.rocket.rocket_name));

  // temp totals
  let currentTotal = 0;
  let successCount = 0;
  let failureCount = 0;

  // initialize first rocket name
  let currentRocket = launchesSorted[0].rocket.rocket_name;
  for (let i = 0; i < launchesSorted.length - 1; i++) {
    if (launchesSorted[i].rocket.rocket_name === currentRocket) {
      currentTotal++;
      if (launchesSorted[i].launch_success) {
        successCount++;
      } else failureCount++;
    } else {
      finalLaunchCount.push({"name": currentRocket, "totalLaunches": currentTotal, "launchSuccess": successCount, "launchFailure": failureCount});
      currentTotal = 0;
      successCount = 0;
      failureCount = 0;
      currentRocket = launchesSorted[i].rocket.rocket_name;
    }
  }
  return finalLaunchCount;
}

export function calculateYearCount(launches) {
  let yearCount = {};
  for (let i = 0; i < launches.length - 1; i++) {
    let tempObj = {};
    let key = launches[i].launch_year;
    isNaN(yearCount[key]) ? yearCount[key] = 1 : yearCount[key]++;
  }
  return transformYearCount(yearCount);
}

// helper to calculateYearCount()
function transformYearCount(obj) {
  let yearArray = [];
  Object.keys(obj).map(function(key, index) {
    yearArray.push({"year": key, "count": obj[key]});
  });
  return yearArray;
}

export function calculateRocketCosts(rocketData) {
  //sort array
  let sortedRockets = rocketData.slice().sort((a, b) => a.name.localeCompare(b.name));

  let rocketCosts = [];
  for (let i = 0; i < sortedRockets.length; i++) {
    rocketCosts.push({"name": sortedRockets[i].name, "cost": sortedRockets[i].cost_per_launch});
  }
  console.log(rocketCosts);
  return rocketCosts;
}

// helper to calculateCountByCountry()
function transformCountByCountry(obj) {
  let countryArray = [];
  Object.keys(obj).map(function(key, index) {
    countryArray.push({"country": key, "count": obj[key]});
  });
  return countryArray;
}
