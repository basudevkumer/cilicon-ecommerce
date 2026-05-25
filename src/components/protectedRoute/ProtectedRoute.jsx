import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribes = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribes();
  }, [auth]);

  // Loader while Firebase checks session
  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
