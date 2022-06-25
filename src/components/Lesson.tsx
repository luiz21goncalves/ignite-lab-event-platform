import { Link, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import isPast from 'date-fns/isPast';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import classNames from 'classnames';

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

  const { slug: slugParam } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE ' • 'd' de 'MMMM ' • ' k'h'mm",
    {
      locale: ptBR,
    },
  );

  const isActiveLesson = slug === slugParam;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={classNames(
          'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ',
          {
            'bg-green-500': isActiveLesson,
          },
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                'flex items-center gap-2 text-sm  font-medium',
                {
                  'text-white': isActiveLesson,
                  'text-blue-500': !isActiveLesson,
                },
              )}
            >
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
            className={classNames(
              'text-xs rounded px-2 py-[0.125rem] border  font-bold',
              {
                'text-white': isActiveLesson,
                'text-green-300': !isActiveLesson,
                'border-white': isActiveLesson,
                'border-green-300': !isActiveLesson,
              },
            )}
          >
            {typeLabels[type]}
          </span>
        </header>

        <strong
          className={classNames(' mt-5 block', {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
