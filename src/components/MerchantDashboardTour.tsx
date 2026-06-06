import React, { useState, useEffect } from 'react';
import { Joyride, CallBackProps, STATUS } from 'react-joyride';

export const MerchantDashboardTour: React.FC<{
  merchantId: string;
}> = ({ merchantId }) => {
  const [run, setRun] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem(`tour_seen_${merchantId}`);
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [merchantId]);

  const prefix = isMobile ? '.tour-step-mobile-' : '.tour-step-desktop-';

  const steps = [
    {
      target: `${prefix}home`,
      content: 'أهلاً بك في متجرك! لوحة التحكم السريعة تعطيك لمحة عامة عن مبيعاتك وحالة المتجر.',
      disableBeacon: true,
    },
    {
      target: `${prefix}profile`,
      content: 'الخطوة الأولى: قم بإعداد ملف المتجر وتأكد من ضبط طرق السحب وتفاصيل المحفظة المالية.',
    },
    {
      target: `${prefix}delivery`,
      content: 'قم بضبط إعدادات التوصيل وتسعيرة الشحن لكل محافظة ليتمكن الزبائن من الطلب بسهولة.',
    },
    {
      target: `${prefix}products`,
      content: 'الآن أضف منتجاتك وصورك الجذابة! يمكنك إدارة المخزون وتحديد الأسعار من هذا القسم.',
    },
    {
      target: `${prefix}marketing`,
      content: 'استخدم أدوات التسويق لصنع عروض مرئية ومشاركة روابط منتجاتك على منصات التواصل لجلب المزيد من الزوار.',
    },
    {
      target: `${prefix}orders`,
      content: 'بمجرد وصول طلبات جديدة، ستجدها هنا. يمكنك متابعة حالة الطلب وتحديثها للزبائن.',
    }
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem(`tour_seen_${merchantId}`, 'true');
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#9952FF',
          textColor: '#333',
        },
        tooltip: {
          fontFamily: 'Tajawal, sans-serif',
          borderRadius: '16px',
        },
        tooltipContent: {
          padding: '20px 10px',
        },
        buttonNext: {
          backgroundColor: '#9952FF',
          fontFamily: 'Tajawal, sans-serif',
          fontWeight: 'bold',
          borderRadius: '8px',
        },
        buttonBack: {
          color: '#9952FF',
          marginRight: 10,
          fontFamily: 'Tajawal, sans-serif',
          fontWeight: 'bold',
        },
        buttonSkip: {
          fontFamily: 'Tajawal, sans-serif',
        }
      }}
      locale={{
        back: 'السابق',
        close: 'إغلاق',
        last: 'إنهاء',
        next: 'التالي',
        skip: 'تخطي الجولة',
      }}
    />
  );
};
