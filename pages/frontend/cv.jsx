import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { create_cv } from "@/Services/job";

export default function CreateCV() {
  const router = useRouter();
  const activeUser = useSelector((state) => state.User.userData);
  const [formikData, setFormikData] = useState({
    name: activeUser?.name,
    email: activeUser?.email,
    seeGrade: 0,
    undergrad: 0,
    graduate: 0,
    skills: "",
    hobbies: "",
    experienceYears: 0,
    user: activeUser?._id,
    summary: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    about: "",
    user: "",
    cv: "",
  });

  const {
    name,
    email,
    summary,
    user,
    seeGrade,
    undergrad,
    graduate,
    skills,
    hobbies,
    experienceYears,
  } = formikData;

  useEffect(() => {
    if (!user || !Cookies.get("token")) {
      toast.error("Please login first.");
      router.push("/auth/login");
    }
  }, [activeUser, user, Cookies]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError({ ...error, name: "Name Field is required" });
      return;
    }

    if (!email) {
      setError({ ...error, email: "Email Field is required" });
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("summary", summary);
    form.append("user", user);
    form.append("seeGrade", seeGrade);
    form.append("undergrad", undergrad);
    form.append("graduate", graduate);
    form.append("skills", skills);
    form.append("hobbies", hobbies);
    form.append("experienceYears", experienceYears);
    console.log(form);

    const res = await create_cv(form);
    if (res.success) {
      toast.success("Your Application is Submitted , Redirecting ... ");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full  py-20 flex items-center  justify-center flex-col">
        <h1 className="text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl">
          Enter Your Info
        </h1>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="sm:w-1/2 w-full px-4 mx-4  h-full"
        >
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Name :
            </label>
            <input
              name="name"
              onChange={(e) =>
                setFormikData({ ...formikData, name: e.target.value })
              }
              type="text"
              id="title"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Name "
            />
            {error.name && <p className="text-sm text-red-500">{error.name}</p>}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="email" className="mb-1 text-base font-semibold">
              Email :
            </label>
            <input
              name="email"
              value={email}
              disabled
              type="email"
              id="email"
              className="w-full  py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Email"
            />
            {error.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="summary" className="mb-1 text-base font-semibold">
              Summary :
            </label>
            <textarea
              name="summary"
              onChange={(e) =>
                setFormikData({ ...formikData, summary: e.target.value })
              }
              type="summary"
              id="summary"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter summary"
            />
            {error.summary && (
              <p className="text-sm text-red-500">{error.summary}</p>
            )}
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="seeGrade" className="mb-1 text-base font-semibold">
              SEE Grade :
            </label>
            <input
              name="seeGrade"
              onChange={(e) =>
                setFormikData({ ...formikData, seeGrade: e.target.value })
              }
              type="number"
              id="seeGrade"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter SEE Grade"
            />
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="undergrad" className="mb-1 text-base font-semibold">
              Undergraduate Grade :
            </label>
            <input
              name="undergrad"
              onChange={(e) =>
                setFormikData({ ...formikData, undergrad: e.target.value })
              }
              type="number"
              id="undergrad"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Undergraduate Grade"
            />
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="graduate" className="mb-1 text-base font-semibold">
              Graduate Grade :
            </label>
            <input
              name="graduate"
              onChange={(e) =>
                setFormikData({ ...formikData, graduate: e.target.value })
              }
              type="number"
              id="graduate"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Graduate Grade"
            />
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="skills" className="mb-1 text-base font-semibold">
              Programming skills (separate with commas) :
            </label>
            <input
              name="skills"
              onChange={(e) =>
                setFormikData({ ...formikData, skills: e.target.value })
              }
              type="text"
              id="skills"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter skills"
              required
            />
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="hobbies" className="mb-1 text-base font-semibold">
              Hobbies (separate with commas) :
            </label>
            <input
              name="hobbies"
              onChange={(e) =>
                setFormikData({ ...formikData, hobbies: e.target.value })
              }
              type="text"
              id="hobbies"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter hobbies"
            />
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="experienceYears"
              className="mb-1 text-base font-semibold"
            >
              Experience years :
            </label>
            <input
              name="experienceYears"
              onChange={(e) =>
                setFormikData({
                  ...formikData,
                  experienceYears: e.target.value,
                })
              }
              type="number"
              id="experienceYears"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter experience years"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
