'use client';

import { memo } from 'react';
import { shallow } from '@liveblocks/client';

import { colorToCss } from 'src/lib/color';
import { useOthersConnectionIds, useOthersMapped } from 'src/liveblocks.config';

import { Path } from '../../detail-type/draw/_component/layer';
import { Cursor } from './cursor';
import { RoomType } from '@prisma/client';

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow,
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : '#000'}
            />
          );
        }

        return null;
      })}
    </>
  );
};

export const CursorsPresence = memo(({ type = 'draw' }: { type?: RoomType }) => {
  return (
    <>
      {type == 'draw' && <Drafts />}
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = 'CursorsPresence';
