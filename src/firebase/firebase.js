import * as firebase from "firebase";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();

const firebaseConfig = {
  apiKey: env.REACT_APP_EXPENSIFY_APIKEY,
  authDomain: env.REACT_APP_EXPENSIFY_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_EXPENSIFY_DATABASE_URL,
  projectId: env.REACT_APP_EXPENSIFY_PROJECT_ID,
  storageBucket: env.REACT_APP_EXPENSIFY_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_EXPENSIFY_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_EXPENSIFY_ID,
  measurementId: env.REACT_APP_EXPENSIFY_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// database.ref("expenses").on("value", (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val(),
//     });
//   });
//   console.log(expenses);
// });

// database
//   .ref("expenses")
//   .on("child_changed", (snapshot) => console.log(snapshot.key, snapshot.val()));

// // const expense1 = {
//   id: "1",
//   description: "Gum",
//   note: "",
//   amount: 195,
//   createdAt: 0,
// };

// const expense2 = {
//   id: "2",
//   description: "Rent",
//   note: "",
//   amount: 109500,
//   createdAt: 2,
// };

// const expense3 = {
//   id: "3",
//   description: "Credit Card",
//   note: "",
//   amount: 4500,
//   createdAt: 3,
// };

// database.ref("expenses").push(expense1);
// database.ref("expenses").push(expense2);
// database.ref("expenses").push(expense3);

// database.ref().on("value", (snapshot) => {
//   const value = snapshot.val();
//   console.log(`${value.name} is a ${value.job.title} at ${value.job.company}!`);
// });

// setTimeout(() => database.ref("age").set(90), 3500);
// database
//   .ref()
//   .set({
//     name: "Andrew Mead",
//     age: 26,
//     stressLevel: 6,
//     job: {
//       title: "Software developer",
//       company: "Google",
//     },
//     location: {
//       city: "Philadelphia",
//       country: "United States",
//     },
//   })
//   .then(() => console.log("data saved seccefully!"))
//   .catch((e) => console.log("something went wrong!: ", e));

// database.ref().update({
//   stressLevel: 9,
//   "job/company": "Amazon",
//   "location/city": "new york",
// });

//stress level
//company
//location city
