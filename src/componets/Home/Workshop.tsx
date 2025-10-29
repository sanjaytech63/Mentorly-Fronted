import React from 'react';
import { Button, Container } from '../../index';
import { useAuth } from '../../hooks/useAuth';

const Workshop = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="bg-white text-gray-900 min-h-[70vh] relative overflow-hidden py-10 md:py-20">
      <Container>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-6 z-10 text-center lg:text-left w-full">
            <button className="text-xs bg-[#F1EEFF] text-indigo-600 font-semibold px-4 py-2 rounded-full">
              Free Workshop
            </button>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Join Our Free <span className="bg-[#FFC224] px-2 rounded-md">Workshop</span>
            </h3>

            <p className="text-[#6D6C80] text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
              Edhen, an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries but also the leap into
              electronic typesetting Groove’s intuitive shared inbox makes it easy for team members
              to Now In One Place organize, prioritize and share classes seamlessly. .
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 mt-6">
              <Button className="!rounded-full px-6 py-2 font-semibold shadow-md">
                Register Now
              </Button>
            </div>
          </div>

          <div className="flex-1 relative justify-center items-center ">
            <div className="transition-transform duration-300 hover:scale-105">
              <img
                src="https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_960_720.jpg"
                alt="Workshop"
                className="rounded-xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Workshop;
