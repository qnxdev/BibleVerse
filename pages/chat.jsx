import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";
import { initFire } from "./_app";
import {
  collection,
  doc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getApps } from "firebase/app";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration

export default function chat(params) {
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [updates, setUpdates] = useState([]);

  const conv = "G77ocIXjOYgdc3QXUgAD";
  initFire();
  useEffect(() => {
    const auth = getAuth();
    const fn = async () => {
      try {
        const promise = await fetch("/api/test");
        const data = await promise.json();
        if (data.token) {
          await signInWithCustomToken(auth, data.token)
            .then((userCredential) => {
              // Signed in
              const userX = userCredential.user;
              setUser(userX);
              // ...
            })
            .catch((error) => {
              console.log(error);
              const errorCode = error.code;
              const errorMessage = error.message;
              // ...
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!auth.currentUser) fn();
  }, []);
  useEffect(() => {
    if (user) {
      const db = getFirestore(getApps()[0]);

      const q = query(
        collection(db, "conversations", conv, "messages"),
        orderBy("t", "asc"),
        limit(20)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newChat = [];
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            newChat.push({ id: change.doc.id, ...change.doc.data() });
          } else if (change.type === "modified") {
            console.log("Message modified:", change.doc.data());
          } else if (change.type === "removed") {
            console.log("Message removed:", change.doc.data());
          }
        });
        setUpdates(newChat);
      });
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    setChat([...chat, ...updates]);
  }, [updates]);

  const sendMsg = async () => {
    if (msg.length > 0) {
      const promise = await fetch("/api/test", {
        method: "POST",
        body: JSON.stringify({
          u: "y",
          m: msg,
          c: conv,
        }),
      });
      const res = await promise.text();
      console.log(res);
      setMsg("");
    }
  };
  return (
    <div>
      <div className="chat">
        {chat.map((i) => (
          <div key={i.id}>
            {i.a} {">"} {i.m} at {new Date(i.t.seconds * 1000).toUTCString()}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  );
}
