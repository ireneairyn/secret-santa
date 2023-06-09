import Link from "next/link";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://oncswubhrnouqlopdxwo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uY3N3dWJocm5vdXFsb3BkeHdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjMxNTAyMSwiZXhwIjoyMDAxODkxMDIxfQ.Zi0W7_YMrIlv2OFBYWQmIutTST9J9tsi2bJ1NqSGgIg"
);

function Form() {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([{ name: "", email: "", exceptions: [] }]);

  const addParticipant = React.useCallback(() => {
    setUsers([...users, { name: "", email: "", exceptions: [] }]);
  }, [users]);

  const deleteParticipant = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const send = async () => {
    // Save event details to Supabase
    await supabase.from("events").insert([
      {
        event,
        date,
        time,
        location,
        budget,
      },
    ]);

    // Save participant details to Supabase
    await supabase.from("participants").insert(users);

    console.log("Data saved to Supabase");
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
        id="budget"
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
