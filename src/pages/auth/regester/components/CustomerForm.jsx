import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const CustomerForm = ({
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isLoading,
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-base font-semibold text-gray-700">Name</label>
          <input name="name" onChange={handleInputChange} className="w-full mt-2 p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="Enter your name..." />
        </div>
        <div className="space-y-1">
          <label className="text-base font-semibold text-gray-700">Username</label>
          <input name="username" onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="Enter your user name..." />
        </div>
        <div className="space-y-1">
          <label className="text-base font-semibold text-gray-700">Email</label>
          <input name="email" type="email" onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="Enter your email here..." />
        </div>
        <div className="space-y-1">
          <label className="text-base font-semibold text-gray-700">Phone Number</label>
          <input name="phone" type="tel" onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="+880 1XXX XXXXXX" />
        </div>
        <div className="space-y-1 relative">
          <label className="text-base font-semibold text-gray-700">Password</label>
          <input type={showPassword ? "text" : "password"} name="password" onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="********" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="space-y-1 relative">
          <label className="text-base font-semibold text-gray-700">Confirm Password</label>
          <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="********" />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-gray-400">
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full bg-[#E2AB0B] text-white py-3.5 rounded-lg font-bold text-base shadow-md  transition-all active:scale-[0.98]"
      >
        {isLoading ? 'Processing...' : 'Request Submit'}
      </button>
    </>
  );
};

export default CustomerForm;
