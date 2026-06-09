import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ConsultantsHero from './sections/ConsultantsHero'
import ConsultantCard from '../../components/ConsultantCard'
import Pagination from '../../components/Pagination'
import AdvertisingSection from '../home/sections/AdvertisingSection'
import { useGetAllConsultantsQuery } from '../../features/api/consultantApi'

const Consultants = () => {
  const { data: consultantsData, isLoading, error } = useGetAllConsultantsQuery({})
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [expertise, setExpertise] = useState('all')
  const [topic, setTopic] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const expertiseOptions = [
    { value: 'all', label: t('consultantsHero.filters.expertise.all') },
    { value: 'medical', label: t('consultantsHero.filters.expertise.medical') },
    { value: 'legal', label: t('consultantsHero.filters.expertise.legal') },
    { value: 'technology', label: t('consultantsHero.filters.expertise.technology') },
    { value: 'creative', label: t('consultantsHero.filters.expertise.creative') },
    { value: 'finance', label: t('consultantsHero.filters.expertise.finance') },
    { value: 'businessStrategy', label: t('consultantsHero.filters.expertise.businessStrategy') },
  ]

  const topicsOptions = [
    { value: 'all', label: t('consultantsHero.filters.topics.all') },
    { value: 'strategy', label: t('consultantsHero.filters.topics.strategy') },
    { value: 'development', label: t('consultantsHero.filters.topics.development') },
    { value: 'design', label: t('consultantsHero.filters.topics.design') },
    { value: 'marketing', label: t('consultantsHero.filters.topics.marketing') },
    { value: 'operations', label: t('consultantsHero.filters.topics.operations') },
    { value: 'leadership', label: t('consultantsHero.filters.topics.leadership') },
  ]

  // Process consultants data
  const consultants = useMemo(() => {
    if (!consultantsData || !consultantsData.consultants || !Array.isArray(consultantsData.consultants)) {
      return []
    }
    return consultantsData.consultants
  }, [consultantsData])

  // Filter consultants based on search term and filters
  const filteredConsultants = useMemo(() => {
    let filtered = [...consultants]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(consultant =>
        consultant.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.specialization?.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Expertise filter
    if (expertise !== 'all') {
      filtered = filtered.filter(consultant =>
        consultant.specialization?.some(spec => spec.toLowerCase() === expertise.toLowerCase())
      )
    }

    // Topic filter
    if (topic !== 'all') {
      filtered = filtered.filter(consultant =>
        consultant.specialization?.some(spec => spec.toLowerCase().includes(topic.toLowerCase()))
      )
    }

    return filtered
  }, [consultants, searchTerm, expertise, topic])

  // Pagination logic
  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredConsultants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedConsultants = filteredConsultants.slice(startIndex, startIndex + itemsPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, expertise, topic])

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading consultants...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center text-red-600'>
          <p>Error loading consultants: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <ConsultantsHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        expertise={expertise}
        setExpertise={setExpertise}
        topic={topic}
        setTopic={setTopic}
        expertiseOptions={expertiseOptions}
        topicsOptions={topicsOptions}
      />

      {/* Consultants Grid Section */}
      <div className='container mx-auto py-14 md:py-20 px-4 lg:px-6'>
        {paginatedConsultants.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No consultants found matching your criteria.</p>
          </div>
        ) : (
          <>
            <ConsultantCard consultantsData={{ consultants: paginatedConsultants }} />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      <AdvertisingSection />
    </div>
  )
}

export default Consultants