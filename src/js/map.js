var map;
var directionsManager;
var current;
var ev_charger_pins, infobox;
var ev_private_charger_pins;
var ev_chargers;
var private_ev_chargers = JSON.parse(window.localStorage.getItem("firebase"));
var lat, lon;

var distance;
var carbonCar = 0;

var circle_ev_length = 0.7;
var circle_ev_color = " rgba(0,191,0,0.07)";
var circle_ev = [];

var circle_ev_length_private = 0.7;
var circle_ev_color_private = " rgba(6,138,249,0.07)";
var circle_ev_private = [];

var base64Image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfnAxYOKycso5YBAAAJeklEQVRYw62YeWxUxx3HPzPv7eW1d/fZu76dEB8k+ALcAi0VZ7EVJyBQBE5DDA6goqhKmkgVIpCAlVASSktTiVKJSw2lUNHNBSqFhqN1KUppTUjcohSQQoMgDgEv3lBf6903/WPXDj7W7Jr8pNHu2/nNm8985zezvxmNUdjKlSuprKwkMzOTzMxMbDYbhmGQnp6OYRgYhoHX66W4uJipU6dy7tw5NE2jqalpNN0BoCXjvHnzZjRNo6WlhWPHjnHw4EHt7NmzrmAw6JNSZmmalq1pmlfXdY/D4bAXFhYqv98feu211zBNk9raWpqbm0cFKhJxmj9/PrW1tezcuZPm5maqqqq8Fy5cKAUqdV1/KBKJ5Akh3EIIO6CUUt1KqVtCiKumaZ53OBxn58yZc8Hv93csWLCAnp4eDh8+nBSoPlJlQ0MDVquVc+fOYRiGCAQCGU6nc7ppmnNDodAk0zQLANdIAxZCtPf09HzyzjvvnHa5XAdDodD7Vqu1EyAYDLJixQrefPPNUakMQH19Pdu2bQNg/Pjx1pycnEl2u/1XQohPhBC9gEqyhKSUFx0Ox6sFBQUlJ0+eFHl5eRw4cGD0kA0NDVy+fBmAqqoqZ2pqap2maaeFEF2jABxcuiwWy5+8Xu/MjRs3avn5+cydOzd5yEWLFqGU6lMy1el0LpdSngciXwNkX4lomtZsGMYjGzdu1JYvX059fX1yoEop0tPTqaystDudznop5cejgslG8T0UeXF9TCHEB2lpad9VSom33nqLxsbGxCAXL17MpEmT2LBhg8zMzJytado/RgWZgeKnKP6O4hcosuLD6rp+bMyYMRUAW7ZsSQy0L1ZKSkrus9ls+4HkF40Hxeso/oriz7HPsvj+Qogep9P5enV1tauioiLxqR87dqzF6XSulFLeTBrSF1OwKQbZhOJdFEUjt9N1/XJWVtY8gNWrV48cAo2NjSilqKysfEDTtPdIZPE8hKIKRX7seQmKEyj+ElPybRRTEhuk2+3eMW3atIySkpL+xXyn9W/4TqeTZ555Rra1tX1bKTUBkCNK/y3gBcALnAdeBfYCNmApcBP4GXAmsZns6OiYdfHixdLr16+fWrp0aXzQq1evEg6HncFgcIZSyjPiW78D/AhIJxrFZcCaGOwu4Abw+TCQBcD8mIZvA61fVUUikfvD4fA3Fy1adKalpSU0uMv+pCQtLY22traCTz/99PvhcPiBEUEXAlNikAAmkA2UAh8A/wSuDWqTBbwEzAEqgCLgfaB7AMvN1tbWE4FAoMvlctHR0dFf2T+9165do7W1NTcSiWTFBRTAo0A1MHjMYeBB4BUgZxjIV2LKh2K+eYB1oFskEimxWCxp7e3tLF++fEDdgDhUSmUAzrig5cBzQEps+gabCRQDPwby7xjci8C4WL1GNCwagS+GvMFrt9tTAW7fvj08aGylOYUQlrigKqaCIr6ZQAmwDrg/5tsSU1EnGhKvAv8e2jQSiTiILkfC4fDwoEKIvvEPn7I5gUfuAtnfI9F4XROD3QXsB64APwE+iqODUkL0gYiBGANAhRChWDdDzQXUJADZZ2GiMbmWaDzuATYAH8ZvEksfIwBSDtwd+5/sdjt2u70d6ImrUjAJ0D7YcUQXkhf4z8juUsr2cDjcBdDb2zuwru+Lz+fD6/W2CiGGx/kC2EKCh5dBAywG1gOWkV1tNttVKeXt4er6N/y8vDx6e3s/s1gsV0KhULlSaihSsoreae67D8ntdp8vKyv70uv1xp/6oqIiPB5Pu8vl+psQonvIa6xEYzSRxTScqkeJF/1RxXQ9IKVsXrduXafP52P79u3Dg4ZCIbZu3RrJ8HqP6xbLwP8VC/BDYMEoIBWwm2geYMZ3czgcH7lcro8mT55slpaWDqnv/wvtuxyoKC8PdnV1PfC/27er+gfyPDBvGDWH28xErFWE6LLcA/xu5JmQUrZ7PJ5fL1u27D2LxRLeu3fvUJ87H5544gmOHz/ekZGe/lur1Xqpv6KQoVcVEvgMuE400vvK58BV4AiwGPj9yEoCymq1nnE6nX9cv3599+zZs4dN8waAlpaWUlJSgs/n+9Dtdu/UNO1LIJrGhe9QT4/99jywGjgdK6eAVUAD8Dpwi68SlzhmsVgup6en/6a+vv7i3LlzOXr06JDNfljbsWMHAFVVVbkej2eHlLIHieLpWMb+PoqtKHLv/TSqadpNwzAaa2pqjJqaGhYuXHh3wD5rbGzsj9fJkyePdbvd+6WQ3VhQ1KKYj+K+e4eUUra5XK6fV1RU5CdON8jWrFmD3+8HYMKECSWpqalvCCE67xXuDsjPU1NTN5WVld0HsG3btsSPyoPt2WefZfPmzQCUl5fnezyeX2qa1n6vkLquXzEMY01lZWU2wMSJE1m5cuWoRQWiVzsrVqwAYMqUKT6v19uo6/pno4Q0LRbL+aysrB88/PDDBsDUqVPvDXCwrVq1ipSUFKZPn56Wm5v7tN1uv5gMpBCi12q1ns7Ozq577LHHnKtXrwZIarplIk7BYJDOzk6CweDthoaGN/Lz819wOBxnuNsOCQghOu12+x+8Xu9LCxcufNc0zQ6rNXoGefnll79eRQFOnjxJQUEBTz31FM3NzVpxcfHUlJSUQ1LKnnhKapoWMAxje2FhYcWlS5dETU0NS5YsGVX/CV2N79u3jyNHjuD3+9E0TeTm5trmzZvX5fP5bkopH7xx40ZOKBTq36WFEGRnZ4enTZt26sknn9y9bt26C4FAILJ27dqIy+Vi2bJl7NmzJynQhLLLffv2sXjxYg4fPpyakZExyWq1zlZKfUMIcf+tW7fyDh065PL7/aK1tRUpJWPHjqWuro6ZM2cGXS7XFeC/3d3dp3p7e0+EQqF/CSF6a2qSOS7c5Wr8ToWEEDQ1NU3Qdf1npmmOF0JoSikMw6Curo7MzEz8fj8ul4vHH3+ciRMnYrPZ3ERP8RU2m+1Rm812XCn1HHfN9e8BVCnFiRMnbpim+YGu64ZSKhewKaVwOBxUV1dTWFiI1WqloKAATeuPKgV0CCGuAC0Wi6U7kT5HBQqwa9cuNm3adHH37t0vOhyO/ZFIpFwIMUYIkWmaplcIkVJUVCSVUpimGTZNs1MIcQO4LoS4bJrmeaXUx0ePHm1LS0tLGjThE9CBAwcIBAKMGzeOGTNmsH//fktOTo5D13WbaZq2WCgIpRRSSlMIEVFK9UQikR6ge9asWb2nT58mEAggpUz63v7/NGAb0tFSNXwAAAAOZVhJZk1NACoAAAAIAAAAAAAAANJTkwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMy0yMlQxNDo0MzozMiswMDowMNpmrRQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDMtMjJUMTQ6NDM6MzIrMDA6MDCrOxWoAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAzLTIyVDE0OjQzOjM5KzAwOjAw/ilgjQAAAABJRU5ErkJggg==";
var base64Image_private =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAMAAABE+WOeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcQEBAQAAAAEBAQAAAAEBAQICAgEBAQAAAAAHDgAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQWK+QAAAAJLiQEzXAR31wNcpwSB6QEaMARsxPLaOB8AAAASdFJOUwA+6xm5Tgspx/7abnqiq2OOmuB1554AAAGRSURBVEjH1ZXZkoQgDEVbFhERVHD//w8dcUHAuPRLV02etDwxuSEkn8+vDbPVcPoGpkWtiDUl64Kye5rROkPGGcqUSK7plFaZiQwpcRUDlwSZs+UVHAKLzICGJOSQljHeNuPmUAMOlMR4p3u+OVQnDaxGJ1zrcdcg4rMocwB3vFFRRkxCeMvNRQB6iOVd1xveWNz7gQoUpMWR/TCTvTFNgJuMXqSjF+u9924pUeEnxFwx+crrZnu10Sb7JP2Ekj395fvqwBctLhgB+U5r32E6cssSqDwebx36QwrIj4MOHRqnPCjQns+kdezgCpo886toiN/q2Q6xg+OD+jAF6F3MBQjqj6snPjzfvZ2bOJ8W7p9NwDUe9eecELrF8yK6YPbE+ojmXvvHNx7PN2DlBz4uled+95fnUSjXdtHABMpECg+UaRigCVfgVwPrFrcO5BvczmeFgNzx9USnEn2Dz+dcBXOOk/JhKbEi95cFfdxhWDjVqKYvNt5cJn67WGDViAj2dgMzIVVF0/crO5239ed/2B8d9UutG4p52wAAAABJRU5ErkJggg==";

