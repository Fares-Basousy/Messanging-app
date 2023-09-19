import { NextResponse } from "next/server"

export  async function POST(req: Request) {
  const request = await req.json()
  console.log(request)
  console.log('im reg')
  const res = await fetch('http://localhost:4000/auth/signup', {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(request),})


  return NextResponse.json(res) }

