import React, { useEffect } from 'react';

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
  useEffect(() => {
    if (open) {
      setSelected(filters.map(f => f.value));
    }
  }, [open, filters, setSelected]);

  function handleFilterSelect(status: string) {
    return setSelected(prev =>
      prev.includes(status) ? prev.filter(item => item !== status) : [...prev, status]
    );
  }

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} className="max-w-[500px] w-full mx-3">
      <h4 className="pt-[40px] font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90 text-center">
        {title}
      </h4>
      <p className="font-lato font-bold text-[20px] leading-[30px] text-center text-gray-800 mb-7 text-title-sm dark:text-white/90">
        {description}
      </p>

      <div className="flex justify-center gap-[12px] pt-[24px]">
        <ButtonGroup buttons={filters} selected={selected} onClick={handleFilterSelect} />
      </div>
      <div className="flex justify-center items-center gap-[6px] pt-[52px] pb-[34px]">
        <Button
          onClick={() => {
            setOpen(false);
            setSelected(filters.map(f => f.value));
          }}
          variant="outline"
        >
          Dismiss
        </Button>
        <Button onClick={onClick} variant="primary">
          Apply
        </Button>
      </div>
    </Modal>
  );
}
