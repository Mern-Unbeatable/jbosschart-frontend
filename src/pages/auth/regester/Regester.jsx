import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../../config';
import { ArrowLeft, User, Briefcase, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { signUp } from '../../../services/authApi';
import ConsultantForm from './components/ConsultantForm';
import CustomerForm from './components/CustomerForm';

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState('select'); 
  const [role, setRole] = useState(null); 
  const [consultantStep, setConsultantStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '', email: '', username: '', phone: '', about: '',
    expertise: '', experience: '', language: '', location: '',
    category: '', topics: '', password: '', confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === 'file') {
      const file = files && files[0];
      setFormData((prev) => {
        if (prev.imagePreview) {
          try {
            URL.revokeObjectURL(prev.imagePreview);
          } catch (err) {}
        }
        return {
          ...prev,
          [name]: file,
          imagePreview: file ? URL.createObjectURL(file) : null,
        };
      });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Revoke object URL when preview changes or on unmount
  useEffect(() => {
    return () => {
      if (formData.imagePreview) {
        try {
          URL.revokeObjectURL(formData.imagePreview);
        } catch (err) {}
      }
    };
  }, [formData.imagePreview]);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep('form');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === 'consultant' && consultantStep === 1) {
      setConsultantStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Password and confirm password do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', formData.name || '');
      fd.append('email', formData.email || '');
      fd.append('username', formData.username || '');
      fd.append('password', formData.password || '');
      fd.append('confirmPassword', formData.confirmPassword || '');
      fd.append('role', role === 'customer' ? 'USER' : 'CONSULTANT');
      if (formData.phone) fd.append('phone', formData.phone);
      if (formData.about) fd.append('bio', formData.about);
      if (formData.language) fd.append('language', formData.language);
      if (formData.location) fd.append('location', formData.location);
      if (formData.avatar) fd.append('avatar', formData.avatar);

      const { data, error } = await signUp(fd);

      if (error) {
        const message = error?.response?.data?.message || 'Registration failed. Please try again.';
        toast.error(message);
        return;
      }

      toast.success(data?.message || 'Registration successful! Please login.');
      navigate(ROUTES.LOGIN);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden lg:block lg:w-1/2 relative shrink-0">
        <img 
          src={role === 'consultant' ? "/login.jpg" : "/login.jpg"} 
          alt="Registration Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-6 bg-white shadow-[-10px_0px_20px_rgba(0,0,0,0.05)] overflow-y-auto">
        
        {step === 'select' ? (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-3">
                <div className="bg-[#FEF5E7] p-3 rounded-lg">
                  <Briefcase className="text-[#E2AB0B]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
            </div>
            
            <button 
              onClick={() => handleRoleSelect('customer')} 
              className="w-full flex items-center p-5 border border-gray-200 rounded-2xl hover:border-[#E2AB0B] transition-all group bg-white shadow-sm"
            >
              <div className="bg-[#FEF5E7] p-4 rounded-full mr-4 group-hover:bg-[#E2AB0B] transition-colors">
                <User className="text-[#E2AB0B] group-hover:text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800">I'm a Customer</h3>
                <p className="text-gray-500 text-xs text-nowrap">Find and connect with Consultant</p>
              </div>
            </button>

            <button 
              onClick={() => handleRoleSelect('consultant')} 
              className="w-full flex items-center p-5 border border-gray-200 rounded-2xl hover:border-[#E2AB0B] transition-all group bg-white shadow-sm"
            >
              <div className="bg-[#FEF5E7] p-4 rounded-full mr-4 group-hover:bg-[#E2AB0B] transition-colors">
                <Briefcase className="text-[#E2AB0B] group-hover:text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800">I'm a Consultant</h3>
                <p className="text-gray-500 text-xs text-nowrap">Grow your Skill and reach more customers</p>
              </div>
            </button>
            
            <p className="text-center text-base text-gray-500 mt-4">
              Already have an account? <Link to={ROUTES.LOGIN} className="text-[#E2AB0B] font-bold ml-1">Login</Link>
            </p>
          </div>

        ) : (
          <div className="w-full max-w-xl py-8">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => consultantStep === 2 ? setConsultantStep(1) : setStep('select')} 
                className="flex items-center text-gray-500 hover:text-[#E2AB0B] text-base font-medium"
              >
                <ArrowLeft size={16} className="mr-2" /> Back
              </button>

              <Link to={ROUTES.HOME} className="text-gray-500 hover:text-[#E2AB0B] text-base font-medium">
                Back to Home
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {role === 'customer' ? 'Create Your Account' : 'Join as Consultant'}
            </h2>
            <p className="text-gray-500 mb-8 text-base">
              {role === 'consultant' ? 'Start your journey and manage sessions effectively' : 'Please Register to Login.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {role === 'consultant' ? (
                <ConsultantForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  consultantStep={consultantStep}
                  setConsultantStep={setConsultantStep}
                  isLoading={isLoading}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <CustomerForm
                  handleInputChange={handleInputChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  isLoading={isLoading}
                />
              )}

              <p className="text-center text-base text-gray-500">
                Already have an account? <Link to={ROUTES.LOGIN} className="text-[#E2AB0B] font-bold ml-1">Login</Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;