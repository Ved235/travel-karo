import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import firebaseConfig from "../config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

get(ref(db, "stations/"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      window.localStorage.setItem("firebase", JSON.stringify(snapshot.val()));
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

document.getElementById("sub").addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault();
  var location = getElementVal("location");
  var response = getElementVal("response");
  var mode = getElementVal("form_sel");
  var ev_status;
  try {
    ev_status = getElementVal("ev_select1");
  } finally {
    saveMessages(location, reponse, mode, ev_status);
  }

  document.getElementById("review_form").reset();
}

const saveMessages = (location, response, mode, ev_status) => {
  const newPostKey = push(child(ref(db), "review")).key;
  if (mode == "ev") {
    set(ref(db, "reviews/ev/" + newPostKey), {
      location: location,
      review: response,
      ev_status: ev_status,
    })
      .then(() => {
        alert("Feedback is saved");
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    set(ref(db, "reviews/transit/" + newPostKey), {
      location: location,
      review: response,
    })
      .then(() => {
        alert("Feedback is saved");
      })
      .catch((error) => {
        alert(error);
      });
  }
};
const getElementVal = (id) => {
  return document.getElementById(id).value;
};
