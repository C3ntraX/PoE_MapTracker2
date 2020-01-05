"use strict";

// import PathOfExileLog from "poe-log-monitor";
// import ioHook from "iohook";
// import { getTextFromMapInfo } from "./captureScreen.js";
// import Eventemitter from "eventemitter3";

let PathOfExileLog = require("poe-log-monitor");
let ioHook = require("iohook");
let getTextFromMapInfo = require("./captureScreen.js");
let Eventemitter = require("eventemitter3");

// init
let mapShown = true;
let areaIndex;
let areaFromClient;
let isRunning = false;
// Area history
let areas = [];

function isHideout(name) {
  return name.toLowerCase().includes("hideout");
}
function isCity(name) {
  // TODO Mysql Request! Map => Atlasmap ?
  if (
    name == "Lioneye's Watch" ||
    name == "The Forest Encampment" ||
    name == "The Sarn Encampment" ||
    name == "Highgate" ||
    name == "Overseer's Tower" ||
    name == "The Bridge Encampment" ||
    name == "Oriath Docks" ||
    name == "Oriath" ||
    name == "Karui Shores"
  ) {
    return true;
  } else {
    return false;
  }
}

var poeLog = new PathOfExileLog({
  logfile: "C:/SteamLibrary/steamapps/common/Path of Exile/logs/Client.txt",
  interval: 1000
});

async function getInfo() {
  console.log(
    "getInfo() " +
      !areaFromClient.isCity +
      " && " +
      !areaFromClient.isHideout +
      " && " +
      !areaFromClient.isFinished
  );
  if (
    !areaFromClient.isCity &&
    !areaFromClient.isHideout &&
    !areaFromClient.isFinished
  ) {
    return await loop(areaIndex, areaFromClient);
  } else {
    return areaFromClient;
  }
}

var obj = new Eventemitter();

module.export = obj;

async function getCurrentMap() {
  poeLog.on("area", async function(areaJoined) {
    console.log("Area switched: " + areaJoined.name);

    let area = {
      name: areaJoined.name,
      isHideout: isHideout(areaJoined.name),
      isCity: isCity(areaJoined.name),
      monsterlevel: undefined,
      mapTier: undefined,
      isFinished: false
    };

    areas.push(area);

    // Last area
    areaIndex = areas.length;
    areaFromClient = areas[areaIndex - 1];

    let result = await getInfo();

    obj.emit("mapChange", result);
  });
}

function gotAllInformation(client, image) {
  console.log(
    "gotAllInformation() " +
      (image.monsterlevel !== undefined) +
      " && " +
      (image.mapTier !== undefined) +
      " && " +
      image.couldReadMonsterlvl
  );
  console.log(
    "Monsterlvl: " + image.monsterlevel + " Maptier:" + image.mapTier
  );
  if (
    image.monsterlevel !== undefined &&
    image.mapTier !== undefined &&
    image.couldReadMonsterlvl
  ) {
    client.monsterlevel = image.monsterlevel;
    client.mapTier = image.mapTier;
    return true;
  } else {
    return false;
  }
}

async function loop(areaIndex, areaFromClient) {
  console.log("loop() " + mapShown + " && " + (areaIndex == areas.length));
  // Current Map?
  if (areaIndex == areas.length) {
    if (mapShown) {
      areaFromClient.isFinished = gotAllInformation(
        areaFromClient,
        await getTextFromMapInfo.getTextFromMapInfo()
      );
      console.log("Iteation: " + !areaFromClient.isFinished);
      if (!areaFromClient.isFinished) {
        isRunning = true;
        setTimeout(function() {
          loop(areaIndex, areaFromClient);
        }, 1000);
      } else {
        console.log(areaFromClient);
        isRunning = false;
        return areaFromClient;
      }
    }
  } else {
    console.log("Iterating false Map!!!");
    return undefined;
  }
}

ioHook.on("keyup", event => {
  // Tab pressed?
  if (event.keycode == 15) {
    console.log("tabl pressed!");
    // Map information shown?
    if (mapShown) {
      mapShown = false;
    } else {
      mapShown = true;
      // Start Iteration again after it stopped automatically
      if (!isRunning) getInfo();
    }
  }
});

// Register and start hook
ioHook.start();

getCurrentMap();
