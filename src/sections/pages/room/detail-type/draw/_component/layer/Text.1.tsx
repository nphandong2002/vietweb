import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { cn } from 'src/lib/utils';
import { colorToCss } from 'src/lib/color';
import { useMutation } from 'src/liveblocks.config';
import { TextProps, font, calculateFontSize } from './text';

export const Text = ({ layer, onPointerDown, id, selectionColor, setEditText }: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers');

    liveLayers.get(id)?.set('value', newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };
  const deleteLayer = useMutation(({ storage }) => {
    const liveLayers = storage.get('layers');
    const liveLayersIds = storage.get('layerIds');

    liveLayers.delete(id);
    const index = liveLayersIds.indexOf(id);

    if (index !== -1) liveLayersIds.delete(index);
  }, []);
  const onBlur = (e: any) => {
    if (!e.target.textContent) deleteLayer();
    setEditText(false);
  };

  useEffect(() => {}, []);
  return (
    <foreignObject
      x={x}
      y={y}
      height={height}
      width={width}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
      }}
    >
      <ContentEditable
        html={value || ''}
        onFocus={() => setEditText(true)}
        onBlur={onBlur}
        onChange={handleContentChange}
        className={cn('h-full w-full flex items-center justify-center drop-shadow-md outline-none', font.className)}
        style={{
          color: fill ? colorToCss(fill) : '#000',
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};
