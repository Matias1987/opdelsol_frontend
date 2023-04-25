import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import useStorage from "./useStorage";
import { redirect } from 'next/navigation';
//const urls = require("./src/urls")
export function middleware(request: NextRequest) {
    /*fetch("http://localhost:3000/api/v1/usuarios/l/checklogin/")
    .then(response=>response.json())
    .then((response)=>{
      if(response.data.loged == 1){
        console.log("user is loged!!!!")
        return NextResponse.next()
      }
      else{
        console.log("user is NOT loged!!!!")
        const url = request.nextUrl.clone()
        url.pathname = "/v1/usuario/login/login"
        console.log(url)
        return NextResponse.redirect(url) 
        //redirect("/v1/usuario/login/login")
        //return NextResponse.rewrite(request.nextUrl)
        //window.location.replace("http://www.w3schools.com");
      }

      
    })*/
    //console.log("REQUEST: " +JSON.stringify(request))
    //request.nextUrl.pathname = "/v1/usuario/login/login";
    //return NextResponse.redirect(request.nextUrl);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpYXQiOjE2ODI0NjEwMjksImV4cCI6MTY4MjQ2NDYyOX0.Unf5zmxNVQCJVD4qxSAcdcmsrs1s-q4h7Q0e2dYHHEo";
    //check if user loged
    fetch("http://localhost:3000/api/v1/usuarios/l/checklogin/"+token)
    .then(response=>response.json())
    .then((response)=>{
      if(response.data.logged == 1){
        console.log("user is loggedIn!!!!")
        return NextResponse.next()
      }else{
        console.log("user is not logged")
        request.nextUrl.pathname = "/v1/usuario/login/login";
        redirect("/")
        return NextResponse.redirect(request.nextUrl);
      }
    }
    )
    /*console.log("middleware")
    const { getItem } = useStorage();
    console.log(getItem("token",'session'));

    if(typeof window !== 'undefined'){
      console.log("lalalala")
      console.log(window.sessionStorage.token)
    }*/
  
  }

  // See "Matching Paths" below to learn more
export const config = {
    matcher: '/v1/deposito/:path*',
  }