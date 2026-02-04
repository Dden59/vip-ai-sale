import React from 'react';
import { ChevronLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Offer: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-fuchsia-500/30 text-gray-200 py-10 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-fuchsia-500 mb-8 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Вернуться на главную
        </Link>

        <div className="glass-card p-10 md:p-16 rounded-[2.5rem] border-white/10 glow-fuchsia">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-fuchsia-500/20 rounded-xl">
              <FileText className="w-8 h-8 text-fuchsia-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              Публичная <span className="text-fuchsia-500">Оферта</span>
            </h1>
          </div>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">1. Общие положения</h3>
              <p>Настоящий документ является официальным предложением Индивидуального предпринимателя МАЛЬКОВА ДЕНИСА ЮРЬЕВИЧА (далее — «Исполнитель») для любого физического лица (далее — «Заказчик»), которое примет настоящее предложение на указанных ниже условиях.</p>
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 text-sm font-mono text-gray-400">
                <p>Реквизиты Исполнителя:</p>
                <p>ИП МАЛЬКОВ ДЕНИС ЮРЬЕНЫЧ</p>
                <p>ИНН: 590586790678</p>
                <p>ОГРН: 321595800058750</p>
                <p>Тел: +79934434612</p>
                <p>Почта: marshellebregel3@mail.ru</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">2. Предмет договора</h3>
              <p>2.1. Исполнитель обязуется оказать Заказчику консультационные услуги по обучению нейросетям в формате онлайн-курса, а Заказчик обязуется оплатить эти услуги в соответствии с условиями Оферты.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">3. Порядок оплаты и возврат средств</h3>
              <p className="mb-2">3.1. Стоимость услуг составляет 1.490 рублей.</p>
              <div className="p-4 border-l-4 border-red-500 bg-red-500/10 rounded-r-xl">
                <p className="font-bold text-white">3.2. ПРАВИЛО ОТМЕНЫ И ВОЗВРАТА:</p>
                <p className="text-sm mt-1 opacity-90">В соответствии со ст. 421 ГК РФ и спецификой предоставления цифрового контента, денежные средства, уплаченные Заказчиком, ВОЗВРАТУ НЕ ПОДЛЕЖАТ после предоставления доступа к учебным материалам.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