function form_select() {
  if (document.getElementById("form_sel").value == "transit") {
    document.getElementById("ev_select").style.display = "none";
    document.getElementById("ev_select1").style.display = "none";
  } else {
    document.getElementById("ev_select").style.display = "block";
    document.getElementById("ev_select1").style.display = "block";
  }
}

function responsive() {
  if (document.getElementById("checkm").checked) {
    document.getElementById("squish").style.display = "none";
    document.getElementById("squish1").style.display = "none";
  } else {
    document.getElementById("squish").style.display = "block";
    document.getElementById("squish1").style.display = "block";
  }
}

function evSwitch() {
  if (document.getElementById("switch").checked) {
    document.getElementById("direc_emmis").style.display = "none";
    document.getElementById("fair_price").style.display = "none";
    document.getElementById("ev_chargers").style.display = "block";
    document.getElementById("ev_chargers_private").style.display = "block";
  } else {
    document.getElementById("direc_emmis").style.display = "block";
    document.getElementById("fair_price").style.display = "block";
    document.getElementById("ev_chargers").style.display = "none";
    document.getElementById("ev_chargers_private").style.display = "none";
    map.layers.remove(ev_charger_pins);
    for (let i = 0; i < circle_ev.length; i++) {
      map.entities.remove(circle_ev[i]);
    }
    document.getElementById("switch1").checked = false;
  }
}

