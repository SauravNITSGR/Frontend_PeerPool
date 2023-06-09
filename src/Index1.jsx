import React,{ useState } from "react";
import { Navbar, Welcome, Footer, Services, ParkingLotsProvider, PendingPL } from "./components";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

const Index1 = () => {
  const [login, setLogin] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState();
  const [pendingPL, setPendingPL] = useState();
  const [allPL, setAllPL] = useState([{}]);
  return (
    <div className="min-h-screen" >
          {!login ? (signIn ?
            <SignInForm setSignIn={setSignIn} setLogin={setLogin} setIsAdmin={setIsAdmin} setUser={setUser} setPendingPL={setPendingPL} setAllPL={setAllPL} allPL={allPL}/> :
            <SignUpForm setSignIn={setSignIn} setLogin={setLogin} setUser={setUser} />

          ) : ""}
          <div className="gradient-bg-welcome" style={!login ? { filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' } : {}}>
            <div>
              <Navbar user={user} setLogin={setLogin} setUser={setUser} setIsAdmin={setIsAdmin} />
              <Welcome />
            </div>
            <Services />
            {!isAdmin ? (<ParkingLotsProvider allPL={allPL} />) : (<PendingPL pendingPL={pendingPL} setPendingPL={setPendingPL} />)}

            <Footer />
          </div>
        </div>
  )
}

export default Index1