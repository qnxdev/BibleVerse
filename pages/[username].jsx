import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function hi(params) {
  const router = useRouter();
  const [userData, setUserData] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  useEffect(() => {
    if (router.query.username) {
    }
  }, [router.query]);

  return <div>
    {userData.map((i,k)=>{
      
    })}
  </div>;
}
