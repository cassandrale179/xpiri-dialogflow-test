/**
* Copyright 2017 Google Inc. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
'use strict';
process.env.DEBUG = 'actions-on-google:*';

const Assistant = require('actions-on-google').ApiAiAssistant;
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// const know = admin.database().ref('/animal-knowledge');
// const graph = know.child('graph');

const status = admin.database().ref('/status');

// Dialogflow Intent names
const PLAY_INTENT = 'play';
const NO_INTENT = 'discriminate-no';
const YES_INTENT = 'discriminate-yes';
const GIVEUP_INTENT = 'give-up';
const LEARN_THING_INTENT = 'learn-thing';
const LEARN_DISCRIM_INTENT = 'learn-discrimination';

// Contexts
const WELCOME_CONTEXT = 'welcome';
const QUESTION_CONTEXT = 'question';
const GUESS_CONTEXT = 'guess';
const LEARN_THING_CONTEXT = 'learn-thing';
const LEARN_DISCRIM_CONTEXT = 'learn-discrimination';
const ANSWER_CONTEXT = 'answer';

// Context Parameters
const ID_PARAM = 'id';
const BRANCH_PARAM = 'branch';
const LEARN_THING_PARAM = 'learn-thing';
const GUESSABLE_THING_PARAM = 'guessable-thing';
const LEARN_DISCRIMINATION_PARAM = 'learn-discrimination';
const ANSWER_PARAM = 'answer';
const QUESTION_PARAM = 'question';

exports.assistantcodelab = functions.https.onRequest((request, response) => {
   console.log('headers: ' + JSON.stringify(request.headers));
   console.log('body: ' + JSON.stringify(request.body));

   const assistant = new Assistant({request: request, response: response});

   let actionMap = new Map();
   actionMap.set(PLAY_INTENT, play);
   actionMap.set(NO_INTENT, discriminate);
   actionMap.set(YES_INTENT, discriminate);
   actionMap.set(GIVEUP_INTENT, giveUp);
   actionMap.set(LEARN_THING_INTENT, learnThing);
   actionMap.set(LEARN_DISCRIM_INTENT, learnDiscrimination);
   assistant.handleRequest(actionMap);

   function play(assistant) {
       status.once('value', snap => {
           const speech = `Okay, you currently have ${snap.val().expired} expired food at the moment, ${snap.val().good} food in good status at the moment, and ${snap.val().expired} food that is about to expired soon. Would you like to make a recipe with this food?`;
           assistant.ask(speech);
       });

   }

   function discriminate(assistant) {
       const priorQuestion = assistant.getContextArgument(QUESTION_CONTEXT, ID_PARAM).value;
       const intent = assistant.getIntent();
       let yes_no;
       if (YES_INTENT === intent) {
           yes_no = 'y';
       } else {
           yes_no = 'n';
       }

   }

   function giveUp(assistant) {

   }

   function learnThing(assistant) {

   }

   function learnDiscrimination(assistant) {

   }
});
