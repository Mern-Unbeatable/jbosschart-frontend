// import React from 'react';
// import { ArrowLeft, X } from 'lucide-react';

// const TICKET_RESPONSES = {
//   'TK-8829': {
//     question:
//       'I have been experiencing issues with Stripe payout synchronization. The payments are not reflecting in our merchant account immediately after session completion. Can we debug this issue?',
//     response: {
//       title: 'Re: Issue with Stripe Payout Synchronization',
//       date: 'Oct 13, 02:45 PM',
//       content:
//         'Hello! Thank you for bringing this to our attention. We have identified a potential delay in the webhook processing. Here are the steps we recommend:\n\nHow to verify your Stripe integration:\n• Navigate to your Developer Settings in your dashboard.\n• Check the Webhook endpoint configuration.\n• Ensure your firewall allows our IP addresses for payout notifications.\n• Verify that your Stripe API key is up to date.\n\nOur team has already marked this for priority review. We expect this to be resolved within 24 hours. Please monitor your account and let us know immediately if the issue persists.',
//     },
//   },
//   'TK-8712': {
//     question:
//       'I am interested in getting my consultant profile verified with a badge. What are the requirements and how do I apply for it?',
//     response: {
//       title: 'Re: Request for Profile Badge Verification',
//       date: 'Sep 29, 10:15 AM',
//       content:
//         'Great question! Profile badge verification is an excellent way to build trust with clients. Here are the requirements:\n\nBadge Verification Requirements:\n• Minimum 6 months active on the platform.\n• At least 50 completed sessions with positive ratings.\n• Maintain an average rating of 4.8 stars or higher.\n• Complete identity and credential verification.\n• Agree to our Code of Conduct.\n\nHow to Apply:\n• Go to your Profile Settings and click "Apply for Verification".\n• Upload the required documents (certificates, licenses, ID).\n• Wait for our team to review (typically 3-5 business days).\n\nYour profile looks promising! We encourage you to apply once you meet the session requirements.',
//     },
//   },
// };

// const TicketDetailModal = ({ ticket, isOpen, onClose }) => {
//   if (!isOpen || !ticket) return null;

//   const ticketData = TICKET_RESPONSES[ticket.id] || {
//     question: 'No details available',
//     response: { title: 'Response', date: '', content: 'No response yet' },
//   };

//   return (
//     <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'>
//       <div className='w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl'>
//         {/* Header */}
//         <div className='sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 sm:px-8'>
//           <button
//             type='button'
//             onClick={onClose}
//             className='inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900'
//           >
//             <ArrowLeft size={18} aria-hidden='true' />
//             Back to Tickets
//           </button>
//           <button
//             type='button'
//             onClick={onClose}
//             className='text-gray-400 transition-colors hover:text-gray-600'
//             aria-label='Close modal'
//           >
//             <X size={24} aria-hidden='true' />
//           </button>
//         </div>

//         {/* Content */}
//         <div className='space-y-6 px-6 py-6 sm:px-8 sm:py-8'>
//           {/* Question Section */}
//           <section>
//             <div className='mb-4 flex items-center gap-3'>
//               <div className='flex size-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold text-sm'>
//                 ?
//               </div>
//               <h2 className='text-lg font-semibold text-gray-900'>Your Question</h2>
//             </div>
//             <div className='rounded-lg bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed'>
//               {ticketData.question}
//             </div>
//           </section>

//           {/* Response Section */}
//           <section>
//             <div className='mb-3 flex items-start justify-between gap-4'>
//               <h3 className='text-lg font-semibold text-gray-900'>
//                 {ticketData.response.title}
//               </h3>
//               <p className='text-xs text-gray-500 whitespace-nowrap'>
//                 {ticketData.response.date}
//               </p>
//             </div>
//             <div className='space-y-3 text-sm text-gray-700 leading-relaxed'>
//               {ticketData.response.content.split('\n').map((line, idx) => {
//                 if (line.trim().endsWith(':')) {
//                   return (
//                     <p key={idx} className='mt-3 font-semibold text-gray-900'>
//                       {line}
//                     </p>
//                   );
//                 }
//                 if (line.startsWith('•')) {
//                   return (
//                     <p key={idx} className='ml-4'>
//                       {line}
//                     </p>
//                   );
//                 }
//                 return <p key={idx}>{line}</p>;
//               })}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketDetailModal;

import React from 'react';
import { ArrowLeft } from 'lucide-react';

