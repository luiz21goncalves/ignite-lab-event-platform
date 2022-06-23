import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import isPast from 'date-fns/isPast';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';

type LessonProps = {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
};

const typeLabels = {
  live: 'AO VIVO',
  class: 'AULA PRÁTICA',
};

export function Lesson(props: LessonProps) {
  const { title, slug, type, availableAt } = props;

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE ' • 'd' de 'MMMM ' • ' k'h'mm",
    {
      locale: ptBR,
    },
  );

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className="flex items-center gap-2 text-sm text-blue-500 font-medium">
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={`text-xs rounded px-2 py-[0.125rem] border border-green-300 font-bold ${
              isLessonAvailable ? 'text-white ' : 'text-green-300'
            }`}
          >
            {typeLabels[type]}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">{title}</strong>
      </div>
    </Link>
  );
}