function charger() {
  if (document.getElementById("switch1").checked) {
    map.layers.insert(ev_charger_pins);

    for (let i = 0; i < circle_ev.length; i++) {
      map.entities.push(circle_ev[i]);
    }
  } else {
    map.layers.remove(ev_charger_pins);
    for (let i = 0; i < circle_ev.length; i++) {
      map.entities.remove(circle_ev[i]);
    }
  }
}

function charger_private() {
  if (document.getElementById("switch2").checked) {
    map.layers.insert(ev_private_charger_pins);

    for (let i = 0; i < circle_ev_private.length; i++) {
      map.entities.push(circle_ev_private[i]);
    }
  } else {
    map.layers.remove(ev_private_charger_pins);

    for (let i = 0; i < circle_ev_private.length; i++) {
      map.entities.remove(circle_ev_private[i]);
    }
  }
}

var sampleStyle = {
  elements: {
    park: { fillColor: "#a9de83" },
    controlledAccessHighway: {
      fillColor: "#9fb6bd",
      strokeColor: "#D3B300",
      labelColor: "#444444",
      labelOutlineColor: "#60ffffff",
    },
    highway: {
      fillColor: "#c1d1d6",
      strokeColor: "#fde293",
      labelColor: "#444444",
      labelOutlineColor: "#60ffffff",
    },
    water: { fillColor: "#a6cbe3" },
    medicalBuilding: { fillColor: "#fceced" },
    majorRoad: { fillColor: "#fde293" },
    education: { fillColor: "#f0e8f8" },
    arterialRoad: { fillColor: "#ffffff" },
    structure: { fillColor: "#faf8ed" },
    buildinglobal: { fillColor: "#dde2e3" },
    forest: { fillColor: "#b3debf" },
    vegetation: { fillColor: "#b3debf" },
    reserve: { fillColor: "#b3debf" },
    street: { fillColor: "#ffffff", strokeColor: "#e6e3df" },
    roadShield: { fillColor: "#ffffff" },
    medical: { fillColor: "#ffddee" },
    educationBuildinglobal: { fillColor: "#f6f0f1" },
    golfCourse: { fillColor: "#b3debf" },
  },
  settings: { landColor: "#e8eaed" },
  version: "1.0",
  extensions: {},
};

