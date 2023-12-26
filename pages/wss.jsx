import { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const makeWebsocketPath = ({
  type,
  topicType,
  tenant,
  namespace,
  topic,
  subscription,
}) => {
  let path = `/ws/v2/${type}/${topicType}/${tenant}/${namespace}/${topic}`;
  if (type === ConnectionType.Consumer) {
    path += `/${subscription}`;
  }
  return path;
};

export const SubscriptionType = {
  Exclusive: "Exclusive",
  Failover: "Failover",
  Shared: "Shared",
  Key_Shared: "Key_Shared",
};

export const ConnectionType = {
  Producer: "producer",
  Consumer: "consumer",
  Reader: "reader",
};

export const ReaderMode = {
  Earliest: "earliest",
  Latest: "latest",
};
export const makeWebsocketUrl = (params) => {
  const { baseUrl, token, type, subscriptionType, readerMode } = params;
  const url = new URL(makeWebsocketPath(params), baseUrl);
  url.searchParams.append("token", encodeURIComponent(token));
  if (type === ConnectionType.Consumer) {
    url.searchParams.append(
      "subscriptionType",
      subscriptionType ?? SubscriptionType.Exclusive
    );
  }
  if (type === ConnectionType.Reader) {
    url.searchParams.append("messageId", readerMode ?? ReaderMode.Latest);
  }
  return url.toString();
};
export default function WebSocketDemo() {
  const consumerWs = useRef();
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    "wss://pulsar-aws-eucentral1.streaming.datastax.com:8964/ws/v2/consumer/persistent/test-wss/astracdc/data-a5428ef6-0d50-4df0-a30f-04d5bd5c89fa-werken.dummy/dummy?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTMyMDk1NjYsImlhdCI6MTY5MDYyNTU0NiwiaXNzIjoiZGF0YXN0YXgiLCJzdWIiOiJjbGllbnQ7ZWQ4ODY4NGEtMmM5NS00MWFkLWE2ODYtZGQ3YjM3N2FjNzIxO2RHVnpkQzEzYzNNPTs5YjczMDI0YzlhIiwidG9rZW5pZCI6IjliNzMwMjRjOWEifQ.b_hWRgAAbNsFAUCnXaWuJvT8JoOuiQuhFNQU6H7C7WszXEZlzqR-hg3lUzXOiRlPnaHh8K69LDtlqc3ALwntvfAbp6297Gd2R7dSu48s6h4u3jZMMt-FyOhTFMg5fj5cZtRH4ehKVxOTLDE-6brI5Tkvjn96NrH3EDPbmPxL8RptoxOgt0NTXYz4u1JIp7jV50B11wPnjwcX2jNfRTBAwlrZbSGCM01jsr4sFHRr9zEB-yOeb3vk5oPhC7KZM6qJSLPxk4JW1fEceguIqC-6tC0auoXrG-Jw8-j3g2I7UV6Z10HPFsxGHq-FXM552piRYYVQTaklemOTPO0hYkVd3A&subscriptionType=Shared"
  );
  // Customize your authorization token as needed
  const authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTMyMDk1NjYsImlhdCI6MTY5MDYyMzA2OCwiaXNzIjoiZGF0YXN0YXgiLCJzdWIiOiJjbGllbnQ7ZWQ4ODY4NGEtMmM5NS00MWFkLWE2ODYtZGQ3YjM3N2FjNzIxO2RHVnpkQzEzYzNNPTs5YjczMDI0YzlhIiwidG9rZW5pZCI6IjliNzMwMjRjOWEifQ.A6ptwkcMYW2uVQ0BeKyxJXKlmFdG3S30zngvTPdZ43P9EcqWybszzTuo_sNJZ3V1eufsIkwK94Kwni9nRmBFPGQ4N8HCEQT8D23Nh_Bbmlcz0QOz8Ns3W-GROIkYhPjqWBE5AJa7LLyLIMwyOLocrC6N37gw5Bq8NgNaStMK4Znl_VgYUokyuEBkAy_CUmX-JC-EM4L6pkrY3OStgBNDU2LpHDCXdOX0khgIXxU2FP2n54xssY3520aNqelvRVXZcnHpyKY4bjP9W5nH3DIxyOfehPTMXODLfjmyke-jQeKBOq5Qye1_rnPhbSgrYDI7mnsnLzd9TNiQOAVqOD2aVQ";

  useEffect(() => {
    // Replace 'yourWebSocketURL' with the actual URL of your WebSocket server
    consumerWs.current = new WebSocket(socketUrl);

    consumerWs.current.onopen = (e) => {
      // Once the connection is open, add the authorization header
      console.log(e);
    };

    consumerWs.current.onmessage = (event) => {
      // Handle incoming messages from the WebSocket server
      const data = JSON.parse(event.data);
      console.log("Received:", data);
    };

    consumerWs.current.onerror = (data) => {
      // Handle incoming messages from the WebSocket server
      //const data = JSON.parse(event.data);
      console.log("Received:", data);
    };

    consumerWs.current.onclose = (event) => {
      // Handle the WebSocket connection close event
      console.log("Connection closed:", event);
    };

    return () => {
      // Close the WebSocket connection when the component unmounts
      //socket.close();
    };
  }, []);
  return (
    <div>
      <ul>
        {[].map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
}
