import { createContext, useState } from "react";

// Extending the context to include authentication states
export const ClickCountContext = createContext({
  clickCount: 0,
  setClickCount: (value: number) => {},
  yourName: "",
  setYourName: (value: string) => {},
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  username: "", // Add username field
  setUsername: (value: string) => {}, // Setter for username
  userPassword: "",
  setUserPassword: (value: string) => {},
  //add email field
  userEmail: "",
  setUserEmail: (value: string) => {},
});

const ClickCountProvider = ({ children }: { children: any }) => {
  const [clickCount, setClickCount] = useState(0);
  const [yourName, setYourName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Replace userEmail with username
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <ClickCountContext.Provider
      value={{
        userEmail,
        setUserEmail,
        clickCount,
        setClickCount,
        yourName,
        setYourName,
        isAuthenticated,
        setIsAuthenticated,
        username,
        setUsername,
        userPassword,
        setUserPassword,
      }}
    >
      {children}
    </ClickCountContext.Provider>
  );
};

export default ClickCountProvider;
