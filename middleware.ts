import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { redirect } from 'next/navigation';
//const urls = require("./src/urls")
export function middleware(request: NextRequest) {
    fetch("http://localhost:3000/api/v1/usuarios/l/checklogin/")
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
        //redirect("/v1/usuario/login/login")
        return NextResponse.redirect(url) 
        //return NextResponse.rewrite(request.nextUrl)
        //window.location.replace("http://www.w3schools.com");
      }

      
    })

  //console.log(request.nextUrl);
   
    //return NextResponse.redirect(new URL('/about-2', request.url))
    //const allCookies = request.cookies.getAll()
    //console.log(allCookies)
    //return NextResponse.next()
  }

  // See "Matching Paths" below to learn more
export const config = {
    matcher: '/v1/deposito/:path*',
  }