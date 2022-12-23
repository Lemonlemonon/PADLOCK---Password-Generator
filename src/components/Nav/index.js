import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
    import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
    

    
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/contact" activeStyle>
            Contact Us
          </NavLink>
          <NavLink to="/blogs" activeStyle>
            Blogs
          </NavLink>
          <NavLink to="/signin" activeStyle>
            Sign in
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;