import Link from "next/link";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import "firebase/database";
import firebase from "firebase/compat/app";


// import { createClient } from "@supabase/supabase-js";

// // Initialize Supabase client
// const supabase = createClient(
//   "https://oncswubhrnouqlopdxwo.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uY3N3dWJocm5vdXFsb3BkeHdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjMxNTAyMSwiZXhwIjoyMDAxODkxMDIxfQ.Zi0W7_YMrIlv2OFBYWQmIutTST9J9tsi2bJ1NqSGgIg"
// );

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8ZUyw-FTahqqmRhRzxYzA_QA6VAkevkM",
  authDomain: "secret-santa-d618e.firebaseapp.com",
  databaseURL: "https://secret-santa-d618e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "secret-santa-d618e",
  storageBucket: "secret-santa-d618e.appspot.com",
  messagingSenderId: "691218473853",
  appId: "1:691218473853:web:3f25855a48748c40e9e214",
  measurementId: "G-M5B86K5Y5V"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Function to send an email using your preferred email sending method
const sendEmail = async (to, subject, content) => {
  // Implement your email sending logic here
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content: ${content}`);
};

function Form() {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([{ name: "", email: "", exceptions: "" }]);

  const addParticipant = React.useCallback(() => {
    setUsers([...users, { name: "", email: "", exceptions: "" }]);
  }, [users]);

  const deleteParticipant = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const assignParticipants = () => {
    const shuffledUsers = [...users]; // Make a copy of users array
    let assignedParticipants = [];
  
    // Sort participants by the number of exceptions in ascending order
    shuffledUsers.sort((a, b) => a.exceptions.length - b.exceptions.length);
  
    for (let i = 0; i < shuffledUsers.length; i++) {
      const currentUser = shuffledUsers[i];
      let availableParticipants = shuffledUsers.filter(
        (participant) =>
          participant !== currentUser && // Exclude current user
          !currentUser.exceptions.includes(participant.name) && // Exclude participants in exceptions list
          !assignedParticipants.includes(participant) // Exclude already assigned participants
      );
  
      if (availableParticipants.length === 0) {
        // If no available participants, restart the assignment process
        assignedParticipants = [];
        i = -1;
        continue;
      }
  
      const assignedParticipant =
        availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
  
      assignedParticipants.push(assignedParticipant);
      currentUser.assignedParticipant = assignedParticipant.name;
    }
  
    setUsers(shuffledUsers);
  };
 
    
  const send = async () => {
    // Save event details to Firebase
    const eventRef = firebase.database().ref("events");
    await eventRef.push({
      event,
      date,
      time,
      location,
      budget,
    });
  
    // Save participant details to Firebase
    const participantsRef = firebase.database().ref("participants");
    await participantsRef.push(users);

    console.log("Data saved to Firebase");

    assignParticipants();

    const emails = users.map((participant) => {
      const emailContent = `
        Dear ${participant.name},
        
        You have been assigned to ${participant.assignedParticipant}!       
        
        
        Here are the event details:
        
        "${event}"
        Date: ${date}
        Time: ${time}
        Location: ${location}
        Budget: ${budget}
        
        Message from the host: ${message}
        
        Have a great time!
        
        Regards,
        The Host
      `;

      return {
        to: participant.email,
        subject: `Event Assignment - ${event}`,
        content: emailContent,
      };
    });

    // Send emails using your preferred email sending method
    const sendEmails = async (emails) => {
      await Promise.all(emails.map(async (email) => {
        await sendEmail(email.to, email.subject, email.content);
      }));
    };

    await sendEmails(emails);
    console.log("Emails sent successfully");
  };

  return (
    <div className="form">
      <label htmlFor="event">🎉 Event</label>
      <input
        id="event"
        type="text"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      />
      <div className="dateTime">
        <div>
          <label htmlFor="date">📅 Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="time">🕒️ Time</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <label htmlFor="location">📍 Location</label>
      <input
        id="location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label htmlFor="budget">💰️ Budget</label>
      <input
        id="budget"
        type="text"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <div className="line"></div>
      {users.map((user, index) => {
        return (
          <div key={index} className="participant">
            <div className="nameAndEmail">
              <div>
                <label htmlFor={`name-${index}`}>👤 Name</label>
                <input
                  id={`name-${index}`}
                  className="name"
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    const newUsers = [...users];
                    newUsers[index].name = e.target.value;
                    setUsers(newUsers);
                  }}
                />
              </div>
              <div>
                <label htmlFor={`email-${index}`}>✉️ Email</label>
                <input
                  id={`email-${index}`}
                  className="email"
                  type="text"
                  value={user.email}
                  onChange={(e) => {
                    const newUsers = [...users];
                    newUsers[index].email = e.target.value;
                    setUsers(newUsers);
                  }}
                />
              </div>
              <button
                className="deleteButton"
                onClick={() => deleteParticipant(index)}
              >
                🗑️
              </button>
            </div>
            <div className="exception">
              <div>
                <label htmlFor={`exceptions-${index}`}>❌ Exceptions</label>
                <input
                  id={`exceptions-${index}`}
                  className="exceptions"
                  type="text"
                  value={user.exceptions}
                  onChange={(e) => {
                    const newUsers = [...users];
                    newUsers[index].exceptions = e.target.value;
                    setUsers(newUsers);
                  }}
                />
              </div>
            </div>
            <div className="dottedLine"></div>
          </div>
        );
      })}
      <div className="buttonContainer">
        <button type="submit" onClick={addParticipant}>
          Add participant
        </button>
      </div>
      <div className="line"> </div>
      <div>
        <label htmlFor="message">📜 Message to Guests</label>
        <input
          id="message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="buttonContainer">
        <button type="submit" onClick={send}>
          Send emails!
        </button>
      </div>
    </div>
  );
}

export default Form;
