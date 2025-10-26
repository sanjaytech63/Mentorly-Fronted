import React, { useState } from 'react';
import { Course, CoursesProps } from '../../types/course';
import { CoursesHeader, CategoryFilter, CourseCard, Button, Container } from '../../index';

const Courses: React.FC<CoursesProps> = ({
  courses = defaultCourses,
  categories = ['All Courses', 'Design', 'Business', 'Development'],
  title = "Explore Our World's Best Courses",
  description = 'When known either took a galley of type scrambled it to make a type specimen book.',
  showViewAllButton = true,
}) => {
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'All Courses') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => course.category === category));
    }
  };

  const handleEnroll = (courseId: string) => {
    console.log(`Enrolling in course: ${courseId}`);
    // Add your enrollment logic here
  };

  return (
    <section className="w-full py-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <Container>
        <CoursesHeader title={title} description={description} />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
          ))}
        </div>

        {showViewAllButton && (
          <div className="text-center mt-12 flex justify-center  items-center">
            <Button variant="secondary" size="large" className="min-w-[200px] !rounded-full">
              See All Courses →
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

// Default courses data
const defaultCourses: Course[] = [
  {
    id: '1',
    image: 'https://cdn.pixabay.com/photo/2016/03/27/19/00/coffee-1283672_1280.jpg',
    category: 'Development',
    title: 'Learning JavaScript with imagination',
    instructor: 'Lemma',
    originalPrice: 20.0,
    rating: 4.4,
    reviewCount: 44,
    duration: '06h 20m',
    students: 22,
    badge: 'Regiment',
    discountedPrice:2000
  },
  {
    id: '2',
    image: 'https://cdn.pixabay.com/photo/2020/03/06/08/00/laptop-4906312_1280.jpg',
    category: 'Design',
    title: 'The Complete Graphic Design for Beginners',
    instructor: 'Wilson',
    originalPrice: 20.0,
    discountedPrice: 10.0,
    rating: 4.3,
    reviewCount: 43,
    duration: '07h 45m',
    students: 202,
    icon: '☁️',
    badge: 'CloudCourse',
    iconType: 'cloud',
  },
  {
    id: '3',
    image: 'https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg',
    category: 'Development',
    title: 'Learning JavaScript with imagination',
    instructor: 'Warren',
    originalPrice: 20.0,
    rating: 4.5,
    reviewCount: 45,
    duration: '06h 20m',
    students: 66,
    icon: 'S2',
    badge: 'Execution',
    iconType: 'code',
  },
  {
    id: '4',
    image: 'https://cdn.pixabay.com/photo/2020/09/22/18/02/man-5593901_1280.jpg',
    category: 'Business',
    title: 'Financial Analyst Training & Investing Course',
    instructor: 'Robert Fox',
    originalPrice: 20.0,
    discountedPrice: 15.0,
    rating: 4.2,
    reviewCount: 42,
    duration: '05h 20m',
    students: 22,
    icon: '6',
    badge: 'Innovate',
    iconType: 'chart',
  },
];

export default Courses;
