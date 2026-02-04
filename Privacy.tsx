import React from 'react';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-blue-500/30 text-gray-200 py-10 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 mb-8 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Вернуться на главную
        </Link>

        <div className="glass-card p-10 md:p-16 rounded-[2.5rem] border-white/10 glow-accent-box">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              Политика <span className="text-blue-500">Конфиденциальности</span>
            </h1>
          </div>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">1. Сбор и обработка данных</h3>
              <p>Исполнитель осуществляет обработку персональных данных Заказчика исключительно в целях исполнения обязательств по договору оказания услуг.</p>
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 text-sm font-mono text-gray-400">
                <p>Оператор данных:</p>
                <p>ИП МАЛЬКОВ ДЕНИС ЮРЬЕНЫЧ</p>
                <p>ИНН: 590586790678</p>
                <p>ОГРН: 321595800058750</p>
                <p>Тел: +79934434612</p>
                <p>Почта: marshellebregel3@mail.ru</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">2. Цели обработки</h3>
              <p>Персональные данные используются для предоставления доступа к обучающим материалам, осуществления обратной связи и информирования о ходе обучения.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">3. Безопасность</h3>
              <p>Исполнитель принимает все необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения или уничтожения.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">4. Согласие</h3>
              <p>Оформляя заявку на сайте, Заказчик дает свое полное и безусловное согласие на обработку персональных данных в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
