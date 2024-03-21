'use client'

import { auth, db } from "@/db/config";
import { MyContext } from "@/state/context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";



function SignUp() {

  const router = useRouter()

  const { setGlobalLoading } = useContext(MyContext)

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [delivery, setDelivery] = useState("")
  const [phone, setPhone] = useState("")

  const submitUser = () => {
    if (name == '' || username == '' || password == '' || password2 == '' || delivery == '' || phone == '') {
      alert("")
    } else if (password !== password2) {
      alert("Passwords")
    } else {
      setGlobalLoading(true)

      createUserWithEmailAndPassword(auth, username, password).then((userCredential) => {

        return updateProfile(userCredential.user, {
          displayName: name,
         
        }).then(() => {

          return userCredential;
        });


      }).then((userCredential) => {

        const user = userCredential.user

        setDoc(doc(db, 'users', user.uid), {
          name: name,
          phone: phone,
          delivery: delivery
        })

        router.push('/')

        setGlobalLoading(false)

      }).catch((error) => {
        alert(error.message)
        setGlobalLoading(false)
      })
    }
  }

  return (
    <div className='SigninComp h-[700px] lg:h-[93vh] relative topmargin'>

      <Image className="h-full w-full object-cover filter brightness-[50%]" height={1500} width={1500} src="/images/rug.jpg" alt="" />

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">


        <div className="w-[75%] lg:w-[370px] h-[555px] border border-neutral-500 rr backdrop-blur-[7px] p-[20px]">

          <div>
            <label className="labelsignin" htmlFor="">Username</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="inputsignin" />
          </div>
          <div>
            <label className="labelsignin" htmlFor="">Email</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="inputsignin" />
          </div>
          <div className="flex gap-[10px]">


            <div className="mt-[10px]">
              <label className="labelsignin" htmlFor="">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="inputsignin" />
            </div>
            <div className="mt-[10px]">
              <label className="labelsignin" htmlFor="">Password * </label>
              <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" className="inputsignin" />
            </div>
          </div>
          <div className="mt-[10px]">
            <label className="labelsignin" htmlFor="">Delivery</label>
            <input value={delivery} onChange={(e) => setDelivery(e.target.value)} type="text" className="inputsignin" />
          </div>
          <div className="mt-[10px]">
            <label className="labelsignin" htmlFor="">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="inputsignin" />
          </div>
          <p className="mt-[10px] text-center text-primary hover:underline">Forgot Password</p>
          <div className="flex gap-[10px] items-center">

            <button onClick={() => submitUser()} className="button2 mt-[20px]">SignUp</button>
            {/* <button className="button1 mt-[20px]">Sign Up</button> */}

          </div>
        </div>

      </div>

    </div>
  );
}

export default SignUp;