function GetMap() {
  map = new Microsoft.Maps.Map("#myMap", {
    showDashboard: false,
    customMapStyle: sampleStyle,
  });

  navigator.geolocation.getCurrentPosition(function (position) {
    current = position.coords.latitude + "," + position.coords.longitude;

    var center = map.getCenter();
    lat = center.latitude;
    lon = center.longitude;

    link =
      "https://api.tomtom.com/search/2/categorySearch/EV%20chargers.json?limit=1000&lat=" +
      lat +
      "&lon=" +
      lon +
      "&categorySet=7309&key=vy4XZo3nOafLfepP4LVXYw6GbPkyjQL8";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", link);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        ev_chargers = xhr.response;

        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
          visible: false,
        });
        infobox.setMap(map);

        Microsoft.Maps.loadModule("Microsoft.Maps.Clustering", function () {
          ev_charger_pins = new Microsoft.Maps.ClusterLayer(charger_puspins(), {
            clusteredPinCallback: createCustomClusterPushpins,
            callback: createPushpinList,
          });
          ev_private_charger_pins = new Microsoft.Maps.ClusterLayer(
            charger_private_puspins(),
            {
              clusteredPinCallback: createCustomClusterPushpins_private,
              callback: createPushpinList,
            }
          );

          Microsoft.Maps.Events.addHandler(
            ev_charger_pins,
            "click",
            pushpinClicked
          );
          Microsoft.Maps.Events.addHandler(
            ev_private_charger_pins,
            "click",
            pushpinClicked
          );
        });

        Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", function () {
          var pos = map.getCenter();

          pos.latitude = ev_chargers.results[0].position.lat;
          pos.longitude = ev_chargers.results[0].position.lon;

          for (let i = 0; i < ev_chargers.results.length; i++) {
            pos.latitude = ev_chargers.results[i].position.lat;
            pos.longitude = ev_chargers.results[i].position.lon;

            circle_ev[i] = createCircle(pos, circle_ev_length, circle_ev_color);
          }
          for (let i = 0; i < private_ev_chargers.length; i++) {
            pos.latitude = private_ev_chargers[i].latitude;
            pos.longitude = private_ev_chargers[i].longitude;

            circle_ev_private[i] = createCircle(
              pos,
              circle_ev_length_private,
              circle_ev_color_private
            );
          }
        });
      } else {
      }
    };
  });

  Microsoft.Maps.loadModule("Microsoft.Maps.Directions", function () {
    directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

    directionsManager.setRenderOptions({
      itineraryContainer: "#directionsItinerary",
    });

    directionsManager.showInputPanel("directionsPanel");
    Microsoft.Maps.Events.addHandler(
      directionsManager,
      "directionsUpdated",
      directionsUpdated
    );

    Microsoft.Maps.loadModule(
      ["Microsoft.Maps.SpatialMath", "Microsoft.Maps.Contour"],
      function () {
        var center = map.getCenter();

        var layer = new Microsoft.Maps.ContourLayer(circle_ev, {
          colorCallback: function (val) {
            return val;
          },
          polygonOptions: {
            strokeThickness: 0,
          },
        });
        map.layers.insert(layer);
      }
    );
  });
}

