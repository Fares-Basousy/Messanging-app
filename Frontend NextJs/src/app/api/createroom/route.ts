import { NextResponse } from 'next/server'
export  async function POST(req ) {
  const body = await req.json()
  const request = await req
  const cookieHeader = request.headers.get('cookie')
  const accessTokenPattern = /access_token=([^;]+)/;  // Use regex to extract the access_token
  const match = cookieHeader.match(accessTokenPattern);
  const accessToken = match ? match[1] : null; 


  
  const res = await fetch('http://localhost:4000/user/createchat', {
    method: "POST",
    headers: {"Content-Type": "application/json",
    "authorization" : ("bearer " + accessToken) },
    body: JSON.stringify(body)})

    const response = await res.json()
      if(response.statusCode == 201){
        const response = await res.json()
      }
  return  NextResponse.json(response)
}

