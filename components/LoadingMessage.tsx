'use client';

import useCvStore from '@/store/useCvStore';
import useSkillStore from '@/store/useSkillStore';
import useProjectStore from '@/store/useProjectStore';

type StoreType = 'cv' | 'skill' | 'project';

interface LoadingMessageProps {
  store: StoreType;
}

export default function LoadingMessage({ store }: LoadingMessageProps) {
  const cvLoading = useCvStore((state) => state.isLoading);
  const skillLoading = useSkillStore((state) => state.isLoading);
  const projectLoading = useProjectStore((state) => state.isLoading);

  const messages: Record<StoreType, string> = {
    cv: 'Chargement du CV en cours...',
    skill: 'Chargement des compétences en cours...',
    project: 'Chargement des projets en cours...',
  };

  const isLoading =
    store === 'cv' ? cvLoading : store === 'skill' ? skillLoading : projectLoading;

  if (!isLoading) return null;

  const message = messages[store];

  return <div className="text-center text-gray-500 dark:text-gray-400">{message}</div>;
}