function directionsUpdated(e) {
  var start = document.querySelector('[title="From"]').value;
  var to = document.querySelector('[title="To"]').value;

  if (start == "My location") {
    start = current;
  }
  if (to == "My location") {
    to = current;
  }

  var req =
    "https://dev.virtualearth.net/REST/V1/Routes/Transit?wp.0=" +
    encodeURIComponent(start) +
    "&wp.1=" +
    encodeURIComponent(to) +
    "&output=json&key=" +
    "Air9YbvoUA261gpBQWR8mNCXLKboJFf9-h0ICic9y_0doZEzKkU5hLZ-PMtP0JWb";
  CallRestService(req, GeocodeCallback);

  var routeIdx = directionsManager.getRequestOptions().routeIndex;
  var routeMode = directionsManager.getRequestOptions().routeMode;

  distance = Math.round(e.routeSummary[routeIdx].distance * 100) / 100;

  var units = directionsManager.getRequestOptions().distanceUnit;
  var distanceUnits = "";

  if (units == Microsoft.Maps.Directions.DistanceUnit.km) {
    distanceUnits = "km";
  } else {
    distanceUnits = "miles";
  }

  carbonCar = carbonCalculate(1, distance);

  var time = Math.round(e.routeSummary[routeIdx].timeWithTraffic / 60);

  var carbon_element = document.getElementById("carbon");
  carbon_element.innerHTML = carbonCar + " kg of CO2 for fuel driven car and ";

  if (routeMode == 1) {
    var price_element = document.getElementById("fp1");

    if (distance > 55) {
      price_element.innerHTML = "distance to large";
    } else {
      price_element.innerHTML =
        "₹" +
        calculatefpev(distance) +
        " for an EV taxi with 0 carbon emmisions";
    }
  }
}

function GeocodeCallback(response) {
  var carb = 0.0;
  var price = 0.0;

  var items = response.resourceSets[0].resources[0].routeLegs[0].itineraryItems;
  for (let i = 0; i < items.length; i++) {
    if (items[i].iconType == "Walk") {
      carb += carbonCalculate(3, items[i].travelDistance);
    } else if (items[i].iconType == "Train") {
      carb += carbonCalculate(2, items[i].travelDistance);

      if (items[i].travelDistance <= 2) {
        price += 10;
      } else if (items[i].travelDistance <= 5) {
        price += 20;
      } else if (items[i].travelDistance <= 12) {
        price += 30;
      } else if (items[i].travelDistance <= 21) {
        price += 40;
      } else if (items[i].travelDistance <= 32) {
        price += 50;
      } else if (items[i].travelDistance > 32) {
        price += 60;
      }
    } else if (items[i].iconType == "Bus") {
      carb += carbonCalculate(4, items[i].travelDistance);

      if (items[i].travelDistance <= 4) {
        price += 10;
      } else if (items[i].travelDistance <= 8) {
        price += 15;
      } else if (items[i].travelDistance <= 12) {
        price += 20;
      } else if (items[i].travelDistance > 12) {
        price += 25;
      }
    }
  }

  var carbon_element = document.getElementById("carbon");
  carbon_element.innerHTML +=
    Math.round(carb * 100) / 100 +
    " kg of CO2 for public transit.<br><b>" +
    Math.round((1 - carb / carbonCar) * 100) +
    "% CO2 savings</b>";

  var price_element = document.getElementById("fp");

  if (directionsManager.getRequestOptions().routeMode == 1) {
    var percent = Math.round((1 - price / calculatefpev(distance)) * 100);
    price_element.innerHTML =
      "₹" +
      Math.round(price * 100) / 100 +
      " for public transit.<br><b>" +
      percent +
      "% Fare savings</b>";
  } else {
    price_element.innerHTML =
      "₹" + Math.round(price * 100) / 100 + " for public transit.";
  }
}

function carbonCalculate(e, d) {
  var multi;
  switch (e) {
    case 1:
      multi = 121 * d;
      break;
    case 2:
      multi = 7.837 * d;
      break;
    case 3:
      multi = 0 * d;
      break;
    case 4:
      multi = 12 * d;
      break;
  }

  return Math.round(multi / 10) / 100;
}

