/* import screenshot_desktop from "screenshot-desktop";
import sharp from "sharp";
import tessaract from "tesseract.js"; */

let screenshot_desktop = require("screenshot-desktop");
let sharp = require("sharp");
let tessaract = require("tesseract.js");

module.export = async function getTextFromMapInfo() {
  let screenshot = "poe_fullscreen.jpg";
  let extract = "mapinfo.jpg";

  let position = {
    left: 1885,
    top: 70,
    width: 25,
    height: 20
  };

  // First - make Screeshot
  let img = await makeScreenshot(screenshot);
  // Get Position of Mapinfo and cut Image
  extractImage(img, position, extract);
  // Get Text of Mapinfo
  let text = await recognizeText(extract);
  /* let result = validateText(text); */
  let result = validateMonsterlevel(text);
  //console.log("Imageresult 1: "+result)
  return result;
};

async function makeScreenshot(screenshot) {
  let displays = await screenshot_desktop.listDisplays();
  // displays: [{ id, name }, { id, name }]
  return await screenshot_desktop({
    screen: displays[displays.length - 1].id - 1
    //filename: screenshot
  });
}

function extractImage(img, position, extract) {
  sharp(img)
    .extract(position)
    .toFile(extract, function(err) {
      if (err != null) {
        console.error(err);
      }
    });
}

async function recognizeText(extract) {
  return await tessaract
    .recognize(extract, "eng", {
      //logger: m => console.log(m)
    })
    .then(({ data: { text } }) => {
      return text;
    });
}

// For Area+Monsterlvl
function validateText(text) {
  // Attributes
  let isHideout;
  let isCity;
  let name;
  let monsterlevel = "";
  let mapTier = "";
  let couldReadMonsterlvl = false;

  if (text !== undefined) {
    let line = "";
    let lines = [];
    let character = "";
    for (let i = 0; i < text.length; i++) {
      character = text.charAt(i);
      if (character == "\n") {
        lines.push(line);
        line = "";
      } else {
        line += character;
      }
    }

    console.log("Imagelines " + lines);
    if (lines[0] !== undefined) {
      if (lines[0].toLowerCase().includes("hideout")) {
        isHideout = true;
      } else {
        isHideout = false;
      }
      name = lines[0].toLowerCase();
    }

    if (lines[1] !== undefined) {
      character = "";
      monsterlevel = "";
      for (let i = 0; i < lines[1].length; i++) {
        character = lines[1].charAt(i);
        if (/[0-9]/.test(character)) {
          monsterlevel += character;
        }
      }

      if (!isNaN(monsterlevel)) {
        // TODO fehler????
        console.log("monsterlevel: " + monsterlevel);
        couldReadMonsterlvl = true;
        if (monsterlevel >= 68) {
          let ilvl, itier;
          for (ilvl = 68, itier = 1; itier < 16; ilvl++, itier++) {
            if (monsterlevel == ilvl) {
              mapTier = itier;
              break;
            }
          }
        }
        if (mapTier == undefined) {
          isHideout = true;
        }
      } else {
        couldReadMonsterlvl = false;
      }
    }
  }

  return {
    name: name,
    isHideout: isHideout,
    isCity: isCity,
    monsterlevel: monsterlevel,
    mapTier: mapTier,
    couldReadMonsterlvl: couldReadMonsterlvl
  };
}

function validateMonsterlevel(monsterlevel) {
  // Attributes
  let mapTier = "";
  let couldReadMonsterlvl = false;
  if (monsterlevel !== undefined) {
    monsterlevel.replace(/[\n\t\r]/g, "");
    console.log(
      "monsterlevel: " + monsterlevel + " !isNaN:" + !isNaN(monsterlevel)
    );
    if (!isNaN(monsterlevel)) {
      couldReadMonsterlvl = true;
      if (monsterlevel >= 68) {
        let ilvl, itier;
        for (ilvl = 68, itier = 1; itier < 16; ilvl++, itier++) {
          if (monsterlevel == ilvl) {
            mapTier = itier;
            break;
          }
        }
      }
    } else {
      couldReadMonsterlvl = false;
    }
  }

  return {
    monsterlevel: monsterlevel,
    mapTier: mapTier,
    couldReadMonsterlvl: couldReadMonsterlvl
  };
}
