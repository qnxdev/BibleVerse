import { credential } from "firebase-admin";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

function firebaseAdminInit() {
  try {
    const apps = getApps();
    if (!apps.length) {
      const app = initializeApp({
        credential: credential.cert(
          JSON.parse(
            decodeURIComponent(process.env.GOOGLE_APPLICATION_CREDENTIALS)
          )
        ),
      });
    }
  } catch (error) {
    console.log(error);
  }
}
const app = firebaseAdminInit();
export default async (req, res) => {
  if (req.method == "GET") {
    const uid = "y";
    const additionalClaims = { key: "a" };
    await getAuth()
      .createCustomToken(uid, additionalClaims)
      .then((customToken) => {
        res.send({ token: customToken });
      })
      .catch((error) => {
        console.log("Error creating custom token:", error);
        res.send({ error: "err" });
      });
  } else if (req.method == "POST") {
    try {
      const data = JSON.parse(req.body);
      const db = getFirestore();
      db.collection(`conversations/${data.c}/messages`).add({
        a: data.u,
        m: data.m,
        t: FieldValue.serverTimestamp(),
      });
      res.send("success");
    } catch (error) {
      console.log(error);
      res.send("err");
    }
  }
};
