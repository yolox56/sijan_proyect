'use client';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full text-[#9CA3AF] font-sans">
      
      {/* 1. BARRA SUPERIOR: Créditos de Tecnología */}
      <div className="w-full bg-[#1A1A1A] py-2 text-center border-b border-white/5">
        <p className="text-[10px] md:text-xs tracking-wide">
          ©2026 - Tecnología proporcionada por Agencia de Transformación Digital
        </p>
      </div>

      {/* 2. CONTENEDOR PRINCIPAL: Reducimos p-8 a p-4 y md:py-20 a md:py-6 */}
      <div className="w-full bg-[#283C2A] p-4 md:px-8 md:py-6 relative flex flex-col md:flex-row justify-between items-center">
        
        {/* LADO IZQUIERDO: Información Institucional */}
        <div className="space-y-2 max-w-xl"> {/* Reducimos space-y-4 a 2 */}
          <p className="text-xs md:text-sm text-gray-400 font-medium">
            Gobierno del Estado de Morelos
          </p>
          
          {/* Corregido text-[2px] que era casi invisible a text-[10px] */}
          <div className="text-[10px] md:text-xs leading-tight space-y-0.5">
            <p className="font-bold text-gray-300">Ubicación:</p>
            <p>Palacio de Gobierno, Plaza de Armas «General Emiliano Zapata Salazar»</p>
            <p>S/N, Piso Mezzanine, Colonia Centro, Cuernavaca, Morelos C.P. 62000.</p>
            <p>Tel: 3292200, 3292300</p>
          </div>
        </div>

        {/* LADO DERECHO: Imagen más pequeña para que no fuerce el alto */}
        <div className="mt-4 md:mt-0">
          <div className="bg-transparent p-1">
            <Image 
              src="/footer.png"
              alt="Logo en footer"
              width={90}  /* Reducido de 100 a 70 */
              height={90} /* Reducido de 100 a 70 */
              className="rounded-md object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
            />
          </div>
        </div>

      </div>
    </footer>
  );
}