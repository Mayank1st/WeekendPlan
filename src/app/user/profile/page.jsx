import { useEffect, useState } from "react";
import EventCard from "../UserDashboard/EventCard";
import EventForm from "../UserDashboard/EventForm";
import { useToast } from "@chakra-ui/react";
import { useGetUserQuery } from "../../../lib/services/auth";

const Profile = () => {
  const [user, setUser] = useState({});
  const [eventResponses, setEventResponses] = useState([]);
  const { data, isSuccess } = useGetUserQuery();
  const toast = useToast();

  useEffect(() => {
    if (data && isSuccess) {
      setUser(data.user);
    }

    // Fetch attendee responses from local storage
    const fetchResponses = () => {
      const storedResponses = [];
      for (let key in localStorage) {
        if (key.startsWith('event_') && key.endsWith('_responses')) {
          const responses = JSON.parse(localStorage.getItem(key));
          storedResponses.push(...responses);
        }
      }
      setEventResponses(storedResponses);

      // Show toast notification for each response
      storedResponses.forEach(response => {
        toast({
          title: `Response Received`,
          description: `Email: ${response.email} - Status: ${response.responseStatus}`,
          status: response.responseStatus === 'accepted' ? 'success' : 'warning',
          duration: 1000,
          isClosable: true,
        });
      });
    };

    fetchResponses();
  }, [data, isSuccess, toast]);

  return (
    <div className="Dashboard-Main-container container">
      <div className="user-profile-card-section">
        <EventCard />
      </div>
      <div className="user-profile-form-section">
        <EventForm />
      </div>
      <div className="event-responses-section">
        {/* Optionally, you can still display responses here if needed */}
        <h2 className="text-2xl font-bold mb-4">Event Responses</h2>
        {eventResponses.length > 0 ? (
          <ul>
            {eventResponses.map((response, index) => (
              <li key={index} className="mb-2">
                <strong>Email:</strong> {response.email} - <strong>Status:</strong> {response.responseStatus}
              </li>
            ))}
          </ul>
        ) : (
          <p>No responses available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
