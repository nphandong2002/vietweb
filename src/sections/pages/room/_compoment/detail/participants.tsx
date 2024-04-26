'use client';

import { connectionIdToColor } from 'src/lib/color';
import { useOthers, useSelf } from 'src/liveblocks.config';

import { generateAvatar } from 'src/shared/utils/avatar';

import { UserAvatar } from './user-avatar';

const MAX_SHOWN_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture || generateAvatar(info?.name || '')}
              name={info?.name}
              fallback={info?.name?.[0] || 'T'}
            />
          );
        })}

        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture || generateAvatar(currentUser.info?.name || '')}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
};
