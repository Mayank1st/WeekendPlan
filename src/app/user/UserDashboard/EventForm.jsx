import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const EventForm = ({ onClose }) => {
  const location = useLocation();
  const { selectedDistrict, stateName } = location.state || {};

  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [expiresIn, setExpiresIn] = useState(localStorage.getItem('expires_in'));
  const [eventLink, setEventLink] = useState(null);

  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);

  const toast = useToast();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const storedEventIds = [];
      for (let key in localStorage) {
        if (key.startsWith('event_') && key.endsWith('_responses')) {
          const eventId = key.split('_')[1];
          storedEventIds.push(eventId);
        }
      }
      for (let eventId of storedEventIds) {
        const eventDetails = await getEventDetails(eventId);
        const responses = eventDetails.attendees.map(attendee => ({
          email: attendee.email,
          responseStatus: attendee.responseStatus,
        }));
        localStorage.setItem(`event_${eventId}_responses`, JSON.stringify(responses));
      }
    }, 10000); // Fetch every 1 minute
  
    return () => clearInterval(intervalId);
  }, []);
  

  useEffect(() => {
    gapiLoaded();
    gisLoaded();
  }, []);

  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    try {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      setGapiInited(true);

      if (accessToken && expiresIn) {
        gapi.client.setToken({
          access_token: accessToken,
          expires_in: expiresIn,
        });
      }
    } catch (error) {
      console.error("Error initializing GAPI client:", error);
    }
  }

  function gisLoaded() {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: handleAuthCallback,
    });
    setTokenClient(client);
    setGisInited(true);
  }

  function handleAuthCallback(resp) {
    if (resp.error) {
      console.error("Token client error:", resp);
      return;
    }
    setAccessToken(resp.access_token);
    setExpiresIn(resp.expires_in);
    localStorage.setItem('access_token', resp.access_token);
    localStorage.setItem('expires_in', resp.expires_in);
  }

  function handleAuthClick() {
    if (!(accessToken && expiresIn)) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      localStorage.clear();
      setAccessToken(null);
      setExpiresIn(null);
    }
  }

  async function addEvent(eventDetails) {
    const event = {
      'kind': 'calendar#event',
      'summary': eventDetails.name,
      'location': `${selectedDistrict}, ${stateName}`,
      'description': `
        <h1 style="color: #1a73e8;">${eventDetails.name}</h1>
        <p><strong>Location:</strong> Masai School, Bangalore</p>
        <p><strong>Description:</strong> Join us for an exciting event! Here are the details:</p>
        <ul>
          <li><strong>Start Date:</strong> ${new Date(eventDetails.startDate).toLocaleDateString()}</li>
          <li><strong>End Date:</strong> ${new Date(eventDetails.endDate).toLocaleDateString()}</li>
          <li><strong>Location:</strong> Masai School, Bangalore</li>
          <li><strong>Email:</strong> ${eventDetails.email}</li>
        </ul>
        <p>We look forward to seeing you there!</p>
        <p>For more information, contact us at <a href="mailto:info@example.com">info@example.com</a>.</p>
        <footer style="margin-top: 20px;">
          <p style="font-size: 0.9em; color: #888;">This is an automated invitation. Please do not reply.</p>
        </footer>
      `,
      'start': {
        'dateTime': new Date(eventDetails.startDate).toISOString(),
        'timeZone': 'UTC'
      },
      'end': {
        'dateTime': new Date(eventDetails.endDate).toISOString(),
        'timeZone': 'UTC'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=1'
      ],
      'attendees': [
        { 'email': eventDetails.email, 'responseStatus': 'needsAction' },
      ],
      'reminders': {
        'useDefault': true,
      },
      "guestsCanSeeOtherGuests": true,
    };
  
    try {
      // Insert the event
      const insertResponse = await gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
        'sendUpdates': 'all'
      });
  
      const eventId = insertResponse.result.id;
  
      // Fetch event details including responses
      const eventDetails = await getEventDetails(eventId);
  
      // Process the attendees' responses
      const responses = eventDetails.attendees.map(attendee => ({
        email: attendee.email,
        responseStatus: attendee.responseStatus,
      }));
  
      // Save responses to local storage
      localStorage.setItem(`event_${eventId}_responses`, JSON.stringify(responses));
  
      console.log("Attendee Responses:", responses);
  
      // Open event link
      window.open(insertResponse.result.htmlLink);
    } catch (error) {
      console.error("Error adding event:", error);
      throw new Error("Failed to create event. Please try again.");
    }
  }
  
  
  
  async function getEventDetails(eventId) {
    try {
      const response = await gapi.client.calendar.events.get({
        calendarId: 'primary',
        eventId: eventId,
      });
      return response.result;
    } catch (error) {
      console.error("Error fetching event details:", error);
      throw new Error("Failed to fetch event details.");
    }
  }  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent({
        name,
        startDate,
        endDate,
        email,
      });
      toast({
        title: "Event Scheduled Successfully",
        description: "Your event has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      // Clear the form fields
      setName("");
      setStartDate("");
      setEndDate("");
      setEmail("");
      // Close the form
      onClose();
    }
  };

  return (
    <Box p={5} borderWidth="1px" borderRadius="md" bg="white" boxShadow="lg">
      <Button
        id="authorize_button"
        hidden={accessToken && expiresIn}
        onClick={handleAuthClick}
      >
        Authorize
      </Button>
      <Button
        id="signout_button"
        hidden={!accessToken && !expiresIn}
        onClick={handleSignoutClick}
      >
        Sign Out
      </Button>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Event Name"
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Friend's Email"
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="start-date">Starting Date</FormLabel>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="end-date">Ending Date</FormLabel>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" disabled={!accessToken || !expiresIn}>
          Submit
        </Button>
        <Button ml={4} onClick={onClose}>
          Cancel
        </Button>
      </form>
      {eventLink && (
        <Button
          mt={4}
          colorScheme="blue"
          onClick={() => window.open(eventLink, '_blank')}
        >
          View Event on Google Calendar
        </Button>
      )}
    </Box>
  );
};

export default EventForm;
