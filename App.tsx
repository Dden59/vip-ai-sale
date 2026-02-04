
import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Palette, 
  Briefcase, 
  TrendingUp, 
  ChevronRight, 
  Sparkles, 
  Zap,
  Star,
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Image as ImageIcon,
  Infinity,
  GraduationCap,
  Gift,
  ZapIcon,
  Loader2,
  Headphones,
  FileText,
  Shield,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [showLegalModal, setShowLegalModal] = useState<'offer' | 'privacy' | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      setShowSuccess(true);
      window.history.replaceState({}, '', '/');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: "1490.00", 
          description: `Обучение VIP AI-COMMUNITY: ${formData.email}`,
          metadata: { name: formData.name, email: formData.email }
        }),
      });

      const data = await response.json();

      if (response.ok && data.confirmation_url) {
        window.location.href = data.confirmation_url;
      } else {
        throw new Error(data.error || 'Ошибка сервера.');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(`Ошибка: ${error.message}. Попробуйте позже.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-mesh">
        <div className="glass-card p-10 md:p-16 rounded-[3rem] text-center max-w-xl w-full glow-fuchsia animate-float border-fuchsia-500/30">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.5)]">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic leading-none text-white">ОПЛАТА <br/> <span className="text-fuchsia-500">ПРИНЯТА!</span></h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">Добро пожаловать в VIP AI-COMMUNITY! <br/> Все материалы уже ждут вас в закрытом канале.</p>
          <a href="https://t.me/+uTJ_A7Z7yh8zY2Ji" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-[0_20px_40px_rgba(217,70,239,0.3)] hover:opacity-90">
            <Zap className="w-6 h-6 fill-white" /> ВСТУПИТЬ В КАНАЛ
          </a>
          <button onClick={() => setShowSuccess(false)} className="mt-10 text-gray-500 text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors">Вернуться на главную</button>
        </div>
      </div>
    );
  }

  const benefits = [
    { id: 1, icon: <Infinity className="w-6 h-6 text-blue-400" />, text: "Доступы к приватным сайтам с пожизненной бесплатной генерацией фото и видео" },
    { id: 2, icon: <GraduationCap className="w-6 h-6 text-fuchsia-400" />, text: "Пройдете полноценное обучение и станете с нуля реальным ИИ-креатором" },
    { id: 3, icon: <ImageIcon className="w-6 h-6 text-blue-400" />, text: "Научитесь делать сумасшедшие промты, которые невозможно отличить от реальных фото" },
    { id: 4, icon: <Gift className="w-6 h-6 text-fuchsia-400" />, text: "Бонусом совершенно бесплатно получите доступ на канал с уже готовыми крутейшими промтами" },
    { id: 5, icon: <ZapIcon className="w-6 h-6 text-blue-400" />, text: "Вы будете идти в ногу со временем и откроете для себе новые возможности" }
  ];

  return (
    <div className="min-h-screen selection:bg-fuchsia-500/30 bg-[#020617]">
      {/* Навигация */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-fuchsia-600 rounded-xl flex items-center justify-center glow-fuchsia group-hover:rotate-12 transition-transform duration-500"><Sparkles className="text-white w-6 h-6" /></div>
            <span className="text-xl font-black tracking-tighter uppercase text-white">VIP <span className="text-fuchsia-500">AI-COMMUNITY</span></span>
          </div>
          <button className="hidden md:block bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all text-white">Вход</button>
        </div>
      </nav>

      {/* Хедер (сокращенно для краткости XML) */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white">МАНИФЕСТ <br /> <span className="gradient-text">ИИ-КРЕАТОРОВ</span></h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-4xl mx-auto mb-10">Прекратите постоянно платить за генерации. Начните создавать топовые фото и видео <span className="text-white font-black underline decoration-fuchsia-500 decoration-2 underline-offset-4">БЕСПЛАТНО</span>.</p>
          <div className="flex flex-col items-center gap-6">
            <div className="glass-card px-8 py-4 rounded-2xl border-fuchsia-500/30 glow-accent-box animate-pulse">
               <span className="text-gray-400 line-through text-lg mr-3">5.000₽</span>
               <span className="text-3xl font-black text-white">1490₽</span>
            </div>
            <a href="#join" className="px-12 py-6 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white rounded-2xl font-black text-2xl shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all hover:scale-105 active:scale-95">КРУТО! Я ХОЧУ!</a>
          </div>
        </div>
      </header>

      {/* Секция вступления (Форма) */}
      <section id="join" className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative glass-card rounded-[3.5rem] p-10 md:p-24 text-center glow-fuchsia">
            <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic text-white leading-none">ВАШ НОВЫЙ ЭТАП <br /> <span className="gradient-text">НАЧИНАЕТСЯ ЗДЕСЬ</span></h2>
            <form className="max-w-md mx-auto space-y-5 mb-8" onSubmit={handlePayment}>
               <input type="text" required placeholder="Ваше имя" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg font-bold text-white" />
               <input type="email" required placeholder="Ваш E-mail" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg font-bold text-white" />
               <button disabled={isLoading} type="submit" className="w-full bg-white text-black py-6 rounded-2xl font-black text-2xl hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3">
                 {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <><CreditCard className="w-6 h-6" /> КРУТО! Я ХОЧУ!</>}
               </button>
            </form>
            <div className="max-w-md mx-auto mb-16"><a href="https://t.me/adm_ria" target="_blank" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"><Headphones className="w-4 h-4" /> Связаться с техподдержкой</a></div>
            
            {/* Список преимуществ */}
            <div className="max-w-4xl mx-auto text-left border-t border-white/10 pt-16">
              <div className="grid gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-fuchsia-500/20 transition-all">
                    <div className="p-3 bg-white/5 rounded-xl">{benefit.icon}</div>
                    <p className="text-base md:text-lg font-bold text-gray-200">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* НОВЫЙ ФУТЕР */}
      <footer className="py-20 border-t border-white/5 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Sparkles className="text-fuchsia-500 w-8 h-8" />
            <span className="text-2xl font-black tracking-tighter uppercase text-white">VIP <span className="text-fuchsia-500">AI-COMMUNITY</span></span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12">
            <button onClick={() => setShowLegalModal('offer')} className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors text-[10px] font-bold uppercase tracking-widest"><FileText className="w-4 h-4" /> Публичная оферта</button>
            <button onClick={() => setShowLegalModal('privacy')} className="flex items-center gap-2 text-gray-500 hover:text-fuchsia-500 transition-colors text-[10px] font-bold uppercase tracking-widest"><Shield className="w-4 h-4" /> Политика конфиденциальности</button>
          </div>
          
          <div className="text-gray-600 text-[10px] font-bold tracking-widest uppercase mb-4">
            ИП МАЛЬКОВ ДЕНИС ЮРЬЕНЫЧ | ИНН: 590586790678 | ОГРН: 321595800058750
          </div>
          <div className="text-gray-700 text-[9px] font-bold tracking-widest uppercase opacity-50">&copy; {new Date().getFullYear()} VIP AI-COMMUNITY. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
        </div>
      </footer>

      {/* МОДАЛЬНЫЕ ОКНА С ЗАЩИЩЕННЫМИ ТЕКСТАМИ */}
      {showLegalModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden glass-card rounded-[2rem] flex flex-col border-white/20">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-black uppercase tracking-widest text-white">{showLegalModal === 'offer' ? 'Публичная оферта' : 'Политика конфиденциальности'}</h3>
              <button onClick={() => setShowLegalModal(null)} className="p-2 hover:bg-white/10 rounded-full text-white"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar text-gray-400 space-y-6 text-sm leading-relaxed">
              {showLegalModal === 'offer' ? (
                <>
                  <p className="font-bold text-white text-lg">1. ОБЩИЕ ПОЛОЖЕНИЯ</p>
                  <p>Настоящая оферта является официальным предложением ИП МАЛЬКОВ ДЕНИС ЮРЬЕНЫЧ (далее — «Исполнитель») и содержит все существенные условия договора оказания консультационных услуг. Акцептом оферты является факт оплаты услуг Заказчиком.</p>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="font-bold text-white">Реквизиты Исполнителя:</p>
                    <p>ИП МАЛЬКОВ ДЕНИС ЮРЬЕНЫЧ | ИНН: 590586790678 | ОГРН: 321595800058750</p>
                    <p>Почта: marshellebregel3@mail.ru | Тел: +79934434612</p>
                  </div>
                  <p className="font-bold text-white text-lg">2. ПРЕДМЕТ И ПОРЯДОК УСЛУГ</p>
                  <p>Исполнитель предоставляет доступ к авторским учебным материалам по работе с нейросетями. Услуги считаются оказанными в полном объеме и надлежащего качества в момент предоставления доступа к закрытому каналу или материалам курса.</p>
                  <p className="font-bold text-white text-lg">3. ОТКАЗ ОТ ГАРАНТИЙ И ВОЗВРАТОВ</p>
                  <p className="p-4 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl text-fuchsia-300 font-bold italic">
                    ВНИМАНИЕ: Обучающий контент является цифровым товаром. Согласно ст. 421 ГК РФ и специфике цифрового доступа, ВОЗВРАТ СРЕДСТВ ПОСЛЕ ПОЛУЧЕНИЯ ДОСТУПА НЕВОЗМОЖЕН. Исполнитель не несет ответственности за субъективное восприятие материалов Заказчиком и не гарантирует конкретных финансовых результатов (заработка).
                  </p>
                  <p>Заказчик подтверждает, что ознакомлен со стоимостью (1490 руб.) и согласен на получение доступа без права на последующий возврат.</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-white text-lg">1. ОБРАБОТКА ДАННЫХ</p>
                  <p>Мы собираем только минимально необходимые данные (Имя, E-mail) для идентификации оплаты и предоставления доступа к обучению. Обработка производится в соответствии с ФЗ-152 «О персональных данных».</p>
                  <p className="font-bold text-white text-lg">2. ЦЕЛИ И БЕЗОПАСНОСТЬ</p>
                  <p>Данные используются исключительно для: отправки ссылок на обучение, технической поддержки и информирования об обновлениях курса. Мы используем современные методы шифрования для защиты ваших данных.</p>
                  <p className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-300 font-bold italic">
                    Нажимая кнопку оплаты, вы даете полное согласие на хранение и обработку ваших персональных данных. Данные не передаются третьим лицам, кроме случаев, предусмотренных законодательством РФ (платежные агрегаторы).
                  </p>
                </>
              )}
            </div>
            <div className="p-6 border-t border-white/10 bg-white/5"><button onClick={() => setShowLegalModal(null)} className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-gray-200">Закрыть</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
