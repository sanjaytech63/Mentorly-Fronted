import React from 'react';
import { CoursesHeader, CourseCard, Button, Container } from '../../index';
import { useFetchCourses } from '../../hooks/useFetchCourses';
import { useNavigate } from 'react-router-dom';

const Courses = ({
  title = "Explore Our World's Best Courses",
  description = 'When known either took a galley of type scrambled it to make a type specimen book.',
  showViewAllButton = true,
  limit = 8
}) => {
  const { courses } = useFetchCourses({ limit });
  const navigate = useNavigate();

  const handleEnroll = (courseId: string) => {
    console.log(`Enrolling in course: ${courseId}`);
  };

  const handleViewAll = () => {
    navigate('/courses');
  };

  return (
    <section className="w-full py-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <Container>
        <CoursesHeader title={title} description={description} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {courses?.slice(0,4)?.map(course => (
            <CourseCard key={course._id} course={course} onEnroll={handleEnroll} />
          ))}
        </div>

        {showViewAllButton && courses && courses.length > 0 && (
          <div className="text-center mt-12 flex justify-center items-center">
            <Button
              variant="secondary"
              size="large"
              className="min-w-[200px] !rounded-full hover:scale-105 transition-transform"
              onClick={handleViewAll}
            >
              See All Courses →
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Courses;