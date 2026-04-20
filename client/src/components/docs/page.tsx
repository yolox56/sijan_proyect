
'use client';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const documentos = [
  { id: 1, nombre: 'Ayuda', archivo: '/documentacion/guiaUso.pdf', tamaño: '3.4 MB', fecha: '18 Abr 2026' },
  { id: 2, nombre: 'Aviso de Privacidad', archivo: '/documentacion/avisoPrivacidad.pdf', tamaño: '5.2 MB', fecha: '15 Abr 2026' },
  { id: 3, nombre: 'Aviso de Privacidad (Simplificado)', archivo: '/documentacion/avisoPrivacidadSimplificado.pdf', tamaño: '500 KB', fecha: '10 Abr 2026' },
  { id: 4, nombre: 'Ley Federal de Protección de Datos Personales', archivo: '/documentacion/leyProteccionDatos.pdf', tamaño: '450 KB', fecha: '10 Abr 2026' },
  { id: 5, nombre: 'Terminos y Condiciones', archivo: '/documentacion/terminosCondiciones.pdf', tamaño: '450 KB', fecha: '10 Abr 2026' },
];

export default function DocsPage() {
  const [busqueda, setBusqueda] = useState('');

  const docsFiltrados = documentos.filter(doc => 
    doc.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#DBDACE] py-12 px-6"> {/* Fondo Crema */}
      <div className="max-w-3xl mx-auto">
        
        {/* Header con animación */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
        >
          <div>
            <Link href="/" className="flex items-center gap-2 text-[#283C2A] hover:text-[#832B56] transition-colors mb-2 font-medium">
              <ArrowLeft size={20} /> Regresar
            </Link>
            <h1 className="text-4xl font-extrabold text-[#283C2A] tracking-tight">Biblioteca Digital</h1>
          </div>

          {/* Barra de búsqueda estética */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#283C2A]/50" size={18} />
            <input 
              type="text"
              placeholder="Buscar documento..."
              className="pl-10 pr-4 py-2 rounded-full border border-[#283C2A]/20 focus:outline-none focus:ring-2 focus:ring-[#832B56] bg-white/50 backdrop-blur-sm transition-all w-full md:w-64"
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Contenedor de la "Tabla" (Lista de Cards) */}
        <div className="space-y-4">
          {docsFiltrados.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-[#283C2A]/5 flex items-center justify-between group hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-5">
                {/* Icono decorativo */}
                <div className="h-12 w-12 bg-[#283C2A] rounded-xl flex items-center justify-center text-[#DBDACE] group-hover:bg-[#832B56] transition-colors shadow-inner">
                  <FileText size={24} />
                </div>
                
                <div>
                  <h3 className="font-bold text-[#283C2A] text-lg leading-tight">{doc.nombre}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs font-medium text-[#283C2A]/60 uppercase tracking-widest">{doc.tamaño}</span>
                    <span className="text-xs font-medium text-[#283C2A]/60 uppercase tracking-widest">{doc.fecha}</span>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-3">
                <a 
                  href={doc.archivo} 
                  target="_blank"
                  className="p-2.5 text-[#283C2A] hover:bg-[#283C2A]/10 rounded-full transition-colors"
                  title="Vista Previa"
                >
                  <Eye size={22} />
                </a>
                <a 
                  href={doc.archivo} 
                  download
                  className="p-2.5 bg-[#832B56] text-white rounded-full hover:bg-[#832B56]/90 transition-all shadow-lg shadow-[#832B56]/20"
                  title="Descargar PDF"
                >
                  <Download size={22} />
                </a>
              </div>
            </motion.div>
          ))}

          {docsFiltrados.length === 0 && (
            <p className="text-center py-10 text-[#283C2A]/50 italic">No se encontraron documentos con ese nombre.</p>
          )}
        </div>

      </div>
    </main>
  );
}