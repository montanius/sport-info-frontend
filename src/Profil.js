import React, { useState } from "react";

async function Profil (){
    const users = await fetch('http://localhost:4000/api/users', {
        method: "GET",
headers : {"content-type" :"application/json", authorization : localStorage.getItem("token")}
    });
console.log(users);
return(
    <div>
<h1> Dobro došli </h1>
</div>
);
}

export default Profil;