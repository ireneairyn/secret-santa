import Link from "next/link";
import React, { useState } from "react";

function Form() {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [users, setUsers] = useState([{ name: "", email: "" }]);

  const addParticipant = React.useCallback(() => {
    setUsers([...users, { name: "", email: "" }]);
  }, [users]);

  const send = React.useCallback(() => {
    console.log("Send", { users });
  }, [users]);

  return (
    <div className="form">
      <div className="line">
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
      </div>
      {users.map((user, index) => {
        return (
          <div key={index} className="participant">
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
              <label htmlFor={`email-${index}`}>📩 Email</label>
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
          </div>
        );
      })}
      <div className="buttonContainer">
        <button type="submit" onClick={addParticipant}>
          Add participant
        </button>
        <button type="submit" onClick={send}>
          Send emails!
        </button>
      </div>
    </div>
  );
}

export default Form;
