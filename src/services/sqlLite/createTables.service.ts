import { from } from "rxjs";

function isElectron() {
  // @ts-ignore
  return window && window.process && window.process.type;
}

// https://github.com/mapbox/node-sqlite3/issues/1029

export async function createAll() {
  /* if (isElectron()) {
    let iohook = window.require("iohook");
    iohook.on("keyup", event => {
      if (event.keycode === 15) {
        console.log("tab pressed!");
      }
    });

    // Register and start hook
    iohook.start();
  } */
  if (isElectron()) {
    const sqlite3 = require("sqlite3").verbose();
    //const util = require("util");

    var db = new sqlite3.Database("database.SQLITE3");
    //util.promisify(db.get).bind(db);

    db.get(
      "SELECT count(name) FROM sqlite_master WHERE type='table' AND name='atlas_maps'"
    );

    let atlas_maps = {
      map_tier0: "INTEGER",
      map_tier1: "INTEGER",
      map_tier2: "INTEGER",
      map_tier3: "INTEGER",
      map_tier4: "INTEGER",
      region_id: "VARCHAR(45)",
      region_minimum: "INTEGER",
      completed: "BOOLEAN",
      x: "DOUBLE",
      x0: "DOUBLE",
      x1: "DOUBLE",
      x2: "DOUBLE",
      x3: "DOUBLE",
      x4: "DOUBLE",
      y: "DOUBLE",
      y0: "DOUBLE",
      y1: "DOUBLE",
      y2: "DOUBLE",
      y3: "DOUBLE",
      y4: "DOUBLE"
    };
    // 140 rows
    db.run(createTableStr("atlas_maps", atlas_maps));

    let atlas_base_item_types = {
      region_id: "VARCHAR(45)",
      tag: "VARCHAR(45)",
      tier_max: "INTEGER",
      tier_min: "INTEGER",
      weight: "INTEGER"
    };
    // 46 Rows
    db.run(createTableStr("atlas_base_item_types", atlas_base_item_types));

    let atlas_connections = {
      map1: "VARCHAR(100)",
      map2: "VARCHAR(100)",
      region0: "BOOLEAN",
      region1: "BOOLEAN",
      region2: "BOOLEAN",
      region3: "BOOLEAN",
      region4: "BOOLEAN"
    };
    // 701 Rows
    db.run(createTableStr("atlas_connections", atlas_connections));

    let atlas_regions = {
      id: "VARCHAR(45)",
      name: "VARCHAR(45)"
    };
    // 8 Rows
    db.run(createTableStr("atlas_regions", atlas_regions));

    console.log("Created Tables sucressful");
  } else {
    console.log("Canno´t crate Tables - Web mode active");
  }
}

function createTableStr(tablename: string, columns: Object): string {
  let columnStr: string = "";
  for (let key in columns) {
    columnStr += key + " " + columns[key] + ", ";
  }
  columnStr = columnStr.substr(0, columnStr.length - 2);
  return `CREATE TABLE ${tablename} (${columnStr})`;
}
