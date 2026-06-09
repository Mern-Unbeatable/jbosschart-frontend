import React, { useRef } from 'react';
import { Eye, EyeOff, Upload } from 'lucide-react';

const ConsultantForm = ({
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  consultantStep,
  setConsultantStep,
  isLoading,
  handleSubmit,
}) => {
  const fileInputRef = useRef(null);

  return (
    <>
      {consultantStep === 1 && (
        <>
          <div className="space-y-1">
            <label className="text-base font-semibold text-gray-700">Name</label>
            <input name="name" required onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="Enter your name..." />
          </div>
          <div className="space-y-1">
            <label className="text-base font-semibold text-gray-700">Email</label>
            <input name="email" type="email" required onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="Enter your email here..." />
          </div>
          <div className="space-y-1">
            <label className="text-base font-semibold text-gray-700">Username</label>
            <input name="username" required onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="Enter your user name..." />
          </div>
          <div className="space-y-1">
            <label className="text-base font-semibold text-gray-700">Phone Number</label>
            <input name="phone" required onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="+880 1XXX XXXXXX" />
          </div>
          <div className="space-y-1">
            <label className="text-base font-semibold text-gray-700">About</label>
            <textarea name="about" onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm h-24" placeholder="Briefly describe your background..." />
          </div>
          <div className="space-y-1">
            <label className="text-base font-semibold text-gray-700">Upload Image</label>
            <div>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
                ref={fileInputRef}
              />
              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="relative border-2 border-dashed border-gray-200 bg-[#FEF5E7] mt-1 rounded-xl h-40 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-orange-50 transition-colors overflow-hidden"
              >
                {formData && formData.imagePreview ? (
                  <img src={formData.imagePreview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload size={32} className="mb-2 z-10" />
                    <p className="text-sm text-center z-10">JPEG • Max 1 photos • 1920x1080px recommended</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {consultantStep === 2 && (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-base font-semibold text-gray-700">Area of Expertise</label>
              <input name="expertise" onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm mt-2" placeholder="Select your primary skill" />
            </div>
            <div className="space-y-1">
              <label className="text-base font-semibold text-gray-700">Experience</label>
              <input name="experience" onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm mt-2" placeholder="e.g. 5+ Years" />
            </div>
            <div className="space-y-1">
              <label className="text-base font-semibold text-gray-700">Language</label>
              <input name="language" onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm mt-2" placeholder="English, Bengali, etc." />
            </div>
            <div className="space-y-1">
              <label className="text-base font-semibold text-gray-700">Location</label>
              <input name="location" onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm mt-2" placeholder="City, Country" />
            </div>

            <div className="space-y-1 relative">
              <label className="text-base font-semibold text-gray-700">Password</label>
              <input type={showPassword ? "text" : "password"} name="password" required onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="Enter password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="space-y-1 relative">
              <label className="text-base font-semibold text-gray-700">Confirm Password</label>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required onChange={handleInputChange} className="w-full p-3 bg-[#FEF5E7] rounded-lg outline-none text-sm" placeholder="Confirm password" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-gray-400">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </>
      )}

      <button 
        type="submit" 
        className="w-full bg-[#E2AB0B]  text-white py-3.5 rounded-lg font-bold text-base shadow-md  transition-all active:scale-[0.98]"
      >
        {isLoading ? 'Processing...' : (consultantStep === 1 ? 'Next' : 'Request Submit')}
      </button>
    </>
  );
};

export default ConsultantForm;