// Updated data to include the exact SAP Calendar Integration content with basic markdown for bolding
const TICKET_RESPONSES = {
  'TK-SAP': {
    id: 'TK-SAP',
    question:
      '"Can I sync my external SAP calendar directly with the EliteConsult portal? I\'ve been trying to automate my bookings but can\'t find the API key for calendar integration..."',
    response: {
      title: 'Re: SAP Calendar Integration',
      date: 'Oct 24, 02:45 PM',
      content:
        'Hello! Thank you for reaching out. Yes, you can certainly synchronize your SAP environment directly with our platform to automate your scheduling workflow.\n**How to find your API Key:**\n  Navigate to the **Integration Settings** tab in your main profile menu.\n  Select External Providers and choose SAP from the list.\n  Click on "**Generate API Token**"; your unique key will appear immediately.\n  Ensure your SAP instance firewall allows outbound traffic to our domain.\nPlease let us know if you encounter any specific error codes during the handshake process. We are here to ensure your automation is seamless.',
    },
  },
  'TK-8829': {
    id: 'TK-8829',
    question:
      'I have been experiencing issues with Stripe payout synchronization. The payments are not reflecting in our merchant account immediately after session completion. Can we debug this issue?',
    response: {
      title: 'Re: Issue with Stripe Payout Synchronization',
      date: 'Oct 13, 02:45 PM',
      content:
        'Hello! Thank you for bringing this to our attention. We have identified a potential delay in the webhook processing. Here are the steps we recommend:\n**How to verify your Stripe integration:**\n  Navigate to your Developer Settings in your dashboard.\n  Check the Webhook endpoint configuration.\n  Ensure your firewall allows our IP addresses for payout notifications.\n  Verify that your Stripe API key is up to date.\nOur team has already marked this for priority review. We expect this to be resolved within 24 hours. Please monitor your account and let us know immediately if the issue persists.',
    },
  },
};

const TicketDetailModal = ({ ticket, isOpen, onClose }) => {
  if (!isOpen || !ticket) return null;

  // Defaulting to the SAP ticket for demonstration if the provided ticket ID isn't found
  const ticketData = TICKET_RESPONSES[ticket.id] || TICKET_RESPONSES['TK-SAP'];

  // Helper function to render bold text wrapped in **
  const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[20px] bg-white shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-white px-8 pt-8 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#6B4E90] transition-colors hover:text-[#4A3564]"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Tickets
          </button>
          <div className="mt-6 h-[1px] w-full bg-gray-100"></div>
        </div>

        {/* Content */}
        <div className="space-y-8 px-8 pb-10 pt-2">
          
          {/* Question Section */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#6B4E90] text-sm font-bold text-white shadow-sm">
                ?
              </div>
              <h2 className="text-[19px] font-medium text-gray-900">Your Question</h2>
            </div>
            
            {/* Custom Question Box with Purple Left Border */}
            <div className="flex overflow-hidden rounded-xl bg-[#F8F9FA]">
              <div className="w-[5px] shrink-0 bg-[#6B4E90]"></div>
              <div className="p-5 text-[15px] italic leading-relaxed text-[#5A5A5A]">
                {ticketData.question}
              </div>
            </div>
          </section>

          {/* Response Section */}
          <section>
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h3 className="text-[26px] font-bold tracking-tight text-gray-900" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
                {ticketData.response.title}
              </h3>
              <p className="whitespace-nowrap text-[13px] font-medium text-gray-500">
                {ticketData.response.date}
              </p>
            </div>
            
            <div className="text-[15px] leading-relaxed text-[#4A4A4A]">
              {ticketData.response.content.split('\n').map((line, idx, array) => {
                const isBoldHeader = line.startsWith('**') && line.endsWith('**') && line.includes(':');
                const isIndented = line.startsWith('  ');
                const isLastLine = idx === array.length - 1;

                if (isBoldHeader) {
                  return (
                    <p key={idx} className="mt-5 mb-2 text-gray-900">
                      {renderFormattedText(line)}
                    </p>
                  );
                }

                if (isIndented) {
                  return (
                    <p key={idx} className="ml-5 mt-1">
                      {renderFormattedText(line.trim())}
                    </p>
                  );
                }

                // Normal Paragraphs
                return (
                  <p key={idx} className={isLastLine ? "mt-5" : "mt-0"}>
                    {renderFormattedText(line)}
                  </p>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TicketDetailModal;