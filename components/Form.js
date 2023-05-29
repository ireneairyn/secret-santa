import Link from "next/link";
import React, { useState } from "react";

function Form() {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="form">
    <div className="line">
      <label>
        🎉 Event
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
        />
      </label>
      <label>
        📅 Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        🕒️ Time
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <label>
        📍 Location
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label>
        💰️ Budget
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </label>
      </div>
        <label>
          👤 Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          📩 Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      <div className="buttonContainer">
         <button type="submit">Add participant</button>
        <Link
          href={{
            pathname: "/sent",
            query: {
              event,
              date,
              time,
              location,
              budget,
              name,
              email,
            },
          }}
        >
          <button type="submit">Send emails!</button>
        </Link>
      </div>
    </div>
  );
}

export default Form;
