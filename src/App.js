import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

var username = "User1";

function App() {
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState(0);

  const [pwds, setPwds] = useState([]);
  const pwdsCollectionRef = collection(db, username);

  const createPwd = async () => {
    await addDoc(pwdsCollectionRef, { name: newName, password: newPassword });
    alert('Created New Password, Please Refresh.');
  };

  const updatePwd = async (id, password) => {
    const pwdDoc = doc(db, username, id);
    const newFields = { password: password + 1 };
    await updateDoc(pwdDoc, newFields);
  };

  const deletePwd = async (id) => {
    const pwdDoc = doc(db, username, id);
    await deleteDoc(pwdDoc);
    alert('Password Deleted, Please Refresh.');
  };

  useEffect(() => {
    const getPwds = async () => {
      const data = await getDocs(pwdsCollectionRef);
      setPwds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPwds();
  }, []);
  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        placeholder="Password..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
  	  <br/>
      <button id="addpwd" onClick={createPwd}> Add Password</button>
      <table class="content-table">
      <thead>
            <tr>
              <th class="tit">WEBSITE</th>
              <th class="tit">PASSWORD</th>
              <th></th>
            </tr>
      </thead>
      <tbody>
      {pwds.map((pwd) => {
        return (
            <tr>
            <td>{pwd.name}</td>
            <td>{pwd.password}</td>
            <td><button onClick={() => {deletePwd(pwd.id);}}>
            Delete Password
            </button></td>
            </tr>
        );
      })}
      </tbody>
      </table>
    </div>
  );
}

export default App;
