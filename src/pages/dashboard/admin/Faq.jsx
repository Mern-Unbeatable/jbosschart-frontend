import React, { useState } from 'react';
import FaqHeader from './sections/FaqHeader';
import FaqPublishedSection from './sections/FaqPublishedSection';
import FaqPendingQuestionsSection from './sections/FaqPendingQuestionsSection';
import FaqArticleModal from './sections/FaqArticleModal';
import FaqAnswerModal from './sections/FaqAnswerModal';

const FAQ_TABS = [
  {
    id: 'published',
    label: 'Published FAQs',
  },
];

const FAQ_DATA = [
  {
    id: 1,
    question: 'How do I start my first consultation?',
    answer:
      'Consultants can register by clicking "Become a Consultant" on the homepage, filling in their professional details, and submitting for verification. Our team reviews all submissions within 2-3 business days.',
    createdBy: 'Admin User',
    createdAt: 'Oct 15, 2023',
  },
  {
    id: 2,
    question: 'How does the credit and billing system work?',
    answer:
      'We support credit/debit cards (Visa, Mastercard, Amex), digital wallets, and bank transfers. All payments are processed securely through our payment gateway partners.',
    createdBy: 'Admin User',
    createdAt: 'Oct 14, 2023',
  },
  {
    id: 3,
    question: 'Can I request a refund for a missed session?',
    answer:
      'All disputes are handled by our dedicated support team. We investigate both parties\' claims and make a fair decision within 5 business days. Users can appeal the decision if needed.',
    createdBy: 'Admin User',
    createdAt: 'Oct 13, 2023',
  },
];

const PENDING_QUESTIONS = [
  {
    id: 1,
    question:
      'Can I sync my external SAP calendar directly with the EliteConsult portal?',
    quote:
      'I\'ve been trying to automate my bookings but can\'t find the API key for calendar integration... ',
    time: '2 hours ago',
  },
];

const AdminFaq = () => {
  const [activeTab, setActiveTab] = useState('published');
  const [faqs, setFaqs] = useState(FAQ_DATA);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState('create');
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [draftQuestion, setDraftQuestion] = useState('');
  const [draftAnswer, setDraftAnswer] = useState('');
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [selectedPendingQuestion, setSelectedPendingQuestion] = useState(null);
  const [publishQuestionTitle, setPublishQuestionTitle] = useState('');
  const [publishAnswerContent, setPublishAnswerContent] = useState('');

  const openEditor = (faq = null) => {
    setEditorMode(faq ? 'edit' : 'create');
    setEditingFaqId(faq?.id ?? null);
    setDraftQuestion(faq?.question || '');
    setDraftAnswer(faq?.answer || '');
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditorMode('create');
    setEditingFaqId(null);
    setDraftQuestion('');
    setDraftAnswer('');
  };

  const handleSave = () => {
    if (!draftQuestion.trim() || !draftAnswer.trim()) {
      return;
    }

    if (editorMode === 'edit') {
      setFaqs(
        faqs.map((faq) =>
          faq.id === editingFaqId
            ? { ...faq, question: draftQuestion, answer: draftAnswer }
            : faq,
        ),
      );
    } else {
      const nextId = faqs.length ? Math.max(...faqs.map((faq) => faq.id)) + 1 : 1;

      setFaqs([
        {
          id: nextId,
          question: draftQuestion,
          answer: draftAnswer,
          createdBy: 'Admin User',
          createdAt: 'Just now',
        },
        ...faqs,
      ]);
    }

    closeEditor();
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const openAnswerModal = (pendingQuestion) => {
    setSelectedPendingQuestion(pendingQuestion);
    setPublishQuestionTitle(pendingQuestion.question);
    setPublishAnswerContent('');
    setIsAnswerModalOpen(true);
  };

  const closeAnswerModal = () => {
    setIsAnswerModalOpen(false);
    setSelectedPendingQuestion(null);
    setPublishQuestionTitle('');
    setPublishAnswerContent('');
  };

  const handlePublish = () => {
    if (!publishQuestionTitle.trim() || !publishAnswerContent.trim()) {
      return;
    }

    const nextId = faqs.length ? Math.max(...faqs.map((faq) => faq.id)) + 1 : 1;

    setFaqs([
      {
        id: nextId,
        question: publishQuestionTitle,
        answer: publishAnswerContent,
        createdBy: 'Admin User',
        createdAt: 'Just now',
      },
      ...faqs,
    ]);

    closeAnswerModal();
  };

  return (
    <section className='space-y-4 sm:space-y-5'>
      <FaqHeader onAddNew={() => openEditor()} />

      <FaqPublishedSection
        activeTab={activeTab}
        onTabChange={setActiveTab}
        faqs={faqs}
        onEdit={openEditor}
        onDelete={handleDelete}
      />

      <FaqPendingQuestionsSection
        items={PENDING_QUESTIONS}
        onAnswer={openAnswerModal}
      />

      <FaqArticleModal
        isOpen={isEditorOpen}
        mode={editorMode}
        question={draftQuestion}
        answer={draftAnswer}
        onQuestionChange={setDraftQuestion}
        onAnswerChange={setDraftAnswer}
        onClose={closeEditor}
        onSave={handleSave}
      />

      <FaqAnswerModal
        isOpen={isAnswerModalOpen}
        pendingQuestion={selectedPendingQuestion}
        title={publishQuestionTitle}
        answer={publishAnswerContent}
        onTitleChange={setPublishQuestionTitle}
        onAnswerChange={setPublishAnswerContent}
        onClose={closeAnswerModal}
        onPublish={handlePublish}
      />
    </section>
  );
};

export default AdminFaq;
