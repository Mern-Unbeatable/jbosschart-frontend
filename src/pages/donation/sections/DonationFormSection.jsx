import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  User,
  Building2,
  Globe,
  TrendingUp,
  MapPin,
  Link,
  UploadCloud,
} from "lucide-react";

const DonationFormSection = memo(({ formData, setFormData }) => {
  const { t } = useTranslation();
  const isBusiness = formData.donorType === "business";

  return (
    <div className="container  mx-auto px-4 lg:px-6 py-14 lg:py-20">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t("donationForm.header.title")}
        </h2>
        <p className="text-gray-500 text-base">
          {t("donationForm.header.subtitle")}
        </p>
      </div>

      {/* Quote Box */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-12 ">
        <p className="text-gray-700 font-bold text-xl mb-2 ">
          {t("donationForm.quote")}
        </p>
        <p className="text-gray-400 text-base">
          {t("donationForm.attribution")}
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-xl  border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-[#F1EBF7] p-4 lg:p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-1 ">
            {t("donationForm.formHeader.title")}
          </h3>
          <p className="text-gray-500 text-base">
            {t("donationForm.formHeader.subtitle")}
          </p>
        </div>

        <div className="p-4 lg:p-6">
          <form className="space-y-6">
            {/* Standard Inputs */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-base  text-gray-600 mb-2">
                  {t("donationForm.fields.name.label")}
                </label>
                <input
                  type="text"
                  placeholder={t("donationForm.fields.name.placeholder")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#EAB308]"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base  text-gray-600 mb-2">
                    {t("donationForm.fields.email.label")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("donationForm.fields.email.placeholder")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#EAB308]"
                    value={formData.email}
                  />
                </div>
                <div>
                  <label className="block text-base  text-gray-600 mb-2">
                    {t("donationForm.fields.phone.label")}
                  </label>
                  <input
                    type="tel"
                    placeholder={t("donationForm.fields.phone.placeholder")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#EAB308]"
                    value={formData.phone}
                  />
                </div>
              </div>

              <div>
                <label className="block text-base  text-gray-600 mb-2">
                  {t("donationForm.fields.amount.label")}
                </label>
                <input
                  type="number"
                  placeholder={t("donationForm.fields.amount.placeholder")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#EAB308]"
                  value={formData.amount}
                />
              </div>
            </div>

            {/* Donor Type Selection */}
            <div className="pt-4">
              <label className="block text-lg text-gray-600 mb-4">
                {t("donationForm.donorType.label")}
              </label>
              <div className="flex gap-4 max-w-md">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, donorType: "individual" })
                  }
                  className={`flex-1 py-6 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                    formData.donorType === "individual"
                      ? "border-[#EAB308] bg-[#FFFBEB]/50"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <User
                    size={20}
                    className={
                      formData.donorType === "individual"
                        ? "text-[#EAB308]"
                        : "text-gray-400"
                    }
                  />
                  <span className="text-base font-bold text-gray-700">
                    {t("donationForm.donorType.individual")}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, donorType: "business" })
                  }
                  className={`flex-1 py-6 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                    formData.donorType === "business"
                      ? "border-[#E2AB0B] bg-[#FCF7E7]"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <Building2
                    size={20}
                    className={
                      formData.donorType === "business"
                        ? "text-[#EAB308]"
                        : "text-gray-400"
                    }
                  />
                  <span className="text-base font-bold text-gray-700">
                    {t("donationForm.donorType.business")}
                  </span>
                </button>
              </div>
            </div>

            {/* Conditional Business Fields */}
            {isBusiness && (
              <div className="space-y-6 pt-6 border-t border-gray-100 animate-in fade-in duration-500">
                {/* Business Type Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-full w-fit">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, businessType: "local" })
                    }
                    className={`px-6 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                      formData.businessType === "local"
                        ? "bg-white shadow-sm text-gray-800"
                        : "text-gray-400"
                    }`}
                  >
                    <MapPin size={12} /> {t("donationForm.businessType.local")}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, businessType: "online" })
                    }
                    className={`px-6 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                      formData.businessType === "online"
                        ? "bg-white shadow-sm text-gray-800"
                        : "text-gray-400"
                    }`}
                  >
                    <Globe size={12} /> {t("donationForm.businessType.online")}
                  </button>
                </div>

                <div>
                  <label className="block text-base font-bold text-gray-600 mb-2">
                    {t("donationForm.fields.businessName.label")}
                  </label>
                  <input
                    type="text"
                    placeholder={t(
                      "donationForm.fields.businessName.placeholder",
                    )}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-base font-bold text-gray-600">
                      {t("donationForm.fields.description.label")}
                    </label>
                    <span className="text-[10px] text-gray-400">0/200</span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder={t(
                      "donationForm.fields.description.placeholder",
                    )}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-sm focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-gray-600 mb-2">
                    {formData.businessType === "online"
                      ? t("donationForm.fields.website.label")
                      : t("donationForm.fields.location.label")}
                  </label>
                  <div className="relative">
                    {formData.businessType === "online" ? (
                      <Link
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    ) : (
                      <MapPin
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    )}
                    <input
                      type="text"
                      placeholder={
                        formData.businessType === "online"
                          ? t("donationForm.fields.website.placeholder")
                          : t("donationForm.fields.location.placeholder")
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-bold text-gray-600 mb-2">
                    {t("donationForm.fields.image.label")}
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-white hover:border-[#EAB308] cursor-pointer transition-colors">
                    <UploadCloud size={28} className="text-gray-300" />
                    <p className="text-[11px] text-gray-400 font-medium">
                      {t("donationForm.fields.image.placeholder")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits Footer */}
            <div className="bg-gray-50/50 rounded-2xl p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-gray-600" />
                <h4 className="text-base font-bold text-gray-800">
                  {t("donationForm.benefits.title")}
                </h4>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                  <Globe size={14} className="text-gray-400" />
                  <span className="text-base text-gray-600 font-bold">
                    {t("donationForm.benefits.adPlacement")}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                  <TrendingUp size={14} className="text-gray-400" />
                  <span className="text-base text-gray-600 font-bold">
                    {t("donationForm.benefits.visibility")}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="bg-[#EAB308] hover:bg-[#d99a00] text-white text-sm font-bold py-3 px-8 rounded  transition-all active:scale-95">
                {t("donationForm.button", { amount: formData.amount || "100" })}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

DonationFormSection.displayName = "DonationFormSection";

export default DonationFormSection;
