import React from "react";
import { useTranslation } from "react-i18next";
import ScheduleCard from "./components/ScheduleCard";

const UPCOMING_SCHEDULE = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    date: "4/27/2026",
    time: "9:00 PM - 9:20 PM",
    status: "upcoming",
  },
  {
    id: 2,
    doctor: "Dr. Sarah Johnson",
    date: "4/27/2026",
    time: "9:00 PM - 9:20 PM",
    status: "upcoming",
  },
  {
    id: 3,
    doctor: "Dr. Sarah Johnson",
    date: "4/27/2026",
    time: "9:00 PM - 9:20 PM",
    status: "upcoming",
  },
  {
    id: 4,
    doctor: "Dr. Sarah Johnson",
    date: "4/27/2026",
    time: "9:00 PM - 9:20 PM",
    status: "upcoming",
  },
  {
    id: 5,
    doctor: "Dr. Sarah Johnson",
    date: "4/28/2026",
    time: "9:00 PM - 9:20 PM",
    status: "upcoming",
  },
];

const COMPLETED_SCHEDULE = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    date: "4/27/2026",
    time: "9:00 PM - 9:20 PM",
    status: "complete",
  },
  {
    id: 2,
    doctor: "Dr. Sarah Johnson",
    date: "4/27/2026",
    time: "9:00 PM - 9:20 PM",
    status: "complete",
  },
  {
    id: 3,
    doctor: "Dr. Sarah Johnson",
    date: "4/27/2026",
    time: "9:00 PM - 9:20 PM",
    status: "complete",
  },
  {
    id: 4,
    doctor: "Dr. Sarah Johnson",
    date: "4/27/2026",
    time: "9:00 PM - 9:20 PM",
    status: "complete",
  },
  {
    id: 5,
    doctor: "Dr. Sarah Johnson",
    date: "4/28/2026",
    time: "9:00 PM - 9:20 PM",
    status: "complete",
  },
];

const UserBookedSchedule = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-8">
      <section className="space-y-4">
        <h1 className="dashboard-page-title">{t('dashboard.user.bookedSchedule.upcomingTitle')}</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {UPCOMING_SCHEDULE.map((item) => (
            <ScheduleCard
              key={item.id}
              doctor={item.doctor}
              date={item.date}
              time={item.time}
              status={item.status}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#050609]">
          {t('dashboard.user.bookedSchedule.completedTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {COMPLETED_SCHEDULE.map((item) => (
            <ScheduleCard
              key={item.id}
              doctor={item.doctor}
              date={item.date}
              time={item.time}
              status={item.status}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default UserBookedSchedule;
