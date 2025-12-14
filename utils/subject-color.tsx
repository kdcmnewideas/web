export const getSubjectColorStyles = (colorClass: string) => {
  // Maps tailwind bg classes to solid border/text logic
  if (colorClass.includes('indigo'))
    return {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-600',
      bar: 'bg-indigo-600',
      light: 'bg-indigo-100',
    };
  if (colorClass.includes('teal'))
    return {
      bg: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-100',
      iconBg: 'bg-teal-600',
      bar: 'bg-teal-600',
      light: 'bg-teal-100',
    };
  if (colorClass.includes('rose'))
    return {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
      iconBg: 'bg-rose-600',
      bar: 'bg-rose-600',
      light: 'bg-rose-100',
    };
  if (colorClass.includes('amber'))
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      iconBg: 'bg-amber-600',
      bar: 'bg-amber-600',
      light: 'bg-amber-100',
    };
  if (colorClass.includes('emerald'))
    return {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-600',
      bar: 'bg-emerald-600',
      light: 'bg-emerald-100',
    };
  return {
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-100',
    iconBg: 'bg-slate-600',
    bar: 'bg-slate-600',
    light: 'bg-slate-100',
  };
};
