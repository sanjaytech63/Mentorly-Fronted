import React from "react";
import { Button, Container } from "../index";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-28 md:py-36">
          <div className="flex-1 text-center lg:text-left space-y-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
              Learning is{" "}
              <span className="bg-[#FFC224] text-[#161439] px-3 py-1 rounded-md">
                What You
              </span>{" "}
              Make of it.
              <br className="hidden sm:block" /> Make it Yours at{" "}
              <span className="text-[#FFC224]">VideoEditing.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#EAEAEA] max-w-xl mx-auto lg:mx-0">
              Master the art of editing and storytelling with expert-led
              courses designed for creators of all levels — from beginner to pro.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button
                variant="secondary"
                className="!rounded-full px-6 py-3 text-sm sm:text-base font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Start Free Trial
              </Button>
              <button className="flex items-center justify-center gap-2 text-[#FFC224] font-semibold hover:underline text-sm sm:text-base">
                <span>▶</span> Watch Our Demo
              </button>
            </div>
          </div>

          <div className="hidden md:flex flex-1 relative justify-center items-center">
            <div className="relative w-[220px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[420px] bg-white rounded-2xl shadow-2xl p-4 transition-transform duration-300 hover:scale-105">
              <img
                src="https://cdn.pixabay.com/photo/2020/11/04/14/54/student-5712628_960_720.jpg"
                alt="Video Editing"
                className="rounded-xl w-full h-auto object-cover"
              />
              {/* <h3 className="text-[#161439] font-bold text-lg sm:text-xl mt-4 text-center">
                Full Stack Courses
              </h3> */}
            </div>

            <div className="absolute -left-3 sm:-left-6 top-8 sm:top-10 bg-white text-[#161439] rounded-lg shadow-md px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs md:text-sm font-semibold">
              🎓 36K+ Enrolled
            </div>
            <div className="absolute -right-3 sm:-right-6 bottom-6 sm:bottom-10 bg-white text-[#161439] rounded-lg shadow-md px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs md:text-sm font-semibold">
              👥 15K+ Students
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
