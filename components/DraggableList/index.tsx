import * as React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Item type constant for drag and drop
const ITEM_TYPE = 'DRAGGABLE_ITEM';

// Props for DraggableItem component
type DraggableItemProps = {
  id: any;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
  showDragHandle?: boolean;
};

// The draggable item component
const DraggableItem = ({
  id,
  index,
  moveItem,
  children,
}: DraggableItemProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Set up drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Set up drop functionality
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally not recommended, but this is the simplest way
      item.index = hoverIndex;
    },
  });

  // Initialize drag and drop into the element
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {/* {showDragHandle && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 cursor-move z-10 flex items-center">
          <HiOutlineMenuAlt4 className="text-xl" />
        </div>
      )} */}
      {children}
    </div>
  );
};

// Props for the DraggableList component
type DraggableListProps = {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  onReorder: (startIndex: number, endIndex: number) => void;
  keyExtractor: (item: any, index: number) => string | number;
  showDragHandles?: boolean;
};

// The main draggable list component that uses DndProvider
export const DraggableList = ({
  items,
  renderItem,
  onReorder,
  keyExtractor,
  showDragHandles = true,
}: DraggableListProps) => {
  const moveItem = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      onReorder(dragIndex, hoverIndex);
    },
    [onReorder]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <DraggableItem
            key={keyExtractor(item, index)}
            id={keyExtractor(item, index)}
            index={index}
            moveItem={moveItem}
            showDragHandle={showDragHandles}
          >
            {renderItem(item, index)}
          </DraggableItem>
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableList;
