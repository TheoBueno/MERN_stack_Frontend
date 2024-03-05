import { createContext, useState, useEffect, useContext }             from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged, signOut  }                               from "firebase/auth";
import { auth }     from '../firebase';
import axios        from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const AppProvider  = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`${backendUrl}/account/byemail/${email}`);
      const userData = response.data;
      return {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        balance: userData.balance
      };
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return null;
    }
  };

  function FirstOnly(string) {
    if (string === undefined) {
      return;
    } else if (string.includes(' ')) {
      let names = string.split(' ');
      return names[0];
    }
  }



  // function signup(email, password) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }
  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  };

  // function loginAccess(email, password) {
  //   return signInWithEmailAndPassword(auth, email, password);
  // }
  const loginAccess = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  };

  // function logout() {
  //   return signOut();
  // }
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  };

  useEffect(() => {

    const updateUsersWithFirstName = (userData) => {
      const updatedUsers = [...users, userData];
      updatedUsers[updatedUsers.length - 1].firstName = FirstOnly(userData.name);
      setUsers(updatedUsers);
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        const userData = await fetchUserData(user.email);
        if (userData) {
          updateUsersWithFirstName(userData);
        }
      } else {
        setUsers([]);
      }
    });
    return () => unsubscribe;
  }, [users]);


  const value = {
    currentUser,
    signup,
    loginAccess,
    logout,
    users,
    setUsers,
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export function Card(props) {
  function classes() {
    const bg  = props.bgcolor  ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div id="bankCard" className={classes()} style={{ maxWidth: '18rem' }}>
      <h6 className="card-header text-bg-dark ">{props.header}</h6>
      <div className="card-body">
        {props.title  && (<h5 className="card-title">{props.title}</h5>)}
        {props.text   && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id="createStatus">{props.status}</div>)}
      </div>
      {props.footer   && (<div className="card-footer text-bg-info text-muted">{props.footer}</div>)}
    </div>
  );
}

