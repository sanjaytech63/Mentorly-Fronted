import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Rating, Badge, Card, Tabs, Loader } from '../../index';
import { getCourseById, getSimilarCourses } from '../../api/course.service';
import { Course } from '../../types/course.types';
import {
  FiClock,
  FiUsers,
  FiBook,
  FiStar,
  FiPlay,
  FiDownload,
  FiShare2,
  FiHeart,
  FiArrowLeft,
  FiCheck,
  FiBarChart2,
  FiArrowRight,
} from 'react-icons/fi';
import {
  getBadgeColor,
  getBadgeLabel,
  getCategoryColor,
  getLevelColor,
  getLevelLabel,
} from '../../utils';
import CourseCard from '../CourseCard';
import { BlogHeader } from '../BlogHeader';
import { handleSuccess } from '../../utils/toastHandler';
import ShareDropdown from '../ShareDropdown';

const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [similarCourses, setSimilarCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const courseData: any = await getCourseById(id!);
      setCourse(courseData.course || courseData);

      const similar = await getSimilarCourses(id!);
      setSimilarCourses(similar);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch course details');
      console.error('Error fetching course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    console.log('Enrolling in course:', course?._id);
    setIsEnrolled(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course?.title,
        text: course?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      handleSuccess('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="medium" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error || 'The course you are looking for does not exist.'}
          </p>
          <Button onClick={() => navigate('/courses')}>Browse All Courses</Button>
        </div>
      </div>
    );
  }

  const hasDiscount =
    course.discountedPrice != null && course.discountedPrice < course.originalPrice;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((course.originalPrice - (course.discountedPrice ?? 0)) / course.originalPrice) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader blog={course} />

      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 ">
            {/* Course Header */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-baseline-last justify-between">
                <div className="flex flex-wrap items-center capitalize gap-2 mb-4">
                  <Badge variant="primary" className={`${getCategoryColor(course.category)}`}>
                    {course.category}
                  </Badge>
                  <div className=" hidden md:block">
                    <Badge variant="secondary" className={getLevelColor(course.level)}>
                      {getLevelLabel(course.level)}
                    </Badge>
                  </div>
                  {course.badge && (
                    <Badge variant="success" className={getBadgeColor(course.badge)}>
                      {getBadgeLabel(course.badge)}
                    </Badge>
                  )}
                  {course.isFeatured && (
                    <Badge variant="warning">
                      <FiStar className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <div>
                  <ShareDropdown course={course} />
                </div>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">{course.description}</p>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-3">
                  <Rating rating={course.rating} reviewCount={course.reviewCount} />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="hidden md:flex items-center gap-1">
                    <FiUsers className="w-4 h-4" />
                    <span>{course.students?.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    <span>{course.totalHours} total hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiBook className="w-4 h-4" />
                    <span>{course.lectures} lectures</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Tabs */}
            <div className="bg-white rounded-2xl shadow-sm">
              <Tabs
                value={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { value: 'overview', label: 'Overview' },
                  { value: 'curriculum', label: 'Curriculum' },
                  { value: 'instructor', label: 'Instructor' },
                ]}
              />

              <div className="p-6">
                {activeTab === 'overview' && <OverviewTab course={course} />}
                {activeTab === 'curriculum' && <CurriculumTab course={course} />}
                {activeTab === 'instructor' && <InstructorTab course={course} />}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Course Card */}
              <Card className="p-6 border border-gray-200 shadow-none">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {hasDiscount ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{course.discountedPrice}
                        </span>
                        <span className="text-xl text-gray-500 line-through">
                          ₹{course.originalPrice}
                        </span>
                        <Badge variant="danger" size="sm">
                          {discountPercentage}% OFF
                        </Badge>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{course.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleEnroll} className="w-full" disabled={isEnrolled}>
                      {isEnrolled ? (
                        <>
                          <FiCheck className="w-5 h-5 mr-2" />
                          Enrolled
                        </>
                      ) : (
                        <>
                          <FiPlay className="w-5 h-5 mr-2" />
                          Enroll Now
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">30-day money-back guarantee</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Level</span>
                      <span className="font-medium">{getLevelLabel(course.level)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{course.totalHours} hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Lectures</span>
                      <span className="font-medium">{course.lectures}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Access</span>
                      <span className="font-medium">Lifetime</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full text-center text-indigo-600 hover:text-indigo-800 font-medium">
                      <FiDownload className="w-4 h-4 inline mr-2" />
                      Download Resources
                    </button>
                  </div>
                </div>
              </Card>

              {/* Instructor Card */}
              <Card className="p-6 border border-gray-200 shadow-none">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {course.instructor?.[0]?.toUpperCase() || 'I'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">By {course.instructor}</h3>
                    <p className="text-sm text-gray-600">Course Instructor</p>
                  </div>
                </div>
                <Button className="w-full">View Profile</Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Similar Courses */}
        {similarCourses.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Similar Courses</h2>
              <div className="text-center  flex justify-center">
                <Button className="py-3" onClick={() => navigate('/courses')}>
                  <span>View All</span>
                  <FiArrowRight />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCourses.map(similarCourse => (
                <CourseCard
                  key={similarCourse._id}
                  course={similarCourse}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
};

// Tab Components
const OverviewTab: React.FC<{ course: Course }> = ({ course }) => {
  const features = [
    { icon: FiClock, text: `${course.totalHours} hours on-demand video` },
    { icon: FiBook, text: `${course.lectures} lectures` },
    { icon: FiDownload, text: 'Downloadable resources' },
    { icon: FiBarChart2, text: 'Assignments and exercises' },
    { icon: FiPlay, text: 'Lifetime access' },
    { icon: FiCheck, text: 'Certificate of completion' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <feature.icon className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {course.tags && course.tags.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills you'll gain</h3>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag, index) => (
              <Badge key={index} variant="primary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Description</h3>
        <div className="prose max-w-none text-gray-700">
          <p>{course.description}</p>
        </div>
      </div>
    </div>
  );
};

const CurriculumTab: React.FC<{ course: Course }> = ({ course }) => {
  // Mock curriculum data - you would get this from your API
  const sections = [
    {
      title: 'Introduction',
      lectures: 5,
      duration: '45min',
      items: [
        { title: 'Welcome to the Course', duration: '5min', type: 'video' },
        { title: 'Course Overview', duration: '10min', type: 'video' },
        { title: 'Setting Up Environment', duration: '15min', type: 'video' },
        { title: 'Introduction Quiz', duration: '15min', type: 'quiz' },
      ],
    },
    {
      title: 'Core Concepts',
      lectures: 8,
      duration: '2h 30min',
      items: [
        { title: 'Understanding Fundamentals', duration: '20min', type: 'video' },
        { title: 'Advanced Techniques', duration: '25min', type: 'video' },
        { title: 'Practice Exercise', duration: '45min', type: 'exercise' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Course Content</h3>
          <p className="text-gray-600">
            {course.lectures} lectures • {course.totalHours} total hours
          </p>
        </div>
        <Button variant="outline">
          <FiDownload className="w-4 h-4 mr-2" />
          Download All Resources
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map((section, sectionIndex) => (
          <Card
            key={sectionIndex}
            className="p-0 overflow-hidden border border-gray-200 shadow-none"
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{section.title}</h4>
                <span className="text-sm text-gray-600">
                  {section.lectures} lectures • {section.duration}
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.type === 'video'
                          ? 'bg-blue-100 text-blue-600'
                          : item.type === 'quiz'
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {item.type === 'video' && <FiPlay className="w-4 h-4" />}
                      {item.type === 'quiz' && <FiBarChart2 className="w-4 h-4" />}
                      {item.type === 'exercise' && <FiCheck className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{item.duration}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const InstructorTab: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {course.instructor?.[0]?.toUpperCase() || 'I'}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor}</h3>
          <p className="text-gray-600 mb-4">Senior Instructor & Industry Expert</p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FiStar className="w-4 h-4 text-yellow-400" />
              <span>4.8 Instructor Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <FiUsers className="w-4 h-4" />
              <span>50,000+ Students</span>
            </div>
            <div className="flex items-center gap-1">
              <FiPlay className="w-4 h-4" />
              <span>15 Courses</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prose max-w-none text-gray-700">
        <p>
          With over 10 years of experience in the industry, {course.instructor} is passionate about
          sharing knowledge and helping students achieve their goals. Their teaching style focuses
          on practical, real-world applications that you can use immediately in your career.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-3">Professional Background</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>Senior Developer at Tech Company</li>
          <li>Certified Professional Instructor</li>
          <li>Open Source Contributor</li>
          <li>Conference Speaker</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
