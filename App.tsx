
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
  ArrowLeft,
  FileText,
  Scale
} from 'lucide-react';

type ViewState = 'landing' | 'policy' | 'offer';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  emoji: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, emoji }) => (
  <div className="group glass-card p-10 rounded-[2.5rem] hover:border-fuchsia-500/50 transition-all duration-500 hover:-translate-y-3 cursor-default">
    <div className="mb-8 flex justify-between items-start">
      <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-fuchsia-500/20 group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>
      <span className="text-4xl group-hover:rotate-12 transition-transform duration-500">{emoji}</span>
    </div>
    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter transition-colors group-hover:text-fuchsia-400">{title}</h3>
    <p className="text-gray-400 text-base leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

const LegalPage: React.FC<{ title: string; children: React.ReactNode; onBack: () => void }> = ({ title, children, onBack }) => (
  <div className="min-h-screen pt-32 pb-20 px-6">
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-fuchsia-500 font-bold uppercase tracking-widest text-sm mb-12 hover:gap-4 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Вернуться на главную
      </button>
      
      <div className="glass-card p-8 md:p-16 rounded-[3rem] border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Scale className="w-32 h-32" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-12 uppercase italic tracking-tighter leading-none">{title}</h1>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-6 font-medium leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      setShowSuccess(true);
      window.history.replaceState({}, '', window.location.pathname);
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
    if (!agreed) {
      alert('Пожалуйста, примите условия оферты и политики конфиденциальности');
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
        throw new Error(data.error || 'Ошибка сервера. Пожалуйста, попробуйте позже.');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(`Ошибка: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const galleryImages = [
    "https://picsum.photos/seed/ai-art-1/600/800",
    "https://picsum.photos/seed/ai-art-2/600/800",
    "https://picsum.photos/seed/ai-art-3/600/800",
    "https://picsum.photos/seed/ai-art-4/600/800",
    "https://picsum.photos/seed/ai-art-5/600/800",
    "https://picsum.photos/seed/ai-art-6/600/800",
  ];

  const benefits = [
    {
      id: 1,
      icon: <Infinity className="w-6 h-6 text-blue-400" />,
      text: "Доступы к приватным сайтам с пожизненной бесплатной генерацией фото и видео"
    },
    {
      id: 2,
      icon: <GraduationCap className="w-6 h-6 text-fuchsia-400" />,
      text: "Пройдете полноценное обучение и станете с нуля реальным ИИ-креатором"
    },
    {
      id: 3,
      icon: <ImageIcon className="w-6 h-6 text-blue-400" />,
      text: "Научитесь делать сумасшедшие промты, которые невозможно отличить от реальных фото"
    },
    {
      id: 4,
      icon: <Gift className="w-6 h-6 text-fuchsia-400" />,
      text: "Бонусом совершенно бесплатно получите доступ на канал с уже готовыми крутейшими промтами"
    },
    {
      id: 5,
      icon: <ZapIcon className="w-6 h-6 text-blue-400" />,
      text: "Вы будете идти в ногу со временем и откроете для себе новые возможности, как в заработке, так и в личностном развитии"
    }
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-mesh">
        <div className="glass-card p-10 md:p-16 rounded-[3rem] text-center max-w-xl w-full glow-fuchsia animate-float border-fuchsia-500/30">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.5)]">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic leading-none">
            ОПЛАТА <br/> <span className="text-fuchsia-500">ПРИНЯТА!</span>
          </h1>
          
          <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
            Добро пожаловать в VIP AI-COMMUNITY! <br/>
            Вы сделали правильный выбор. Все материалы уже ждут вас в закрытом канале.
          </p>

          <a 
            href="https://t.me/+uTJ_A7Z7yh8zY2Ji" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-[0_20px_40px_rgba(217,70,239,0.3)] hover:opacity-90 active:scale-95"
          >
            <Zap className="w-6 h-6 fill-white" />
            ВСТУПИТЬ В КАНАЛ
          </a>

          <button 
            onClick={() => setShowSuccess(false)}
            className="mt-10 text-gray-500 text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'policy') {
    return (
      <LegalPage title="Политика конфиденциальности" onBack={() => setCurrentView('landing')}>
        <section>
          <h2 className="text-xl font-bold text-white mb-2 uppercase">1. СБОР И ОБРАБОТКА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
          <p>Исполнитель осуществляет обработку персональных данных Заказчика исключительно в целях исполнения обязательств по договору оказания услуг.</p>
          <p className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <strong>Реквизиты Исполнителя:</strong><br />
            ИП МАЛЬКОВ ДЕНИС ЮРЬЕВИЧ<br />
            ИНН: 590586790678<br />
            ОГРН: 321595800058750<br />
            Тел: +79934434612<br />
            Почта: marshellebregel3@mail.ru
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2 uppercase">2. ЦЕЛИ ОБРАБОТКИ</h2>
          <p>Персональные данные используются для предоставления доступа к обучающим материалам, осуществления обратной связи и информирования о ходе обучения.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2 uppercase">3. БЕЗОПАСНОСТЬ</h2>
          <p>Исполнитель принимает все необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения или уничтожения.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2 uppercase">4. СОГЛАСИЕ</h2>
          <p>Оформляя заявку на сайте, Заказчик дает свое полное и безусловное согласие на обработку персональных данных в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».</p>
        </section>
      </LegalPage>
    );
  }

  if (currentView === 'offer') {
    return (
      <LegalPage title="Публичная оферта" onBack={() => setCurrentView('landing')}>
        <section>
          <h2 className="text-xl font-bold text-white mb-2 uppercase">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
          <p>Настоящий документ является официальным предложением Индивидуального предпринимателя МАЛЬКОВА ДЕНИСА ЮРЬЕВИЧА (далее — «Исполнитель») для любого физического лица (далее — «Заказчик»), которое примет настоящее предложение на указанных ниже условиях.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2 uppercase">2. ПРЕДМЕТ ДОГОВОРА</h2>
          <p>2.1. Исполнитель обязуется оказать Заказчику консультационные услуги по обучению нейросетям в формате онлайн-курса, а Заказчик обязуется оплатить эти услуги в соответствии с условиями Оферты.</p>
          <p>2.2. Услуга считается оказанной в момент предоставления ссылки на закрытый информационный ресурс (Telegram-канал) с учебными материалами.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2 uppercase">3. ПОРЯДОК ОПЛАТЫ И ВОЗВРАТ СРЕДСТВ</h2>
          <p>3.1. Стоимость услуг составляет 1.490 рублей.</p>
          <p className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-200">
            <strong>3.2. ПРАВИЛО ОТМЕНЫ ВОЗВРАТА:</strong> В соответствии со ст. 421 ГК РФ и спецификой предоставления цифрового контента, который является нематериальным благом, доступным к использованию немедленно, денежные средства, уплаченные Заказчиком, <strong>ВОЗВРАТУ НЕ ПОДЛЕЖАТ</strong> после предоставления доступа к учебным материалам. Акцептуя оферту, Заказчик подтверждает свое согласие на получение услуги в полном объеме сразу после оплаты.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2 uppercase">4. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ</h2>
          <p>Все материалы, предоставляемые в рамках обучения, являются объектом авторского права Исполнителя. Запрещается копирование, распространение или любая иная передача материалов третьим лицам без письменного согласия Исполнителя.</p>
        </section>
      </LegalPage>
    );
  }

  return (
    <div className="min-h-screen selection:bg-fuchsia-500/30 overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-fuchsia-600 rounded-xl flex items-center justify-center glow-fuchsia group-hover:rotate-12 transition-transform duration-500">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase transition-all group-hover:tracking-widest">
              VIP <span className="text-fuchsia-500">AI-COMMUNITY</span>
            </span>
          </div>
          <button className="hidden md:block bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95">
            Вход
          </button>
        </div>
      </nav>

      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-fuchsia-600/10 blur-[120px] rounded-full -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-8 animate-bounce">
            <Zap className="w-3 h-3 fill-fuchsia-400" />
            <span>Новый поток 2026</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
            МАНИФЕСТ <br />
            <span className="gradient-text">ИИ-КРЕАТОРОВ</span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-10 space-y-4 px-4">
            <p className="text-xl md:text-2xl text-gray-300 font-medium leading-tight">
              Прекратите постоянно платить за генерации. Начните создавать топовые фото и видео <span className="text-white font-black underline decoration-fuchsia-500 decoration-2 underline-offset-4">БЕСПЛАТНО</span>. 
            </p>
            <p className="text-lg md:text-xl text-gray-400">
              Я готова поделиться с вами <span className="text-fuchsia-400 font-bold">секретными площадками</span>, где за генерации не нужно платить. 
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              А также предоставлю вам полноценное обучение и научу делать безумно крутые промты, с которыми ваши фото будут <span className="text-white font-black uppercase tracking-wider">уникальными</span>, <span className="text-white font-black uppercase tracking-wider">реалистичными</span> и будут собирать <span className="bg-gradient-to-r from-blue-400 to-fuchsia-500 text-white px-2 py-1 rounded-lg font-black italic">100.000+ ЛАЙКОВ 🔥</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="glass-card px-8 py-4 rounded-2xl border-fuchsia-500/30 glow-accent-box animate-pulse">
               <span className="text-gray-400 line-through text-lg mr-3">5.000₽</span>
               <span className="text-3xl font-black text-white">1490₽</span>
               <div className="text-[10px] uppercase tracking-tighter text-fuchsia-400 font-bold mt-1">Осталось 7 мест по этой цене</div>
            </div>

            <a href="#join" className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white rounded-2xl font-black text-2xl hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_30px_rgba(217,70,239,0.5)] active:scale-95">
              <span className="relative z-10 flex items-center gap-3">
                КРУТО! Я ХОЧУ!
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </span>
            </a>
          </div>

          <div className="mt-24 relative max-w-4xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-fuchsia-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative glass-card rounded-[2rem] p-4 overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/vipai-hero/1200/600" 
                alt="AI Masterpiece" 
                className="w-full h-auto rounded-xl object-cover aspect-video animate-float"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ImageIcon className="text-fuchsia-500 w-6 h-6" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">Примеры шедевров</h2>
          </div>
          <p className="text-gray-400">Это лишь малая часть того, что вы научитесь создавать бесплатно</p>
        </div>
        
        <div className="flex gap-6 overflow-hidden select-none">
          <div className="flex gap-6 animate-scroll min-w-full">
            {[...galleryImages, ...galleryImages].map((src, i) => (
              <div key={i} className="flex-none w-[280px] md:w-[350px] aspect-[3/4] rounded-[2rem] overflow-hidden glass-card group">
                <img 
                  src={src} 
                  alt={`AI Example ${i}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/40 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none">
                Вы устали отдавать <br /> 
                <span className="glow-accent uppercase tracking-tighter">ДЕНЬГИ ЗА ПОДПИСКИ?</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Каждый месяц — новые чеки. Midjourney, Sora, Runway, ChatGPT... Счетчики тикают, генерации заканчиваются, а кошелек пустеет.
              </p>
              
              <div className="space-y-5">
                {[
                  "Генерировать фото и видео БЕСПЛАТНО",
                  "Никаких скрытых платежей",
                  "Секретные платформы без счетчиков",
                  "Свобода творчества навсегда"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white font-semibold group cursor-default">
                    <div className="w-6 h-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/50 flex items-center justify-center group-hover:scale-125 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-500" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-10 md:p-14 rounded-[2.5rem] border-white/10 hover:border-fuchsia-500/30 transition-colors duration-700">
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-600 to-fuchsia-600 rounded-full flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(217,70,239,0.4)] animate-pulse">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-6 uppercase italic">Это возможно. <br /> И я знаю, как.</h3>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                  Моё обучение — это ключ. Вы получите доступ к малоизвестным платформам, где вся генерация остаётся бесплатной навсегда. Никаких подписок. Только чистая экономия и свобода.
                </p>
                <div className="p-5 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl flex items-center gap-4 group">
                  <div className="p-3 bg-fuchsia-500 rounded-xl group-hover:rotate-[360deg] transition-transform duration-1000">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-fuchsia-400">Эксклюзивные приватные доступы</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-8 italic">ЧТО ЭТО ДАЕТ <span className="gradient-text">ВАМ?</span></h2>
            <div className="w-48 h-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 mx-auto rounded-full blur-[1px]"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Rocket className="w-8 h-8 text-blue-500" />}
              title="Космическая экономия"
              description="Забудьте о ежемесячных расходах на подписки. Ваш творческий бюджет теперь равен нулю."
              emoji="🪐"
            />
            <FeatureCard 
              icon={<Palette className="w-8 h-8 text-fuchsia-500" />}
              title="«Вау!» эффект"
              description="Изображения уровня, в который окружающие не поверят. Секреты превращения запроса в искусство."
              emoji="🎨"
            />
            <FeatureCard 
              icon={<Briefcase className="w-8 h-8 text-blue-400" />}
              title="Деньги от брендов"
              description="Качественный визуал — главный дефицит. Предлагайте услуги компаниям, которые платят за контент."
              emoji="💼"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-fuchsia-400" />}
              title="Мощный личный блог"
              description="Наполняйте страницу контентом, который привлекает внимание и легко монетизируется."
              emoji="📈"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
         <div className="max-w-4xl mx-auto px-6">
            <div className="glass-card p-8 md:p-12 rounded-[2rem] border-fuchsia-500/20 text-center relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
               <p className="text-xl md:text-2xl font-bold text-gray-200 mb-0">
                  Стоимость ВСЕГО <span className="text-fuchsia-500 font-black text-3xl mx-2">1490 рублей</span> за полноценное обучение 
               </p>
               <p className="text-gray-400 mt-4 text-lg">
                  и доступы к приватным бесплатным сайтам, где можно генерировать бесконечное количество фото и видео
               </p>
            </div>
         </div>
      </section>

      <section id="join" className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative glass-card rounded-[3.5rem] p-10 md:p-24 text-center overflow-hidden glow-fuchsia">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-fuchsia-600/10 -z-10"></div>
            
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-10 animate-spin-slow shadow-yellow-500/50" />
            
            <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-none uppercase italic">
              ВАШ НОВЫЙ ЭТАП <br /> <span className="gradient-text">НАЧИНАЕТСЯ ЗДЕСЬ</span>
            </h2>

            <form className="max-w-md mx-auto space-y-5 mb-8 relative z-10" onSubmit={handlePayment}>
               <div className="relative">
                 <input 
                  type="text" 
                  required
                  placeholder="Ваше имя" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all text-lg font-bold text-white placeholder:text-gray-600"
                 />
               </div>
               <div className="relative">
                 <input 
                  type="email" 
                  required
                  placeholder="Ваш E-mail" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all text-lg font-bold text-white placeholder:text-gray-600"
                 />
               </div>
               
               <div className="flex items-start gap-3 text-left px-2">
                 <input 
                    type="checkbox" 
                    id="legal-agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-fuchsia-500 focus:ring-fuchsia-500 cursor-pointer"
                 />
                 <label htmlFor="legal-agree" className="text-[11px] text-gray-400 leading-tight cursor-pointer font-medium">
                   Я подтверждаю свое согласие с <button type="button" onClick={() => setCurrentView('offer')} className="text-fuchsia-500 underline hover:text-fuchsia-400">Публичной офертой</button> и <button type="button" onClick={() => setCurrentView('policy')} className="text-fuchsia-500 underline hover:text-fuchsia-400">Политикой конфиденциальности</button>, а также даю согласие на обработку персональных данных.
                 </label>
               </div>

               <button 
                 disabled={isLoading || !agreed}
                 type="submit" 
                 className="w-full bg-white text-black py-6 rounded-2xl font-black text-2xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-fuchsia-600 hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed"
               >
                 {isLoading ? (
                   <Loader2 className="w-8 h-8 animate-spin" />
                 ) : (
                   <>
                    <CreditCard className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    ОПЛАТИТЬ 1490₽
                   </>
                 )}
               </button>
            </form>

            <div className="max-w-md mx-auto mb-16 px-4">
              <a 
                href="https://t.me/adm_ria" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-gray-400 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all active:scale-95 group"
              >
                <Headphones className="w-5 h-5 group-hover:animate-bounce" />
                Связаться с техподдержкой
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto border-t border-white/10 pt-12 mb-16">
               <div className="text-center">
                  <div className="font-black text-4xl text-white">1000+</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mt-2">Учеников</div>
               </div>
               <div className="text-center border-l border-white/10">
                  <div className="font-black text-4xl text-fuchsia-500">5/5</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mt-2">Рейтинг</div>
               </div>
            </div>

            <div className="max-w-4xl mx-auto text-left border-t border-white/10 pt-16">
              <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Что вы получаете <br /> <span className="text-fuchsia-500">на обучении!</span></h2>
                <div className="w-20 h-1 bg-blue-500 rounded-full mx-auto"></div>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-fuchsia-500/20 hover:bg-white/10 transition-all duration-300 group/item">
                    <div className="p-3 bg-white/5 rounded-xl group-hover/item:scale-110 group-hover/item:bg-fuchsia-500/20 transition-all">
                      {benefit.icon}
                    </div>
                    <p className="text-base md:text-lg font-bold text-gray-200 group-hover/item:text-white transition-colors">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <Sparkles className="text-fuchsia-500 w-8 h-8" />
                <span className="text-2xl font-black tracking-tighter uppercase">VIP <span className="text-fuchsia-500">AI-COMMUNITY</span></span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm mb-6">
                Индивидуальный предприниматель Мальков Денис Юрьевич<br />
                ИНН 590586790678 | ОГРН 321595800058750
              </p>
              <div className="text-gray-600 text-xs font-bold tracking-widest uppercase">
                &copy; {new Date().getFullYear()} VIP AI-COMMUNITY. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <button 
                onClick={() => { setCurrentView('offer'); window.scrollTo(0, 0); }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
              >
                <FileText className="w-4 h-4 text-fuchsia-500" />
                Публичная оферта
              </button>
              <button 
                onClick={() => { setCurrentView('policy'); window.scrollTo(0, 0); }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
              >
                <ShieldCheck className="w-4 h-4 text-fuchsia-500" />
                Политика конфиденциальности
              </button>
              <a 
                href="mailto:marshellebregel3@mail.ru"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
              >
                <Headphones className="w-4 h-4 text-fuchsia-500" />
                Поддержка
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
