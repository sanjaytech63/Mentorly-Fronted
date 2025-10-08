import React from "react";
import { Button, Container } from "../index";

const AboutSection: React.FC = () => {
    return (
        <section className="bg-[#F9F9FB] py-16 sm:py-20">
            <Container >
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-16">
                    <div className=" transition-transform duration-300 flex-1 hover:scale-105 ">
                        <img
                            src="https://cdn.pixabay.com/photo/2023/11/29/12/29/kid-8419485_1280.jpg"
                            alt="Student"
                            className="w-full rounded-2xl object-cover"
                        />
                    </div>

                    <div className="flex-1 text-center lg:text-left space-y-6 ">
                        <button className="text-xs bg-[#F1EEFF] text-indigo-600 font-semibold px-4 py-2 rounded-full">
                            Get More About Us
                        </button>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#161439] leading-snug">
                            Thousand Of Top{" "}
                            <span className="bg-[#FFC224] px-2 rounded-md">Courses</span>  Now In One Place
                        </h2>

                        <p className="text-[#7F7E97] ">
                            Groove’s intuitive shared inbox makes it easy  for team members to Now In One Place
                            organize, prioritize and share classes seamlessly.
                        </p>

                        <ul className="space-y-3 text-[#161439] font-medium">
                            <li className="flex items-center justify-center lg:justify-start gap-3">
                                <span className="text-[#FFC224]">✔</span> The Most World Class Instructors
                            </li>
                            <li className="flex items-center justify-center lg:justify-start gap-3">
                                <span className="text-[#FFC224]">✔</span> Access Your Class Anywhere
                            </li>
                            <li className="flex items-center justify-center lg:justify-start gap-3">
                                <span className="text-[#FFC224]">✔</span> Flexible Course Plan
                            </li>
                        </ul>

                        <div className="flex items-center justify-center md:justify-start">
                            <Button className="text-white px-6 py-3 !rounded-full font-semibold shadow-md transition duration-300">
                            Start Free Trial →
                        </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AboutSection;
