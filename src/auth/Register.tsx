import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputField from '../componets/InputField';
import { BiLock, BiMailSend } from 'react-icons/bi';
import Button from '../componets/Button';
import { FiUserPlus } from 'react-icons/fi';
import { register } from '../api/authService';
import { handleError, handleSuccess } from '../utils/toastHandler';
import { registerUserSchema } from '../validations/userValidation';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: '', password: '', fullName: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [e]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password, fullName } = registerUserSchema.parse(formData);

      const data = await register(fullName, email, password);

      handleSuccess(data.message);

      setFormData({ email: '', password: '', fullName: '' });
      setErrors({ email: '', password: '', fullName: '' });
      navigate('/login');
    } catch (err: any) {
      if (err instanceof Error && 'issues' in err) {
        const zodError = err as any;
        const fieldErrors: any = {};

        if (Array.isArray(zodError.issues)) {
          zodError.issues.forEach((issue: any) => {
            if (issue.path?.[0]) fieldErrors[issue.path[0]] = issue.message;
          });
        }

        setErrors(fieldErrors);
      } else {
        handleError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Sign in to your account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              type="text"
              name="fullName"
              label="Full name"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange('fullName')}
              error={errors.fullName}
              icon={<BiMailSend />}
            />

            <InputField
              type="email"
              name="email"
              label="Email address"
              placeholder="Enter your email"
              value={formData?.email}
              onChange={handleChange('email')}
              error={errors.email}
              icon={<BiMailSend />}
            />

            <InputField
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleChange('password')}
              error={errors.password}
              icon={<BiLock />}
            />
          </div>

          <div>
            <Button
              isLoading={loading}
              type="submit"
              className="w-full  flex items-center justify-center py-2.5 space-x-2 rounded-md text-sm"
            >
              <FiUserPlus size={16} />
              <span>Sign Up</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
