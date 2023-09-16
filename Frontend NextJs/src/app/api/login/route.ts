import { NextResponse } from 'next/server'

export  async function POST(req) {
  const request = await req.json()
  const res = await fetch('http://localhost:4000/auth/signin', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(request)})
    const response = await res.json()
      if(response.statusCode == 201){
        const response = await res.json()
      }
  return  NextResponse.json(response)
}

