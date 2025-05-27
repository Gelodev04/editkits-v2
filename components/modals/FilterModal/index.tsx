import React, { useEffect, useState } from 'react';

import { Modal } from '@/components/Modal';
import Button from '@/components/ui/button/Button';
import ButtonGroup from '@/components/ui/button/ButtonGroup';

interface ButtonOption {
  label: string;
  value: string;
}

type PopUpProps = {
  open: boolean;
  setOpen: (e: React.SetStateAction<boolean>) => void;
  title: string;
  description: string;
  selected: string[];
  setSelected: (e: React.SetStateAction<string[]>) => void;
  onClick: () => void;
  filters: ButtonOption[];
};

const defaultFilters: ButtonOption[] = [
  { label: 'Success', value: 'COMPLETED' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Failed', value: 'FAILED' },
];

export default function FilterModal({
  open,
  setOpen,
  title,
  description,
  selected,
  setSelected,
  onClick,
  filters = defaultFilters,
}: PopUpProps) {
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  // Initialize tempSelected with current selected values when modal opens
  useEffect(() => {
    if (open) {
      setTempSelected(selected);
    }
  }, [open, selected]);

  function handleFilterSelect(status: string) {
    setTempSelected(prev =>
      prev.includes(status) ? prev.filter(item => item !== status) : [...prev, status]
    );
  }

  function handleApply() {
    setSelected(tempSelected);
    onClick();
    setOpen(false);
  }

  function handleDismiss() {
    setTempSelected(selected); // Reset to original selection
    setOpen(false);
  }

  return (
    <Modal isOpen={open} onClose={handleDismiss} className="max-w-[500px] w-full mx-3">
      <h4 className="pt-[40px] font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90 text-center">
        {title}
      </h4>
      <p className="font-lato font-bold text-[20px] leading-[30px] text-center text-gray-800 mb-7 text-title-sm dark:text-white/90">
        {description}
      </p>

      <div className="flex justify-center gap-[12px] pt-[24px]">
        <ButtonGroup buttons={filters} selected={tempSelected} onClick={handleFilterSelect} />
      </div>
      <div className="flex justify-center items-center gap-[6px] pt-[52px] pb-[34px]">
        <Button onClick={handleDismiss} variant="outline">
          Dismiss
        </Button>
        <Button onClick={handleApply} variant="primary">
          Apply
        </Button>
      </div>
    </Modal>
  );
}
