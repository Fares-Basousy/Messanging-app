"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState('hidden');
  const [data, setData] = useState({ name: "", password: "", email: "" });
  const router = useRouter()

  const handleInput= (event)=>{
    const {name, value} = event.target
      setData((prev)=>({
          ...prev,
        [name]: value,
      }))
    }

  async function handleSubmit(event) {
    event.preventDefault();    
    const formData = new FormData(event.target);
    const data =  { 
      email: formData.get("email"),
      password: formData.get("password"),
      name : formData.get("name")};
    await fetch("../api/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const response  = await res.json() //to read readable stream
      console.log(response)
      if (res.status== 200)
      {console.log(response)
       router.push('/auth/login') 
      }
      else {
        setDisplay('');
        setMessage(response.message);}
    })
    .catch((error) => {
      setDisplay('');
      console.log(error.message);
      setMessage("error");
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="transition-all bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2  flex flex-col text-left "
        onSubmit={handleSubmit}
      >
        <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl  text-center">
            Register
          </h3>
          <br />
          <label className="block mb-2 font-bold text-gray-600">
            Username:
            <br />
            <input
              required
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
              type="text"
              placeholder="Willy Wonka"
              min='3'
              max='25'
              name="name"
              value={data.name}
              onChange={handleInput}
            />
            <br />
          </label>{" "}
          <br />
          <label className="block mb-2 font-bold text-gray-600">
            Email:
            <br />
            <input
              required
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
              type="email"
              placeholder="you@coolmail.com"
              name="email"
              value={data.email}
              onChange={handleInput}
            />
            <br />
          </label>{" "}
          <br />
          <label className="block mb-2 font-bold text-gray-600">
            Password:
            <br />
            <input
              required
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
              type="password"
              placeholder="password"
              name="password"
              value={data.password}
              onChange={handleInput}
            />
            <br />
          </label>
          <br />
          <input
            value="Register"
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          />
          <p
            className={
              "mb-4  font-extrabold leading-none tracking-tight text-red-600   text-center " +
              display
            }
          >
            {message}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Already have an account?.{" "}
            <Link
              href="./login"
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login bruh
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}