function calculatefpev(d) {
  if (d <= 5) {
    return 149;
  } else if (d <= 10) {
    return 199;
  } else if (d <= 15) {
    return 259;
  } else if (d <= 20) {
    return 349;
  } else if (d <= 25) {
    return 449;
  } else if (d <= 30) {
    return 549;
  } else if (d <= 35) {
    return 599;
  } else if (d <= 40) {
    return 699;
  } else if (d <= 45) {
    return 749;
  } else if (d <= 50) {
    return 799;
  }
}

function createCircle(center, radius, color) {
  var locs = Microsoft.Maps.SpatialMath.getRegularPolygon(
    center,
    radius,
    36,
    Microsoft.Maps.SpatialMath.DistanceUnits.Miles
  );
  return new Microsoft.Maps.Polygon(locs, {
    fillColor: color,
    strokeThickness: 0,
  });
}

function charger_puspins() {
  var pins = Microsoft.Maps.TestDataGenerator.getPushpins(
    ev_chargers.results.length,
    map.getBounds()
  );
  var pos = map.getCenter();

  for (let i = 0; i < ev_chargers.results.length; i++) {
    pos.latitude = ev_chargers.results[i].position.lat;
    pos.longitude = ev_chargers.results[i].position.lon;

    pins[i] = new Microsoft.Maps.Pushpin(pos, {
      title: ev_chargers.results[i].poi.name,
      subTitle: "",
      icon: base64Image,
    });
    pins[i].metadata = {
      title: ev_chargers.results[i].poi.name,
      description: ev_chargers.results[i].address.streetName,
    };
  }

  return pins;
}

function charger_private_puspins() {
  var pins = Microsoft.Maps.TestDataGenerator.getPushpins(
    private_ev_chargers,
    map.getBounds()
  );
  var pos = map.getCenter();

  for (let i = 0; i < private_ev_chargers.length; i++) {
    pos.latitude = private_ev_chargers[i].latitude;
    pos.longitude = private_ev_chargers[i].longitude;

    pins[i] = new Microsoft.Maps.Pushpin(pos, {
      title: private_ev_chargers[i].name,
      subTitle: "",
      icon: base64Image_private,
    });
    pins[i].metadata = {
      title: private_ev_chargers[i].name,
      description: private_ev_chargers[i].address,
    };
  }
  console.log(pins);
  return pins;
}

function createCustomClusterPushpins(cluster) {
  cluster.setOptions({
    title:
      "Cluster of " +
      cluster.containedPushpins.length +
      " EV charging stations",
    icon: base64Image,
    textOffset: new Microsoft.Maps.Point(-2, 12),
  });
}

function createCustomClusterPushpins_private(cluster) {
  cluster.setOptions({
    title:
      "Cluster of " +
      cluster.containedPushpins.length +
      " EV charging stations",
    icon: base64Image_private,
    textOffset: new Microsoft.Maps.Point(-2, 12),
  });
}

function pushpinClicked(e) {
  if (e.target.metadata) {
    infobox.setOptions({
      location: e.target.getLocation(),
      title: e.target.metadata.title,
      description: e.target.metadata.description,
      visible: true,
    });
  }
}

function createPushpinList() {
  if (ev_charger_pins != null) {
    infobox.setOptions({ visible: false });
    var data = ev_charger_pins.getDisplayedPushpins();
    var output = [];
    for (var i = 0; i < data.length; i++) {
      output.push(
        "<a href='javascript:void(0);' onclick='showInfoboxByGridKey(",
        data[i].gridKey,
        ");'>"
      );
      output.push(data[i].getTitle(), "</a><br/>");
    }
  }
}

function showInfoboxByGridKey(gridKey) {
  var clusterPin = ev_charger_pins.getClusterPushpinByGridKey(gridKey);
  showInfobox(clusterPin);
}

function CallRestService(request, callback) {
  $.ajax({
    url: request,
    dataType: "jsonp",
    jsonp: "jsonp",
    success: function (r) {
      callback(r);
    },
    error: function (e) {
      alert(e.statusText);
    },
  });
}
