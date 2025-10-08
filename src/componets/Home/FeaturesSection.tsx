import React from "react";
import { FaUserTie, FaBookOpen, FaCertificate } from "react-icons/fa";
import { Container } from "../index";

const features = [
  {
    icon: <FaUserTie className="text-3xl text-indigo-400" />,
    title: "Expert Tutors",
    description:
      "When an unknown printer took a galley of type and scrambled makes.",
    color: "bg-indigo-100 border-[#FFF]",
  },
  {
    icon: <FaBookOpen className="text-3xl text-[#7F7E97]" />,
    title: "Effective Courses",
    description:
      "When an unknown printer took a galley of type and scrambled makes.",
    color: "bg-[#F1EEFF] border-[#D9D3FF]",
  },
  {
    icon: <FaCertificate className="text-3xl text-[#FFC224]" />,
    title: "Earn Certificate",
    description:
      "When an unknown printer took a galley of type and scrambled makes.",
    color: "bg-[#FFF8E6] border-[#FFEAA0]",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-10 md:py-20 bg-white text-center">
      <Container>
        <div className="flex justify-center items-center">
          <p className="text-xs w-fit bg-[#F1EEFF] text-indigo-600 font-semibold px-4 py-2 rounded-full">Our Top Features</p>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-[#161439] mt-3">
          Achieve Your Goal With{" "}
          <span className="text-indigo-600 ">SkillGrow</span>
        </h2>
        <p className="text-[#7F7E97] max-w-xl mx-auto mt-3">
          When an unknown printer took a galley of type and scrambled makes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl border ${feature.color}  transition-transform duration-300 hover:scale-105`}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#161439] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#7F7E97] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
