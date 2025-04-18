import React from 'react';

interface CheckLineIconProps extends React.SVGProps<SVGSVGElement> {}

const CheckLineIcon: React.FC<CheckLineIconProps> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5} // Puedes ajustar el grosor del trazo si lo deseas
      stroke="currentColor"
      width={24} // Ancho por defecto
      height={24} // Alto por defecto
      {...props} // Permite pasar props como className, style, onClick, etc.
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        // Un path SVG común para una marca de verificación
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};

export default CheckLineIcon;
