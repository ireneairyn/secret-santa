import Link from "next/link";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://oncswubhrnouqlopdxwo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uY3N3dWJocm5vdXFsb3BkeHdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjMxNTAyMSwiZXhwIjoyMDAxODkxMDIxfQ.Zi0W7_YMrIlv2OFBYWQmIutTST9J9tsi2bJ1NqSGgIg"
);

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
    const participants = [...users];
    const availableParticipants = [...users];

    participants.forEach((participant) => {
      const exceptions = participant.exceptions
        .toLowerCase()
        .split(",")
        .map((exception) => exception.trim());

      // Filter out the current participant and their exceptions
      const filteredParticipants = availableParticipants.filter(
        (p) =>
          p.name.toLowerCase() !== participant.name.toLowerCase() &&
          !exceptions.includes(p.name.toLowerCase())
      );

      if (filteredParticipants.length > 0) {
        const excludedParticipants = filteredParticipants.filter(
          (p) => exceptions.includes(p.name.toLowerCase())
        );

        if (excludedParticipants.length > 0) {
          const randomIndex = Math.floor(Math.random() * excludedParticipants.length);
          const assignedParticipant = excludedParticipants[randomIndex];

          // Assign the participant to the excluded participant
          participant.assignedParticipant = assignedParticipant.name;

          // Remove assigned participant from the available participants list
          availableParticipants.splice(availableParticipants.indexOf(assignedParticipant), 1);
        } else {
          const randomIndex = Math.floor(Math.random() * filteredParticipants.length);
          const assignedParticipant = filteredParticipants[randomIndex];

          // Assign the participant to the assigned participant
          participant.assignedParticipant = assignedParticipant.name;

          // Remove assigned participant from the available participants list
          availableParticipants.splice(availableParticipants.indexOf(assignedParticipant), 1);
        }
      } else {
        // If no available participants, assign the participant to themselves
        participant.assignedParticipant = participant.name;
      }
    });
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
