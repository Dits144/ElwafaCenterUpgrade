import React from 'react';
import { Quote, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'H. Ahmad Rifai',
      role: 'Wali Santriwati Ratu Sekar Wangi',
      affiliation: 'Detasemen Khusus 88 Anti Teror Mabes Polri',
      image: '/assets/Model-1.png',
      quote:
        'Alhamdulillah dengan bimbingan dan arahan intensif dari tim Elwafa Center, putri kami dapat mempersiapkan studi ke Al-Azhar Mesir dengan sangat lancar, tertib administrasinya, dan penuh bimbingan akhlak.',
      rating: 5,
    },
    {
      name: 'Taqiyya Shafarani',
      role: 'Santriwati Bimbingan Khusus Al-Azhar',
      affiliation: 'Peserta Karantina Bahasa & Tahfidz',
      image: '/assets/taqiyya_shafarani.png',
      quote:
        'Karantina bahasa Arab dan tahfidz di Elwafa benar-benar membentuk biah lughawiyyah 24 jam. Saya jadi percaya diri bicara fusha dan siap menghadapi ujian muqabalah maupun lisan di Mesir.',
      rating: 5,
    },
    {
      name: 'Fauzan Ramadhan',
      role: 'Alumni Elwafa Center',
      affiliation: 'Mahasiswa Fakultas Ushuluddin Univ. Al-Azhar Kairo',
      image: '/assets/Hero-Image-3.2-768x768.png',
      quote:
        'Materi persiapan seleksi Diktis Kemenag dan Pusiba yang diajarkan ustadz-ustadz alumni Kairo sangat tepat sasaran. Pendampingan berkas hingga asrama di Kairo benar-benar amanah.',
      rating: 5,
    },
  ];

  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-[#F4F8F7] border-b border-[#003B46]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-elwafa-gold block mb-2">
            Testimoni Santri &amp; Wali
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003B46] tracking-tight">
            Apa Kata Mereka?
          </h2>
          <div className="w-16 h-1 bg-elwafa-gold mx-auto mt-3 rounded-full" />
          <p className="mt-3 text-xs sm:text-sm text-[#192A3D]/70">
            Kisah nyata dari para santri, alumni, dan orang tua yang mempercayakan perjalanan studinya bersama Elwafa Center.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE8E6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-elwafa-gold">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-elwafa-gold text-elwafa-gold" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-elwafa-teal/20" />
                </div>

                <p className="text-xs sm:text-sm text-[#192A3D]/80 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-[#DCE8E6]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-elwafa-gold/40 shadow-xs shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/Logo El-wafa Lingkaran.png';
                  }}
                />
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-[#003B46] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-elwafa-teal truncate">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate">
                    {item.affiliation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
