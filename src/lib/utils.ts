// Exportez vos fonctions utilitaires comme ceci : export function FunctionName() {}
// Importez vos fonctions utilitaires comme ceci : import { FunctionName } from '@/lib/utils'
export function getDayName(date: Date): string {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[date.getDay()];
}
