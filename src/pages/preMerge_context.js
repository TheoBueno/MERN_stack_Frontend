import { createContext, useState, useEffect, useContext }             from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth }     from '../firebase';
import axios        from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL


const AuthContext = createContext()
const RecurringContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const RecurringProvider = ({ children }) => {
  const initialUser = {
    isAnyoneLoggedIn: false,
    userDetails: { firstName: 'User', name: 'Guest User', email: 'Please Log in to view.' }
  };
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [users, setUsers] = useState([]);

  return (
    <RecurringContext.Provider value={{ currentUser, setCurrentUser, users, setUsers }}>
      {children}
    </RecurringContext.Provider>
  );
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading]         = useState(true)

  function signup(email, password) { //ex.: persephonie@olympus.hellas
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function loginAccess(email, password) { //ex.: persephonie@olympus.hellas
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return auth.signOut();
  }

  function FirstOnly(string) {
    if(string === undefined ) { 
      return 
    } else if (string.includes(' ')) {
      let names = string.split(' ');
      return names[0];
    }
  }

  const ctx = useContext(RecurringContext);

  if (!ctx.users) {
    ctx.users = [];
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(true)
    
    if (user) {
      const url2 = `${backendUrl}/account/byemail/${user.email}`;
      axios.get(url2).then(response => {
        const data = response.data;
        ctx.users.push({ name: data.name, email: data.email, balance: data.balance });
        ctx.users[ctx.users.length - 1].firstName = FirstOnly(ctx.users[ctx.users.length - 1].name);
      }).catch(error => {
        console.error('Failed to fetch user data:', error)
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false)
    }
  });
    
    return unsubscribe
  }, [ctx.users]);

  const value = {
    currentUser, 
    signup, 
    loginAccess,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function Card(props) {
  function classes() {
    const bg  = props.bgcolor  ? ' bg-'   + props.bgcolor  : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3 ' + bg + txt
  }

  return (
    <div id="bankCard" className={classes()} style={{maxWidth: '18rem'}}>
      <h6 className="card-header text-bg-dark ">{props.header}</h6>
      <div className="card-body">
        {props.title  &&  (<h5 className="card-title">{props.title}</h5>)}
        {props.text   &&  (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status &&  (<div id="createStatus">{props.status}</div>)}
      </div>
        {props.footer && (<div className="card-footer text-bg-info text-muted">{props.footer}</div>)}
    </div>
  )
}