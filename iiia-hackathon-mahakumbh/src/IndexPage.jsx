import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// Your component code...

export default function IndexPage() {
  const [showMembers, setShowMembers] = useState(false); // State to manage visibility of team members
  const backgroundImage =
    "https://cse.noticebard.com/wp-content/uploads/sites/23/2023/05/NB-Featured-Image-2-1.jpg";
  // Function to toggle visibility of team members
  const toggleMembersVisibility = () => {
    setShowMembers(!showMembers);
  };
  const backgroundImage2 =
    "https://upload.wikimedia.org/wikipedia/en/7/7d/National_Institute_of_Technology%2C_Jamshedpur_Logo.png";
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div
        className="flex ml-4vw"
        style={{ justifyContent: " space-evenly", backgroundColor: "#898121" }}
      >
        {screenWidth >= 768 && (
          <div>
            <img
              className="lg:w-[30vw] lg:h-[20vw] lg:sticky lg:top-20 bg-white sm:w-0 sm:h-0"
              src={backgroundImage}
              alt="Background Image"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <div className="container flex flex-col items-center bg-[#E5C287]">
          <div className="Mahakumbh text-center">
            <p className="text-6xl mb-8 underline">Mahakumbh</p>

            <img
              className="lg:w-[40vw] md:w-[vw]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBkyEVzBjYIDWq89a0bzyVQ-MLmPmuQzTzWg&usqp=CAU"
              alt="mahakubh image"
            />
            <p className="lg:w-[40vw]">
              The Kumbh Mela, often referred to simply as the "Mahakumbh," is
              one of the largest and most sacred gatherings of Hindu pilgrims in
              the world. It is a massive religious festival that occurs every 12
              years, rotating between four major pilgrimage sites in India:
              Haridwar, Prayagraj (formerly Allahabad), Nashik, and Ujjain. The
              Mahakumbh is considered particularly auspicious and occurs every
              12th year in Prayagraj, at the confluence of the sacred rivers
              Ganges, Yamuna, and Saraswati.
            </p>
            <a
              href="https://rrudraksha.com/mahakumbh-festival-an-introduction/"
              className="text-blue-500 underline"
            >
              Read more
            </a>
          </div>
          <motion.div
            animate={{ x: [0, -150, 0] }}
            className="functions text-center border border-black rounded lg:w-[31vw] box-border mb-5 mt-4"
          >
            <p className="text-4xl underline mb-3">Functions</p>
            <div className="faceRec">
              <Link to="/face">
                <button className="text-3xl">{"->"} Face Recognition</button>
              </Link>
            </div>
            <div className="crowd">
              <Link to="/traffic">
                <button className="text-3xl">{"->"} Traffic Management</button>
              </Link>
            </div>
            <div className="traffic mb-3">
              <Link to="/crowdmanagement">
                <button className="text-3xl">{"->"} Crowd Management</button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            animate={{ x: [0, 150, 0] }}
            className="team text-center border border-black rounded p-4 mb-8"
          >
            <button className="text-3xl underline mb-2">Team members</button>

            {1 && (
              <div className="mb-2">
                <p className="text-3xl text-[#898121] underline">
                  Harshit Shrivastav (Team leader)
                </p>
                <p className="text-3xl text-[#898121] ">Pratap Kumar</p>
                <p className="text-3xl text-[#898121]">Mayank Raj</p>
                <p className="text-3xl text-[#898121]">Hitanshu Gavri</p>
                <p className="text-3xl text-[#898121]">Soumyabrata Das</p>
                <p className="text-3xl text-[#898121]">Abhijeet Trivedi</p>
                {/* Add more team member names here */}
              </div>
            )}
          </motion.div>
        </div>
        {screenWidth >= 768 && (
          <div>
            <img
              className="lg:w-[30vw] lg:h-[20vw] lg:sticky lg:top-20 bg-white sm:w-0 sm:h-0"
              src={backgroundImage2}
              alt="Background Image"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}