import { Meteor } from "meteor/meteor";
import dotenv from "dotenv";
import "./eventFunctions";
import "./postmark.js";
import { authorize } from "./authentication";
import * as QS from "qs";

Meteor.startup(async () => {
  dotenv.config({
    path: `${process.env.PWD}/.env`
  })

  /* AUTHENTICATING ISSUES: */

  // I learned that each time it'll attempt to create a token, it'd launch the auth page & often get hung up on the last process.
  // After copying the query strings a couple times, I see that its sending a new object with an updating code each time.

  // This code is whats being passed to google to authenticate & produce a token.json file


  // After a handful (15ish tabs) of tries, it eventually worked!

  // console.log(QS.parse("http://localhost:3000/auth?code=4/0AWtgzh6d4HDFc8Aj_InK25Rfc3p-ZpHhgzok7MrBY5pRbOwmFaS44RoEI9lkdpTuYubDLA&scope=https://www.googleapis.com/auth/calendar"));

  // console.log(QS.parse("http://localhost:3000/auth?code=4/0AWtgzh4reNdWk3chf2hNX-0H3COtrH-FVSwTvSbUFCWeva26eeSGSTY8-JN3_hUfn6jz8A&scope=https://www.googleapis.com/auth/calendar"));
  // console.log(QS.parse(""));
  // console.log(QS.parse(""));
  // console.log(QS.parse(""));


  // await authorize();

});
