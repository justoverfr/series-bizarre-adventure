import Day from "./Day";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebase-config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoritesUpcomingReleases } from "./utils";
import { Episodes } from "@/types";
import { doc, getDoc } from "firebase/firestore";

export default function CalendarPage() {
  const [mondaySeries, setMondaySeries] = useState<Episodes[]>([]);
  const [tuesdaySeries, setTuesdaySeries] = useState<Episodes[]>([]);
  const [wednesdaySeries, setWednesdaySeries] = useState<Episodes[]>([]);
  const [thursdaySeries, setThursdaySeries] = useState<Episodes[]>([]);
  const [fridaySeries, setFridaySeries] = useState<Episodes[]>([]);
  const [saturdaySeries, setSaturdaySeries] = useState<Episodes[]>([]);
  const [sundaySeries, setSundaySeries] = useState<Episodes[]>([]);

  const [userFavorites, setUserFavorites] = useState<number[]>([]);

  useEffect(() => {
    async function getReleases() {
      const upcomingReleases = await getFavoritesUpcomingReleases(
        userFavorites
      );
      if (upcomingReleases["monday"])
        setMondaySeries(upcomingReleases["monday"]);
      if (upcomingReleases["tuesday"])
        setTuesdaySeries(upcomingReleases["tuesday"]);
      if (upcomingReleases["wednesday"])
        setWednesdaySeries(upcomingReleases["wednesday"]);
      if (upcomingReleases["thursday"])
        setThursdaySeries(upcomingReleases["thursday"]);
      if (upcomingReleases["friday"])
        setFridaySeries(upcomingReleases["friday"]);
      if (upcomingReleases["saturday"])
        setSaturdaySeries(upcomingReleases["saturday"]);
      if (upcomingReleases["sunday"])
        setSundaySeries(upcomingReleases["sunday"]);
    }

    getReleases();
  }, [
    mondaySeries,
    tuesdaySeries,
    wednesdaySeries,
    thursdaySeries,
    fridaySeries,
    saturdaySeries,
    sundaySeries,
    userFavorites,
  ]);

  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      setUserId(currentUser.uid);

      const userDocRef = doc(db, "Users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserFavorites(userData?.favorites);
      }
    } else navigate("/login");
  });

  return (
    <div className="flex flex-col pl-10 bg-[rgba(47,47,47,0.97)] border border-[#6643b5] p-8 ml-10 mt-10 mr-10 mb-10 rounded-lg">
      <h1 className="text-[36px] mt-2 mb-7 text-white not-italic font-medium leading-6 font-Raleway">
        Calendar
      </h1>
      <div className="flex flex-col gap-3 pl-2">
        <Day day="Monday" seriesList={mondaySeries} />
        <Day day="Tuesday" seriesList={tuesdaySeries} />
        <Day day="Wednesday" seriesList={wednesdaySeries} />
        <Day day="Thursday" seriesList={thursdaySeries} />
        <Day day="Friday" seriesList={fridaySeries} />
        <Day day="Saturday" seriesList={saturdaySeries} />
        <Day day="Sunday" seriesList={sundaySeries} />
      </div>
    </div>
  );
}
