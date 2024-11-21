import React from "react";
import { NavLink } from "react-router-dom";

function 

NavBar (){
    return (
        <nav>
            <ul>
                <li> <NavLink to="/">Početna </NavLink> </li>
                <li> <NavLink to="/ONama"> o nama </NavLink> </li>
                <li> <NavLink to="/Kontakt"> Kontakt </NavLink> </li>
                <li> <NavLink to="/Sportovi"> Sportovi </NavLink></li>
                <li> <NavLink to="/klubovi"> Klubovi </NavLink>
</li>
                <li> <NavLink to="/Sportisti"> Sportisti </NavLink> </li>
                <li> <NavLink to="/Registracija"> Registracija </NavLink> </li>
                <li> <NavLink to="/Prijava"> Prijava </NavLink> </li>
            </ul>
        </nav>
    );
    }

    export default NavBar;