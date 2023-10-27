import FormInput from "@/components/FormInput";
import BigButton from "@/components/BigButton";
import { useEffect, useState } from "react";
import {
  EmailAuthProvider,
  User,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "@/config/firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function ProfilePage() {
  /* Propriété modifiable de l'utilisateur */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  /* Propriété non modifiable de l'utilisateur */
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userEmail = currentUser.email;
        setEmail(userEmail!);
        setUser(currentUser);

        const userDocRef = doc(db, "Users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData?.username);
        }
      } else navigate("/login");
    });

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  const handleEmailChange = () => {
    if (user) {
      const credential = EmailAuthProvider.credential(email, password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updateEmail(user, newEmail)
            .then(() => {
              alert("Email updated!");
              setEmail(newEmail);
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handlePasswordChange = () => {
    if (user) {
      const credential = EmailAuthProvider.credential(email, password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword)
            .then(() => {
              alert("Password updated!");
              setPassword("");
              setNewPassword("");
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <>
      <div className="my-8 mx-auto max-w-2xl">
        <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
          <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
            User Information
          </h1>
          <div className="mb-4">
            <label className="flex flex-col">
              <span className="mb-2">Username: {username}</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex flex-col">
              <span className="mb-2">Email: {email}</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-8 mx-auto mt-8 max-w-2xl">
        <div className="flex-1">
          <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
            <h1 className="text-[28px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
              Change Email
            </h1>
            <div className="mb-4">
              <FormInput
                value={newEmail}
                placeholder="New Email"
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <FormInput
                value={password}
                placeholder="Current Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <BigButton text="Change Email" onClick={handleEmailChange} />
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
            <h1 className="text-[28px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
              Change Password
            </h1>
            <div className="mb-4">
              <FormInput
                value={password}
                placeholder="Current Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <FormInput
                value={newPassword}
                placeholder="New Password"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <BigButton text="Change Password" onClick={handlePasswordChange} />
          </div>
        </div>
      </div>
      <div className="my-8 mx-auto max-w-2xl">
        <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
          <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
            Notifications
          </h1>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Recevoir des notifications toutes les 24h
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Recevoir des notifications toutes les 48h
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Ne pas recevoir de notifications
            </label>
          </div>
          <BigButton text="Valider" />
        </div>
      </div>
    </>
  );
}
