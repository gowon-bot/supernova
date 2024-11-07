import { DB } from "./lib/database/db";
import { RollingDeleter } from "./lib/database/RollingDeleter";

export function register() {
  console.log(titleScreen);

  DB.getInstance()
    .init()
    .then(() => {
      RollingDeleter.registerCronJob();
    });
}

const titleScreen = `
\x1b[35m
.d8888b.                                                                         
d88P  Y88b                                                                        
Y88b.                                                                             
 "Y888b.   888  888 88888b.   .d88b.  888d888 88888b.   .d88b.  888  888  8888b.  
    "Y88b. 888  888 888 "88b d8P  Y8b 888P"   888 "88b d88""88b 888  888     "88b 
      "888 888  888 888  888 88888888 888     888  888 888  888 Y88  88P .d888888 
Y88b  d88P Y88b 888 888 d88P Y8b.     888     888  888 Y88..88P  Y8bd8P  888  888 
 "Y8888P"   "Y88888 88888P"   "Y8888  888     888  888  "Y88P"    Y88P   "Y888888   슈퍼노바
=================== 888 ===================================================================
                    888                                                           
                    888                                                           
\x1b[0m
`;
